import React from 'react'
import HomeNavbar from '../../components/customer/layout/homeNavbar'
import SearchByLocation from '../../components/customer/explore/searchByLocation'
import HomeFooter from '../../components/customer/layout/homeFooter'

export default function CustomerExplore() {
    return (
        <>
            <HomeNavbar />
            <div className='w-full flex justify-center items-center'>
                <SearchByLocation />
            </div>
            <HomeFooter />
        </>
    )
}
