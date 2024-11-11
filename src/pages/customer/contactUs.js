import React from 'react'
import HomeNavbar from '../../components/customer/layout/homeNavbar'
import HomeBanner from '../../components/customer/home/homeBanner'
import ContactForm from '../../components/contactUs/contactForm'
import HomeFooter from "../../components/customer/layout/homeFooter"

export default function ContactUs() {
    return (
        <>
            <HomeNavbar />
            <HomeBanner heading={"Contact Us"} scrollDown={false} />
            <ContactForm />
            <HomeFooter />
        </>
    )
}