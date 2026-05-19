import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

// Async Thunks
export const fetchCart = createAsyncThunk('cart/fetch', async (_, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem('hyperfit_token');
    if (!token) {
      // Load from localStorage if guest
      const localCart = localStorage.getItem('hyperfit_cart');
      return localCart ? JSON.parse(localCart) : { items: [] };
    }
    const { data } = await api.get('/cart');
    return data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || err.message);
  }
});

export const addItemToCart = createAsyncThunk(
  'cart/addItem',
  async ({ productId, quantity, attribute }, { rejectWithValue, getState }) => {
    try {
      const token = localStorage.getItem('hyperfit_token');
      if (!token) {
        // Guest Cart Logic
        const state = getState();
        const items = [...state.cart.items];
        const existingItemIndex = items.findIndex(
          (item) => item.product._id === productId && item.attribute === attribute
        );
        
        // We need product info. Let's fetch it first if guest
        const { data: product } = await api.get(`/products/${productId}`);
        
        if (existingItemIndex > -1) {
          items[existingItemIndex] = {
            ...items[existingItemIndex],
            quantity: items[existingItemIndex].quantity + quantity
          };
        } else {
          items.push({
            _id: 'guest_' + Math.random().toString(36).substring(2, 9),
            product,
            quantity,
            attribute
          });
        }
        
        localStorage.setItem('hyperfit_cart', JSON.stringify({ items }));
        return { items };
      }

      const { data } = await api.post('/cart/add', { productId, quantity, attribute });
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const updateItemQty = createAsyncThunk(
  'cart/updateQty',
  async ({ itemId, quantity }, { rejectWithValue, getState }) => {
    try {
      const token = localStorage.getItem('hyperfit_token');
      if (!token) {
        const state = getState();
        const items = state.cart.items.map(item => 
          item._id === itemId ? { ...item, quantity } : item
        );
        localStorage.setItem('hyperfit_cart', JSON.stringify({ items }));
        return { items };
      }

      const { data } = await api.put(`/cart/update/${itemId}`, { quantity });
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const removeItemFromCart = createAsyncThunk(
  'cart/removeItem',
  async (itemId, { rejectWithValue, getState }) => {
    try {
      const token = localStorage.getItem('hyperfit_token');
      if (!token) {
        const state = getState();
        const items = state.cart.items.filter(item => item._id !== itemId);
        localStorage.setItem('hyperfit_cart', JSON.stringify({ items }));
        return { items };
      }

      const { data } = await api.delete(`/cart/remove/${itemId}`);
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearCartState: (state) => {
      state.items = [];
      localStorage.removeItem('hyperfit_cart');
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Cart
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.items || [];
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Add Item
      .addCase(addItemToCart.fulfilled, (state, action) => {
        state.items = action.payload.items || [];
      })
      // Update Qty
      .addCase(updateItemQty.fulfilled, (state, action) => {
        state.items = action.payload.items || [];
      })
      // Remove Item
      .addCase(removeItemFromCart.fulfilled, (state, action) => {
        state.items = action.payload.items || [];
      });
  },
});

export const { clearCartState } = cartSlice.actions;
export const selectCartCount = (state) =>
  state.cart.items.reduce((sum, item) => sum + item.quantity, 0);
export default cartSlice.reducer;
