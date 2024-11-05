import { useUser } from '../config/firebase'

export default function HotelRoutes({ children }) {
    const { loading, isHotel } = useUser();
    if (!loading) {
        if (isHotel) {
            return window.history.back();;
        }
        return children;
    }
}