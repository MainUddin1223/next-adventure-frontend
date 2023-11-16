'use client';

import { useGetLandingPageDataQuery } from '@/redux/api/publicApi';
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
	const { data, isLoading } = useGetLandingPageDataQuery(undefined);
	if (isLoading) {
		return (
			<div style={{ margin: '10px' }}>
				<SkeletonLoader items={4} />
			</div>
		);
	}
	return (
		<>
			<div className="landing_page_container">
				<div style={{ margin: '100px 0' }}>
					<FeaturedTour tours={data} />
				</div>
				<div style={{ margin: '100px 0' }}>
					<AgencyBanner />
				</div>
				<div style={{ margin: '100px 0' }}>
					<PopularAgencies agencies={data} />
				</div>
			</div>
			<div className="landing_page_banner_container">
				<div style={{ margin: '100px 0' }}>
					<Guideline />
				</div>
			</div>
			<div className="landing_page_container">
				<div style={{ margin: '100px 0' }}>
					<Reviews reviews={data} />
				</div>
				{isLoggedInUser && (
					<div style={{ margin: '100px 0' }}>
						<LeaveReview />
					</div>
				)}
			</div>
			<div className="landing_page_banner_container">
				<div style={{ margin: '100px 0' }}>
					<Motto />
				</div>
			</div>
		</>
	);
};

export default LandingPageProvider;
