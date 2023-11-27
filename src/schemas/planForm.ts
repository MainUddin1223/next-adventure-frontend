import * as yup from 'yup';

export const planFormSchema = yup.object().shape({
	planName: yup.string().required('Plan name is required'),
	departureFrom: yup.string().required('Starting location is required'),
	description: yup.string().required('Description is required'),
	destination: yup.string().required('Destination is required'),
	price: yup.number().required('Plan price is required'),
	duration: yup.string().required('Tour duration is required'),
	meals: yup.string().required('Total meals is required'),
	deadline: yup.date().required('Booking deadline is required'),
	departureTime: yup.date().required('Starting time is required'),
	totalSeats: yup.string().required('Total seat is required'),
	images: yup.array(yup.string().required()).required('Image is required'),
	coverLocations: yup
		.array(yup.string().required())
		.min(1)
		.required('Cover location is required'),
	events: yup
		.array(yup.string().required())
		.min(1)
		.required('Events are required'),
	notAllowed: yup
		.array(yup.string().required())
		.min(1)
		.required('Not Allowed activities are required'),
});
