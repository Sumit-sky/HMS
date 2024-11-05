import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoutes from './protectedRoutes';
import ProtectedHotelRoutes from './protectedHotelRoutes';
import HotelRoutes from './hotelRoutes';
import CustomerRoutes from './customerRoutes';
// Hotel Pages
import HotelDashboard from '../pages/hotel/hotelDashboard';
import HotelSignUp from '../pages/hotel/hotelSignUp';
import HotelLogin from '../pages/hotel/hotelLogin';
import HotelHome from '../pages/hotel/hotelHome';
// Customer Pages
import CustomerSignUp from '../pages/customer/customerRegister';
import CustomerLogin from '../pages/customer/customerLogin';
import CustomerHome from '../pages/customer/customerHome';
import CustomerProfile from '../pages/customer/customerProfile';
// Common
import ContactUs from '../pages/contactUs';
import ForgotPasswordPage from '../pages/forgotPassword/forgotPasswordPage';
import ResetPass from '../pages/forgotPassword/resetPass';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Customer Pages */}
        <Route path='/' element={<HotelRoutes><CustomerHome /></HotelRoutes>}></Route>
        <Route path='/signin' element={<CustomerLogin />}></Route>
        <Route path='/signup' element={<CustomerSignUp />}></Route>
        <Route path='/profile' element={<ProtectedRoutes><CustomerProfile /></ProtectedRoutes>}></Route>
        <Route path='/contact' element={<HotelRoutes><ContactUs /></HotelRoutes>}></Route>

        {/* Hotel Pages */}
        <Route path='/hotel/home' element={<CustomerRoutes><HotelHome /></CustomerRoutes>}></Route>
        <Route path='/hotel/signup' element={<HotelSignUp />}></Route>
        <Route path='/hotel/signin' element={<HotelLogin />}></Route>
        <Route path='/hotel/dashboard' element={<ProtectedHotelRoutes><HotelDashboard /></ProtectedHotelRoutes>}></Route>

        {/* Common Pages */}
        <Route path='/forgotPassword' element={<ForgotPasswordPage />}></Route>
        <Route path='/resetPassword' element={<ResetPass />}></Route>
      </Routes>
    </BrowserRouter>
  )
}