import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Geocode from "react-geocode";
import Autocomplete from "react-google-autocomplete";
import { createListing } from '../../services/listing.service';

const maps_api_key = "AIzaSyDG3aQsRSsxTyKhsBYa2VaE-aygZW3WjUw"
Geocode.setApiKey(maps_api_key);

const initialState = {
    bathroom_essentials: false,
    bedroom_comforts: false,
    coffee_maker: false,
    description: '',
    dishwasher: false,
    dryer: false,
    hair_dryer: false,
    host_id: 1,
    kitchen: false,
    lat: null,
    listing_type: '',
    location: '',
    location_description: '',
    long: null,
    num_baths: 0,
    num_beds: 0,
    num_guests: 0,
    num_rooms: 0,
    parking: false,
    price: 0,
    self_check_in: true,
    title: '',
    tv: false,
    washer: false,
    wifi: false
};

const MAX_COUNT = 5;

const NewList = () => {
    const [photos, setPhotos] = useState([]);
    const [thumbnails, setThumbnails] = useState([]);
    const [state, setState] = useState(initialState);

    const [lat, setLat] = useState('')
    const [long, setLong] = useState('')
    const [location, setLocation] = useState('')

    const [fileLimit, setFileLimit] = useState(false);

    const dispatch = useDispatch();

    Geocode.setRegion("zm");
    Geocode.setLocationType("ROOFTOP");

    const getLocation = () => {
        if (location !== '') {
            Geocode.fromAddress(location).then(
                (response) => {
                  const { lat, lng } = response.results[0].geometry.location;
                  setLat(lat);
                  setLong(lng);
                },
                (error) => {
                  Error(error);
                }
            );
        }
    }

    React.useEffect(() => {
        getLocation()
    }, [location])

    console.log('lat', lat, 'long', long);

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('listing[bathroom_essentials]', state.bathroom_essentials);
        formData.append('listing[bedroom_comforts]', state.bedroom_comforts);
        formData.append('listing[coffee_maker]', state.coffee_maker);
        formData.append('listing[description]', state.description);
        formData.append('listing[dishwasher]', state.dishwasher);
        formData.append('listing[dryer]', state.dryer);
        formData.append('listing[hair_dryer]', state.hair_dryer);
        formData.append('listing[host_id]', state.host_id);
        formData.append('listing[kitchen]', state.kitchen);
        formData.append('listing[lat]', lat);
        formData.append('listing[listing_type]', state.listing_type);
        formData.append('listing[location]', state.location);
        formData.append('listing[location_description]', state.location_description);
        formData.append('listing[long]', long);
        formData.append('listing[num_baths]', state.num_baths);
        formData.append('listing[num_beds]', state.num_beds);
        formData.append('listing[num_guests]', state.num_guests);
        formData.append('listing[num_rooms]', state.num_rooms);
        formData.append('listing[parking]', state.parking);
        formData.append('listing[price]', state.price);
        formData.append('listing[self_check_in]', state.self_check_in);
        formData.append('listing[title]', state.title);
        formData.append('listing[tv]', state.tv);
        formData.append('listing[washer]', state.washer);
        formData.append('listing[wifi]', state.wifi);
        photos.forEach((photo) => {
            console.log(photo);
            formData.append('listing[photos[]]', photo)
        })

        thumbnails.forEach((thumbnail) => {
            formData.append('listing[thumbnails[]]', thumbnail)
        })

        dispatch(createListing(formData));
        setState(initialState);
        setPhotos(null);
        setThumbnails(null);
    }

    const handleChange = (e) => {
        setState({ ...state, [e.target.name]: e.target.value });
      };

    const handleUploadFiles = (files) => {
        const uploaded = [...photos];
        let limitExceeded = false;
        files.some((file) => {
            if (uploaded.findIndex((f) => f.name === file.name) === -1) {
                uploaded.push(file);
                if (uploaded.length === MAX_COUNT) setFileLimit(true);
                if (uploaded.length > MAX_COUNT) {
                    alert(`You can only add a maximum of ${MAX_COUNT} files`);
                    setFileLimit(false);
                    limitExceeded = true;
                    return true;
                }
            }
        })
        if (!limitExceeded) setPhotos(uploaded)
    }

    const handleUpload = (files) => {
        const uploaded = [...thumbnails];
        let limitExceeded = false;
        files.some((file) => {
            if (uploaded.findIndex((f) => f.name === file.name) === -1) {
                uploaded.push(file);
                if (uploaded.length === MAX_COUNT) setFileLimit(true);
                if (uploaded.length > MAX_COUNT) {
                    alert(`You can only add a maximum of ${MAX_COUNT} files`);
                    setFileLimit(false);
                    limitExceeded = true;
                    return true;
                }
            }
        })
        if (!limitExceeded) setThumbnails(uploaded)
    }

    const fileChangeHandler = (e) => {
        const chosenFiles = Array.prototype.slice.call(e.target.files)
        handleUploadFiles(chosenFiles);
      }

      const changeHandler = (e) => {
        const chosenFiles = Array.prototype.slice.call(e.target.files)
        handleUpload(chosenFiles);
      }

  return (
    <>
        <form onSubmit={handleSubmit} >
            <input type="text" placeholder='Title' name="title" onChange={handleChange} required />
            <input type="text" placeholder='Description' name='description' onChange={handleChange} required />
            <input type="text" placeholder='Listing type' name="listing_type" onChange={handleChange} required />
            <Autocomplete
                apiKey={maps_api_key}
                onPlaceSelected={(place) => {
                    setLocation(place.formatted_address);
                }}
                options={{
                    types: ["(regions)"],
                    componentRestrictions: { country: "zm" },
                  }}
                defaultValue="Lusaka"
            />
            <input type="text" placeholder='Location description' onChange={handleChange} name="location_description" required />
            <label htmlFor='fileUpload'>
				<a  className={`btn btn-primary ${!fileLimit ? '' : 'disabled' } `}>Upload Images</a>
			</label>
            <input id='fileUpload' type="file" multiple accept="image/*" onChange={fileChangeHandler} disabled={fileLimit} required />
            Thumbnails
            <input type="file" multiple accept="image/*" onChange={changeHandler} disabled={fileLimit} required />
            Kichen
            <input type="radio" onChange={handleChange} name="kitchen" />
            Bathroom
            <input type="radio" onChange={handleChange} name="bedroom_comforts" />

            <input type="number" placeholder='Price' onChange={handleChange} name="price" required />
            <input type="number" placeholder='Number of Bathrooms' name="num_baths" onChange={handleChange} required />
            <input type="number" placeholder='Number of Bedrooms' name="num_beds" onChange={handleChange} required />
            <input type="number" placeholder='Number of guestrooms' name="num_guests" onChange={handleChange} required />
            <input type="number" placeholder='Number of rooms' name="num_rooms" onChange={handleChange} required />
            <button type="submit">Submit</button>
        </form>
    </>
  )
}

export default NewList