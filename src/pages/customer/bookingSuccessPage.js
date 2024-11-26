import React from 'react'
import HomeNavbar from '../../components/customer/layout/homeNavbar'
import HomeFooter from '../../components/customer/layout/homeFooter'
import BookingSuccess from '../../components/customer/hotelDetails/bookingSuccess'

export default function BookingSuccessPage() {
    return (
        <div className='w-full flex flex-col justify-center items-center'>
            <HomeNavbar />
            <BookingSuccess />
            <HomeFooter />
        </div>
    )
}
