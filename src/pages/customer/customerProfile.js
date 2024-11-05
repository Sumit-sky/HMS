import React from 'react'
import HomeNavbar from '../../components/customer/layout/homeNavbar'
import PhotoSection from '../../components/customer/profile/photoSection'
import PersonalInfo from '../../components/customer/profile/personalInfo'
import SecurityInfo from '../../components/customer/profile/securityInfo'

export default function CustomerProfile() {
    return (
        <>
            <HomeNavbar />
            <div className='flex justify-center w-full '>
                <div className='w-11/12 flex justify-around py-5'>
                    <PhotoSection />
                    <div className='w-8/12'>
                        <PersonalInfo />
                        <SecurityInfo />
                    </div>
                </div>
            </div>
            {/* <HomeFooter /> */}
        </>
    )
}
