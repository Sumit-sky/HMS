import { useUser } from '../config/firebase'

export default function CustomerRoutes({ children }) {
    const { loading, isCustomer } = useUser();
    if (!loading) {
        if (isCustomer) {
            return window.history.back();;
        }
        return children;
    }
}