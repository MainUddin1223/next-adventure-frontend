import * as yup from 'yup';

export const planFormSchema = yup.object().shape({
	plan_name: yup.string().required('Plan name is required'),
	starting_location: yup.string().required('Starting location is required'),
	description: yup.string().required('Description is required'),
	destination: yup.string().required('Destination is required'),
	price: yup.number().required('Plan price is required'),
	tour_duration: yup.number().required('Tour duration is required'),
	total_meals: yup.number().required('Total meals is required'),
	booking_deadline: yup.date().required('Booking deadline is required'),
	starting_time: yup.date().required('Starting time is required'),
	images: yup.array(yup.string().required()).required('Image is required'),
	cover_location: yup
		.array(yup.string().required())
		.min(1)
		.required('Cover location is required'),
	events: yup
		.array(yup.string().required())
		.min(1)
		.required('Events are required'),
});
