import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getListings = createAsyncThunk(
    'listings/getListings', async () => {
        const listings = await axios.get('http://localhost:3000/api/v1/listings');
        const results = await listings.data;
        return results;
    }  
);

export const createListing = createAsyncThunk(
    'listings/createListing', async (listing) => {
        const listings = await axios.post('http://localhost:3000/api/v1/listings', listing);
        const results = await listings.data;
        return results;
    }
);


