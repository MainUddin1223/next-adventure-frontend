import * as yup from 'yup';

export const loginSchema = yup.object().shape({
	password: yup.string().min(6).max(32).required('Password required'),
	email: yup.string().email().required('Email is required'),
});
export const signupSchema = yup.object().shape({
	password: yup.string().min(6).max(32).required('Password required'),
	confirmPassword: yup
		.string()
		.min(6)
		.max(32)
		.required('Confirm Password required'),
	email: yup.string().email().required('Email is required'),
});

export const registerSchema = yup.object().shape({
	password: yup.string().min(6).max(32).required('Password required'),
	email: yup.string().email().required('Email is required'),
	name: yup.string().required('Name is required'),
	location: yup.string().required('Location is required'),
	profileImg: yup.string().required('Image is required'),
	about: yup.string().required('About is required'),
});
export const reviewSchema = yup.object().shape({
	rating: yup.number().min(1).required('Rating is required'),
	review_description: yup.string().required('Description is required'),
});
