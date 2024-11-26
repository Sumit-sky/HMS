import React from 'react'
import HomeNavbar from "../components/customer/layout/homeNavbar"
import HotelNavbar from "../components/hotel/dashboard/navbar"
import { useUser } from '../config/firebase'
import HomeFooter from '../components/customer/layout/homeFooter'
import About from '../components/about/about'

export default function AboutUs() {
    const { isCustomer } = useUser()
    return (
        <div className='flex justify-center flex-col items-center w-full'>
            {isCustomer ? <HomeNavbar /> : <HotelNavbar />}
            <About />
            <HomeFooter />
        </div>
    )
}
