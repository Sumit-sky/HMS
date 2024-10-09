import React from 'react'
import HomeNavbar from '../../components/customer/layout/homeNavbar'
import HomeBanner from '../../components/customer/home/homeBanner'
import HomeHotels from '../../components/customer/home/homeHotels'
import HomeFooter from '../../components/customer/layout/homeFooter'

export default function CustomerHome() {
  return (
    <div>
      <HomeNavbar />
      <HomeBanner />
      <HomeHotels />
      <HomeFooter/>
    </div>
  )
}
