'use client';
import { isLoggedIn } from '@/services/auth.service';
import { usePathname, useRouter } from 'next/navigation';
import { ReactElement, ReactNode, useState } from 'react';
type IProtectedRoute = {
	children: ReactElement | ReactNode;
};
const ProtectedWithAuth = ({ children }: IProtectedRoute) => {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(true);
	const isLoggedInUser = isLoggedIn();
	const currentRoute = usePathname();
	// useEffect(() => {
	//     setTimeout(() => {
	//         setIsLoading(false)
	//     },2000)
	// }, [])
	// if (isLoading) {
	//     return (
	//         <LoadingSpinner/>
	//     )
	// }
	if (!isLoggedInUser) {
		localStorage.setItem('redirectTo', currentRoute);
		router.push('/login');
		return;
	}
	return <div>{children}</div>;
};

export default ProtectedWithAuth;
