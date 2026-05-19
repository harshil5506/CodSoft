import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {
    setCart: (state, action) => {
      state.items = action.payload.items || [];
    },
    clearCartState: (state) => {
      state.items = [];
    },
  },
});

export const { setCart, clearCartState } = cartSlice.actions;
export const selectCartCount = (state) =>
  state.cart.items.reduce((sum, item) => sum + item.quantity, 0);
export default cartSlice.reducer;
