import Summary from '@/components/ui/PlanSummary/Summary';
import PublicLayout from '@/components/ui/PublicLayout';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Summary | Next Adventure',
	description: 'Generated by create next app',
};

const PlanSummary = () => {
	return (
		<>
			<PublicLayout>
				<Summary />
			</PublicLayout>
		</>
	);
};

export default PlanSummary;
