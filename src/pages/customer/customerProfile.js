import React from 'react'
import HomeNavbar from '../../components/customer/layout/homeNavbar'
import PhotoSection from '../../components/customer/profile/photoSection'
import PersonalInfo from '../../components/customer/profile/personalInfo'
import SecurityInfo from '../../components/customer/profile/securityInfo'
import BookingHistory from '../../components/customer/profile/bookingHistory'
import { useParams } from 'react-router-dom'

export default function CustomerProfile({ profileActiveSection }) {
    const { section } = useParams();
    return (
        <>
            <HomeNavbar />
            <div className='flex justify-center w-full '>
                <div className='w-11/12 flex justify-around py-5'>
                    <PhotoSection activeSection={section === 'my-profile' ? 1 : 2} />
                    <div className='w-8/12'>
                        {section === 'my-profile' &&
                            <>
                                <PersonalInfo />
                                <SecurityInfo />
                            </>
                        }
                        {section === 'booking-history' &&
                            <BookingHistory />
                        }
                    </div>
                </div>
            </div>
        </>
    )
}