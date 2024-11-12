import React, { useEffect, useState } from 'react';
import { useGeolocated } from 'react-geolocated';
import HomeNavbar from '../../components/customer/layout/homeNavbar';
import HomeBanner from '../../components/customer/home/homeBanner';
import HomeHotels from '../../components/customer/home/homeHotels';
import HomeFooter from '../../components/customer/layout/homeFooter';
import { toast } from 'react-toastify';

export default function CustomerHome() {
  const { coords, isGeolocationAvailable, isGeolocationEnabled } = useGeolocated({
    positionOptions: {
      enableHighAccuracy: true,
    },
    userDecisionTimeout: 10000,
  });

  const [pinCode, setPinCode] = useState('');
  const [gettingLocation, setGettingLocation] = useState(true);

  useEffect(() => {
    if (pinCode) {
      localStorage.setItem('userPinCode', pinCode);
    }
  }, [pinCode]);


  useEffect(() => {
    if (!isGeolocationAvailable) {
      toast.error("Your browser does not support Geolocation");
      setGettingLocation(false);
    }
    if (!isGeolocationEnabled) {
      toast.error("Location is not enabled");
      setGettingLocation(false);
    }
  }, [isGeolocationAvailable, isGeolocationEnabled]);

  useEffect(() => {
    if (coords) {
      const fetchAddress = async () => {
        try {
          const response = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coords.latitude},${coords.longitude}&key=${process.env.REACT_APP_GOOGLE_MAPS_APIKEY}`
          );
          const data = await response.json();
          // console.log(data);
          if (data.status === 'OK') {
            const addressComponents = data.results[0]?.address_components;
            const postalCodeComponent = addressComponents.find(
              (component) => component.types.includes('postal_code')
            );
            setPinCode(postalCodeComponent ? postalCodeComponent.long_name : "Pincode not found");
          } else {
            toast.error("Unable to fetch current location");
          }
        } catch (error) {
          console.log(error);
          toast.error("Couldn't fetch current location, try refreshing the page");
        } finally {
          setGettingLocation(false);
        }
      };
      fetchAddress();
    }
  }, [coords]);

  return (
    <>
      <HomeNavbar />
      <HomeBanner heading="Rooms and Suites" />
      <HomeHotels pinCode={pinCode} isGeolocationEnabled={isGeolocationEnabled} gettingLocation={gettingLocation} />
      <HomeFooter />
    </>
  );
}