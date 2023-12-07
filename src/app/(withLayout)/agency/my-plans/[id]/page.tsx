'use client';

import PlanDetails from '@/components/ui/agencies/PlanDetails/PlanDetails';
import { useGetPlanByIdQuery } from '@/redux/api/agencyApi';

type IDProps = {
	params: any;
};

const page = ({ params }: IDProps) => {
	const id = Number(params.id);
	const { data, isLoading } = useGetPlanByIdQuery(id);
	return (
		<div>
			<PlanDetails data={data} />
		</div>
	);
};

export default page;
