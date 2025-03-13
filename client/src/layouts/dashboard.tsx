import { Outlet } from 'react-router-dom';
import Sidebar from '@/components/sidebar';

export default function DashboardLayout() {
	return (
		<div className={'flex h-full bg-background'}>
			<div className={'min-h-dvh'}>
				<Sidebar/>
			</div>
			<main className={'grow flex-1 overflow-y-auto mb-40'}>
				<div className={'p-[2rem] xl:p-[4rem]'}>
					<Outlet/>
				</div>
			</main>
		</div>
	);
}