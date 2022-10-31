import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getListings } from '../../services/listing.service';

const Listing = () => {
    const dispatch = useDispatch();
    const list = useSelector((state) => state.listings.listings);

    useEffect(() => {
        dispatch(getListings());
    }, []);

  return (
    <div>Listing</div>
  )
}

export default Listing