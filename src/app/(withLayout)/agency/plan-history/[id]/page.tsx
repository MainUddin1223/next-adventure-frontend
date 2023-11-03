import MyPlans from '@/components/ui/agencies/BookingHistory/BookingHistoryTable';
import React from 'react';

const PlanBookingHistory = ({ params }: { params: any }) => {
	return (
		<div>
			<MyPlans id={params.id} />
		</div>
	);
};

export default PlanBookingHistory;
