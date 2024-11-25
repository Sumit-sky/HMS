import React from 'react'
import HomeNavbar from '../../components/customer/layout/homeNavbar'
import ContactForm from '../../components/contactUs/contactForm'
import HomeFooter from "../../components/customer/layout/homeFooter"
import HotelNavbar from '../../components/hotel/dashboard/navbar'
import { useUser } from '../../config/firebase'

export default function ContactUs() {
    const { isCustomer } = useUser();
    return (
        <>
            {isCustomer ? <HomeNavbar /> : <HotelNavbar />}
            <ContactForm />
            <HomeFooter />
        </>
    )
}