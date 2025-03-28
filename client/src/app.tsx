import { Routes, Route } from 'react-router-dom';
import {
	authRoutes, adminRoutes, userRoutes, doctorRoutes, patientRoutes, commonRoutes
} from '@/routes';
import SiteLayout from '@/layouts/website';
import AuthLayout from '@/layouts/auth';
import DashboardLayout from '@/layouts/dashboard';
import AuthWrapper from '@/components/authWrapper';
import ProtectedRoute from '@/components/protectedRoute';
import HomePage from '@/views/general/home';
import BookAppointment from '@/views/patient/bookAppointment';
import EditAppointment from '@/views/patient/editAppointment';
import { NotFound, UnAuthorized } from '@/views/auth/error';

export default function App() {
	return (
		<SiteLayout>
			<AuthWrapper>
				<Routes>
					{/* public routes */}
					<Route index element={<HomePage/>}/>
					
					{/* common routes */}
					<Route>
						{commonRoutes.map((route) => {
							const Component = route.component;
              
              return (
                <Route key={route.path} path={route.path} element={<Component/>}/>
              );
						})}
					</Route>
					
					{/* auth routes */}
					<Route element={<ProtectedRoute allowedRoles={['Auth']}/>}>
						<Route element={<AuthLayout/>}>
							{authRoutes.map((route, idx) => {
								const Component = route.component;
								
								return (
									<Route key={idx} path={route.path} element={<Component/>}/>
								);
							})}
						</Route>
					</Route>
					
					{/* admin routes */}
					<Route element={<ProtectedRoute allowedRoles={['Admin']}/>}>
						<Route element={<DashboardLayout/>}>
							{adminRoutes.map((route, idx) => {
								const Component = route.component;
								
								return (
									<Route key={idx} path={route.path} element={<Component/>}/>
								);
							})}
						</Route>
					</Route>
					
					{/* user routes */}
					<Route element={<ProtectedRoute allowedRoles={['Admin', 'Doctor', 'Patient']}/>}>
						<Route element={<DashboardLayout/>}>
							{userRoutes.map((route, idx) => {
								const Component = route.component;
								
								return (
									<Route key={idx} index={route.path === '/profile'} path={route.path} element={<Component/>}/>
								);
							})}
						</Route>
					</Route>
					
					{/* doctor routes */}
					<Route element={<ProtectedRoute allowedRoles={['Admin', 'Doctor']}/>}>
						<Route element={<DashboardLayout/>}>
							{doctorRoutes.map((route, idx) => {
								const Component = route.component;
								
								return (
									<Route key={idx} path={route.path} element={<Component/>}/>
								);
							})}
						</Route>
					</Route>
					
					{/* patient routes */}
					<Route element={<ProtectedRoute allowedRoles={['Admin', 'Patient']}/>}>
						<Route path={'/book-appointment'} element={<BookAppointment/>}/>
						
						<Route element={<DashboardLayout/>}>
							<Route path={'/patient/appointments/:id/edit'} element={<EditAppointment/>}/>
							{patientRoutes.map((route, idx) => {
								const Component = route.component;
								
								return (
									<Route key={idx} path={route.path} element={<Component/>}/>
								);
							})}
						</Route>
					</Route>
					
					{/* error routes */}
					<Route path={'*'} element={<NotFound/>}/>
					<Route path={'/unauthorized'} element={<UnAuthorized/>}/>
				</Routes>
			</AuthWrapper>
		</SiteLayout>
	);
}