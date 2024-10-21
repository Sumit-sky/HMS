import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// Hotel Pages
import HotelDashboard from '../pages/hotel/hotelDashboard';
import HotelSignUp from '../pages/hotel/hotelSignUp';
import HotelLogin from '../pages/hotel/hotelLogin';
// Customer Pages
import CustomerSignUp from '../pages/customer/customerRegister';
import CustomerLogin from '../pages/customer/customerLogin';
import CustomerHome from '../pages/customer/customerHome';
import CustomerProfile from '../pages/customer/customerProfile';
// Common
import ContactUs from '../pages/contactUs';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Customer Pages */}
        <Route path='/' element={<CustomerHome />}></Route>
        <Route path='/signin' element={<CustomerLogin />}></Route>
        <Route path='/signup' element={<CustomerSignUp />}></Route>
        <Route path='/profile' element={<CustomerProfile />}></Route>

        {/* Hotel Pages */}
        <Route path='/hotel/signup' element={<HotelSignUp />}></Route>
        <Route path='/hotel/signin' element={<HotelLogin />}></Route>
        <Route path='/hotel/dashboard' element={<HotelDashboard />}></Route>

        {/* Common Pages */}
        <Route path='/contact' element={<ContactUs />}></Route>
      </Routes>
    </BrowserRouter>
  )
}