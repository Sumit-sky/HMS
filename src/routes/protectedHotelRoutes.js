import React from 'react'
import { useUser } from '../config/firebase'
import { Navigate } from 'react-router-dom';

export default function ProtectedHotelRoutes({ children }) {
    const { loading, isHotel } = useUser();
    if (!loading) {
        if (!isHotel) {
            return <Navigate to="/hotel/signin" replace />;
        }
        return children;
    }
}