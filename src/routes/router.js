import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CustomerLogin from '../pages/authentication/customerLogin';
import CustomerSignUp from '../pages/authentication/customerRegister';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<CustomerLogin />}></Route>
        <Route path='/signup' element={<CustomerSignUp />}></Route>
      </Routes>
    </BrowserRouter>
  )
}
