import { Link, NavLink } from 'react-router-dom';
import { Heart, UserRoundPen } from 'lucide-react';
import { useAppSelector } from '@/hooks/useAppDispatch';
import { LogoutButton, SignInButton } from '@/ui/auth-buttons';
import Button from '@/components/ui/button';

export default function Header() {
	const { isAuthenticated, user: { role } } = useAppSelector((state) => state.userSlice);
	
	return (
		<header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
			<div className={'container flex h-16 items-center justify-between'}>
				<Link
					to={'/client/public'}
					className={'flex items-center gap-x-2'}
				>
					<Heart className={'size-6 text-teal-600 animate-pulse'}/>
					<span className={'text-xl font-bold bg-gradient-to-r from-primary to-teal-600 bg-clip-text text-transparent'}>
						QuantumCare
					</span>
				</Link>
				<nav className={'hidden md:flex gap-6'}>
					{['Services', 'How It Works', 'Our Doctors', 'Contact'].map((item) => (
						<NavLink
							key={item}
							to={item.toLowerCase().replace(/\s+/g, '-')}
							className={'text-sm font-medium relative group hover:text-teal-600'}
						>
							{item}
							<span className={'absolute inset-x-0 -bottom-1 h-0.5 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform'}/>
						</NavLink>
					))}
				</nav>
				<div className={'flex items-center gap-4'}>
					{/* appointments should only be shown to patients */}
					{role !== 'Doctor' && (
						<Link to={'/book-appointment'}>
							<Button className={'bg-gradient-to-r from-primary to-teal-600 hover:opacity-90'}>
								Book Appointment
							</Button>
						</Link>
					)}
					{isAuthenticated ? (
						<LogoutButton/>
					) : (
						<SignInButton/>
					)}
					
					{/* to profile page */}
					<Link to={'/profile'}>
						<Button
							aria-label={'Profile'}
							variant={'ghost'}
							className={'shadow-none text-gray-600 hover:bg-gray-50 hover:text-gray-800'}
						>
							<UserRoundPen size={22}/>
						</Button>
					</Link>
				</div>
			</div>
		</header>
	);
}