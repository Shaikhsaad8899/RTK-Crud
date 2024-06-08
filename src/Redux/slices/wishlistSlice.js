import { createSlice } from '@reduxjs/toolkit';

export const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState: {
        items: [], // Initial state of wishlist is an empty array
    },
    reducers: {
        addToWishlist: (state, action) => {
            state.items.push(action.payload); // Add item to wishlist
        },
        removeFromWishlist: (state, action) => {
            state.items = state.items.filter(item => item.id !== action.payload.id); // Remove item from wishlist
        },
    },
});

export const { addToWishlist, removeFromWishlist } = wishlistSlice.actions;

export const selectWishlist = state => state.wishlist.items;

export default wishlistSlice.reducer;
