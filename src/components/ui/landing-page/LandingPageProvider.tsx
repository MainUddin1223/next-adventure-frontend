'use client';

import { useGetLandingPageDataQuery } from '@/redux/api/publicApi';
import { getUserInfo } from '@/services/auth.service';
import SkeletonLoader from '../Skeleton/Skeleton';
import Accordion from './Accordion/Accordion';
import AgencyBanner from './Banners/Agency-banner/AgencyBanner';
import Motto from './Banners/Motto-banner/Motto';
import CeoSection from './CeoSection/CeoSection';
import FeaturedTour from './Featured-tour/FeaturedTour';
import Guideline from './Guideline/Guideline';
import LeaveReview from './Review/LeaveReview';
import Reviews from './Review/Reviews';
import PopularAgencies from './popular-agencies/PopularAgencies';

const LandingPageProvider = () => {
	const { role } = getUserInfo() as any;
	const { data, isLoading } = useGetLandingPageDataQuery(undefined);
	if (isLoading) {
		return (
			<div className="landing_page_container">
				<SkeletonLoader items={4} />
			</div>
		);
	}
	return (
		<>
			<div className="landing_page_container">
				<div className='landing_page_sections'>
					<CeoSection />
				</div>
				{/* <Activities /> */}
				<div className='landing_page_sections'>
					<FeaturedTour tours={data} />
				</div>
				<div className='landing_page_sections'>
					<AgencyBanner />
				</div>
				<div className='landing_page_sections'>
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
				{role == 'user' && (
					<div className='landing_page_sections'>
						<LeaveReview />
					</div>
				)}
			</div>
			<div className="landing_page_banner_container">
				<div style={{ margin: '100px 0' }}>
					<Motto />
				</div>
			</div>
			<div className="landing_page_banner_container">
				<div style={{ margin: '100px 0' }}>
					<Accordion />
				</div>
			</div>
		</>
	);
};

export default LandingPageProvider;
