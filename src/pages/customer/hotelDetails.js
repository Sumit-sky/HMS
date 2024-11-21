import React from 'react'
import HomeNavbar from '../../components/customer/layout/homeNavbar'
import { useLocation } from 'react-router-dom'
import { toast } from 'react-toastify';
import HotelCarousel from '../../components/customer/hotelDetails/hotelCarousel';
import HotelInfo from '../../components/customer/hotelDetails/hotelInfo';
import HotelPricing from '../../components/customer/hotelDetails/hotelPricing';
import HomeFooter from '../../components/customer/layout/homeFooter'

export default function HotelDetails() {
    const location = useLocation();
    const hotel = location.state;

    if (!hotel) {
        toast.error("No hotel data found")
        window.history.back();
    }

    return (
        <div className='w-full flex flex-col justify-center items-center'>
            <HomeNavbar />
            <HotelCarousel photos={hotel.photos} />
            <div className='w-10/12 flex justify-between items-start'>
                <HotelInfo hotel={hotel} />
                <HotelPricing hotel={hotel} />
            </div>
            <HomeFooter />
        </div>
    )
}