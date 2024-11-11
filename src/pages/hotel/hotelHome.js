import React from 'react'
import HomeNavbar from "../../components/hotel/layout/homeNavbar"
import HomeFooter from '../../components/hotel/layout/homeFooter'
import HomeBanner from '../../components/hotel/home/homeBanner'
import HomeFeatures from '../../components/hotel/home/homeFeatures'
import TryBanner from '../../components/hotel/home/tryBanner'
import { useUser } from '../../config/firebase'

export default function HotelHome() {
    const { isHotel } = useUser();
    return (
        <>
            <HomeNavbar />
            <HomeBanner />
            <HomeFeatures />
            {!isHotel ? <TryBanner /> : <></>}
            <HomeFooter />
        </>
    )
}
