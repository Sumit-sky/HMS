
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CustomerLogin from '../pages/authentication/customerLogin';
import CustomerSignUp from '../pages/authentication/customerRegister';
import HotelSignUp from '../pages/authentication/hotelSignUp';
import HotelLogin from '../pages/authentication/hotelLogin';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<CustomerLogin />}></Route>
        <Route path='/signup' element={<CustomerSignUp />}></Route>
        <Route path='/hotelsignup' element={<HotelSignUp />}></Route>
        <Route path='/hotellogin' element={<HotelLogin />}></Route>
      </Routes>
    </BrowserRouter>
  )
}