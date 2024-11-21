import React from 'react'
import HomeNavbar from '../../components/customer/layout/homeNavbar'
import ContactForm from '../../components/contactUs/contactForm'
import HomeFooter from "../../components/customer/layout/homeFooter"

export default function ContactUs() {
    return (
        <>
            <HomeNavbar />
            <ContactForm />
            <HomeFooter />
        </>
    )
}