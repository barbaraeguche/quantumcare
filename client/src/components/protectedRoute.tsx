import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAppSelector } from '@/hooks/useAppDispatch';

export default function ProtectedRoute({ allowedRoles }: {
	allowedRoles: string[]
}) {
	const location = useLocation();
	const { isAuthenticated, user: { role } } = useAppSelector((state) => state.userSlice);
	
	// if the user on an auth route
	if (allowedRoles.includes('Auth')) {
		// if the user is signed in, determine the right redirect
		if (isAuthenticated) {
			// check if coming from sign-in page specifically
			const isFromSignIn = location.pathname.includes('/auth/signin');
			const redirectTo = isFromSignIn && location.state?.from
				? location.state.from  // after login, go to the previous page
				: '/profile';          // after signup, go to profile
			
			return <Navigate to={redirectTo} replace/>
		}
		
		// else proceed
		return <Outlet/>;
	}
	
	// no session, redirect to sign in with current location
	if (!isAuthenticated) {
		return <Navigate to={'/auth/signin'} replace state={{ from: location.pathname }} />
	}

	// check if the user has permission based on their role
	const hasRequiredRole = allowedRoles.includes(role);
	if (!hasRequiredRole) {
		return <Navigate to={'/unauthorized'} replace/>
	}
	
	// the user is authenticated and authorized
	return <Outlet/>;
}