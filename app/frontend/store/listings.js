import { createSlice } from '@reduxjs/toolkit';
import { createListing, getListings } from '../services/listing.service';

export const listingsSlice = createSlice({
  name: 'listings',
  initialState: {
    listings: [],
    status: null,
  },
  extraReducers: {
    [getListings.fulfilled]: (state, { payload }) => {
      state.listings = payload;
      state.status = 'success';
    },
    [getListings.pending]: (state) => {
      state.status = 'loading';
    },
    [getListings.rejected]: (state) => {
      state.listings = [];
      state.status = 'failed';
    },
    [createListing.fulfilled]: (state, action) => {
        state.listings = [...state.listings, action.payload ];
        state.status = 'Fulfilled update action';
    },
  },
});
export default listingsSlice.reducer;