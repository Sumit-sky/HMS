import React, { useEffect } from 'react'
import AddHotelInfo from '../../components/hotel/addDetails/addHotelInfo'
import HotelNavbar from '../../components/hotel/dashboard/navbar'
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../config/firebase';

export default function AddDetails() {
    const navigate = useNavigate();
    const { isHotel, userData } = useUser();

    useEffect(() => {
        if (isHotel) {
            const hotelDestination =
                userData?.photos?.length > 0
                    ? "/hotel/profile"
                    : "/hotel/hotel-details";
            navigate(hotelDestination, { replace: true });
        }
    }, [isHotel, userData, navigate]);
    return (
        <>
            <HotelNavbar />
            <div className='w-full flex justify-center items-center'>
                <AddHotelInfo />
            </div>
        </>
    )
}
