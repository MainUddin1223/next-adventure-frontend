'use client';

import { useGetAgenciesAndPlansQuery } from '@/redux/api/publicApi';
import { isLoggedIn } from '@/services/auth.service';
import SkeletonLoader from '../Skeleton/Skeleton';
import AgencyBanner from './Banners/Agency-banner/AgencyBanner';
import Motto from './Banners/Motto-banner/Motto';
import FeaturedTour from './Featured-tour/FeaturedTour';
import Guideline from './Guideline/Guideline';
import LeaveReview from './Review/LeaveReview';
import Reviews from './Review/Reviews';
import PopularAgencies from './popular-agencies/PopularAgencies';

const LandingPageProvider = () => {
	const isLoggedInUser = isLoggedIn();
	const { data, isLoading } = useGetAgenciesAndPlansQuery(undefined);
	if (isLoading) {
		return (
			<div style={{ margin: '10px' }}>
				<SkeletonLoader items={4} />
			</div>
		);
	}
	return (
		<>
			<FeaturedTour tours={data} />
			<AgencyBanner />
			<PopularAgencies agencies={data} />
			<Guideline />
			<Reviews reviews={data} />
			{isLoggedInUser && <LeaveReview />}
			<Motto />
		</>
	);
};

export default LandingPageProvider;
