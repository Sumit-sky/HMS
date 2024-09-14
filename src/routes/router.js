
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CustomerLogin from '../pages/customer/customerLogin';
import CustomerSignUp from '../pages/customer/customerRegister';
import HotelSignUp from '../pages/hotel/hotelSignUp';
import HotelLogin from '../pages/hotel/hotelLogin';
import HotelDashboard from '../pages/hotel/hotelDashboard';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/signin' element={<CustomerLogin />}></Route>
        <Route path='/signup' element={<CustomerSignUp />}></Route>
        <Route path='/hotel/signup' element={<HotelSignUp />}></Route>
        <Route path='/hotel/signin' element={<HotelLogin />}></Route>
        <Route path='/hotel/dashboard' element={<HotelDashboard />}></Route>
      </Routes>
    </BrowserRouter>
  )
}