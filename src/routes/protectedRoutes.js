import React from 'react'
import { useUser } from '../config/firebase'
import { Navigate } from 'react-router-dom';

export default function ProtectedRoutes({ children }) {
    const { loading, isCustomer } = useUser();
    // console.log(loading, isCustomer);
    if (!loading) {
        if (!isCustomer) {
            return <Navigate to="/signin" replace />;
        }
        return children;
    }
}