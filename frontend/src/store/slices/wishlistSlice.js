import { createSlice } from '@reduxjs/toolkit';

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: {
    items: [],
  },
  reducers: {
    setWishlist: (state, action) => {
      state.items = action.payload.products || [];
    },
  },
});

export const { setWishlist } = wishlistSlice.actions;
export const selectWishlistIds = (state) =>
  state.wishlist.items.map((p) => (typeof p === 'object' ? p._id : p));
export default wishlistSlice.reducer;
