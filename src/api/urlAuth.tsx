import { Navigate, Outlet } from 'react-router-dom';

let isLoggedIn = false

export function isAuthenticated(): boolean {
    const data = localStorage.getItem('userDetails');
    if (data) {
        isLoggedIn = true
    }
    return isLoggedIn;
}

export function ProtectedRoute() {
    return isAuthenticated() ? <Outlet /> : <Navigate to="/" />;
}