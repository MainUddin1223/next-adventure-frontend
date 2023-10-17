import * as yup from 'yup';

export const loginSchema = yup.object().shape({
    password: yup.string().min(6).max(32).required('Password required'),
    email: yup.string().email().required('Email is required'),
})
export const signupSchema = yup.object().shape({
    password: yup.string().min(6).max(32).required('Password required'),
    confirmPassword: yup.string().min(6).max(32).required('Confirm Password required'),
    email: yup.string().email().required('Email is required'),
})

export const registerSchema = yup.object().shape({
    password: yup.string().min(6).max(32).required('Password required'),
    confirmPassword: yup.string().min(6).max(32).required('Confirm Password required'),
    email: yup.string().email().required('Email is required'),
    first_name: yup.string().required('First name is required'),
    last_name: yup.string().required('Last name is required'),
    profile_img: yup.string().required('Image is required'),
    about_user: yup.string().required('About is required'),
})