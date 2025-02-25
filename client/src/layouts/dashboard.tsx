import { Outlet } from 'react-router-dom';
import Sidebar from '@/components/sidebar';

export default function DashboardLayout() {
	return (
		<div className={'flex h-screen bg-background'}>
			<Sidebar/>
			<main className={'flex-1 overflow-y-auto'}>
				<div className={'container py-6'}>
					<Outlet/>
				</div>
			</main>
		</div>
	);
}