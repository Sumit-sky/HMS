import React from 'react'
import HomeNavbar from '../../components/customer/layout/homeNavbar'
import HomeBanner from '../../components/customer/home/homeBanner'
import HomeHotels from '../../components/customer/home/homeHotels'

export default function CustomerHome() {
  return (
    <div>
      <HomeNavbar />
      <HomeBanner />
      <HomeHotels />
    </div>
  )
}
