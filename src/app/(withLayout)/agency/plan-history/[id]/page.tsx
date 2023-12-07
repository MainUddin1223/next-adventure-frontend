'use client';
import MyPlans from '@/components/ui/agencies/BookingHistory/BookingHistoryTable';

const PlanBookingHistory = ({ params }: { params: any }) => {
	return (
		<div>
			<MyPlans id={params.id} />
		</div>
	);
};

export default PlanBookingHistory;
