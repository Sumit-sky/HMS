import React, { useState } from 'react'
import HomeNavbar from '../../components/customer/layout/homeNavbar'
import PhotoSection from '../../components/customer/profile/photoSection'
import PersonalInfo from '../../components/customer/profile/personalInfo'
import SecurityInfo from '../../components/customer/profile/securityInfo'
import BookingHistory from '../../components/customer/profile/bookingHistory'

export default function CustomerProfile() {
    const [activeSection, setActiveSection] = useState(1);
    return (
        <>
            <HomeNavbar />
            <div className='flex justify-center w-full '>
                <div className='w-11/12 flex justify-around py-5'>
                    <PhotoSection activeSection={activeSection} setActiveSection={setActiveSection} />
                    <div className='w-8/12'>
                        {activeSection === 1 &&
                            <>
                                <PersonalInfo />
                                <SecurityInfo />
                            </>
                        }
                        {activeSection === 2 &&
                            <BookingHistory />
                        }
                    </div>
                </div>
            </div>
        </>
    )
}