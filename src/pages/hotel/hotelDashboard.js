import React, { useState } from 'react'
import HotelNavbar from '../../components/hotel/dashboard/navbar'
import Hotel_Sidebar from '../../components/hotel/dashboard/sidebar'
import Content from '../../components/hotel/dashboard/content'

export default function HotelDashboard() {
    const [active, setActive] = useState(0);
    return (
        <>
            <HotelNavbar />
            <div className='d-flex'>
                <Hotel_Sidebar active={active} setActive={setActive} />
                <Content active={active} />
            </div>
        </>
    )
}