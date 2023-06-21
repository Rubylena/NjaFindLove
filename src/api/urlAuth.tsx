import { Navigate, Outlet } from 'react-router-dom';
import { encryptStorage } from '../encrypt/encrypt';

let isLoggedIn: boolean;
export function isAuthenticated(): boolean {
    const data = encryptStorage.getItem('isLoggedIn')!;
    if (data) {
        isLoggedIn = true
    }

    return isLoggedIn;
}

export function ProtectedRoute() {
    return isAuthenticated() ? <Outlet /> : <Navigate to="/" replace={true} />;
}

export function ExtraProtectedRoute() {
    const data = encryptStorage.getItem('completeProfile')
    return isAuthenticated() && data ?
        <Navigate to={`/dashboard`} /> : <Outlet />;
}