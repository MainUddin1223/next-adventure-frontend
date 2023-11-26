'use client';
import AgencyProfile from '@/components/profile/AgencyProfile';
import PerLoader from '@/components/ui/loader/PreLoader';
import { useGetUserProfileQuery } from '@/redux/api/userApi';

const page = () => {
	const { data, isLoading } = useGetUserProfileQuery(undefined);

	if (isLoading) {
		return <PerLoader />;
	}
	return (
		<>
			<AgencyProfile data={data} />
		</>
	);
};

export default page;
