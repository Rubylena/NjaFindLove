import { Navigate, Outlet } from 'react-router-dom';

let isLoggedIn: boolean;

export function isAuthenticated(): boolean {
    const data = JSON.parse(localStorage.getItem('userDetails')!);
    if (data) {
        isLoggedIn = true
    }

    return isLoggedIn;
}

export function ProtectedRoute() {
    return isAuthenticated() ? <Outlet /> : <Navigate to="/" />;
}