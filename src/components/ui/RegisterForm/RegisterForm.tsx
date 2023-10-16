// 'use client'

// import Form from "@/components/form/Form"
// import FormInput from "@/components/form/FormInput"
// import { Button, Col, Row, message } from "antd"
// import { SubmitHandler } from "react-hook-form"
// import styles from './RegisterForm.module.css'
// import { useRouter } from "next/navigation"
// import { getUserInfo, storeUserInfo } from "@/services/auth.service"

// type IRegisterFormProps = {
//     title: string;
//     role:'user' | 'agency'
// }
// type IRegisterFormValues = {
//     first_name: string;
//     last_name: string;
//     role: 'user' | 'agency';
//     email: string;
//     password: string;
//     contact_no: string;
//     about_user: string;
//     profile_img:string
// }
// const RegisterForm = ({ title, role }: IRegisterFormProps) => {
    
//         const router = useRouter();
//     // const [registration] = useRegistrationMutation();
    
//     const handleRegister:SubmitHandler<IRegisterFormValues> = async (data:any)=> {
//         try {
//             const defaultImg = "https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg"
//             const res = await registration({ ...data,role,profile_img:defaultImg }).unwrap();
//             console.log(res)
          
//       if (res?.accessToken) {
//         router.push('/profile');
//         message.success('User logged in successfully')
//           }
//       const accessToken = res?.accessToken
//       storeUserInfo(accessToken)
//       getUserInfo()
//     } catch (error) {
//     }
//     }

//   return (
//       <div className={styles.form_container}>
//           <h2 style={{padding:"15px 0"}}>{title}</h2>
//           <div>
//               <Form  submitHandler={handleRegister}>
//                   <Row gutter={20}>
//                 <Col sm={24} md={12} style={{margin:"5px 0"}}>
//                  <FormInput
//                 name='first_name'
//                 type='text'
//                 size='large'
//                 label='First name'
//               />
//                   </Col>
//                   <Col sm={24} md={12} style={{margin:"5px 0"}}>
//                  <FormInput
//                 name='last_name'
//                 type='text'
//                 size='large'
//                 label='Last name'
//               />
//                   </Col>
//                   <Col sm={24} md={12} style={{margin:"5px 0"}}>
//                  <FormInput
//                 name='email'
//                 type='email'
//                 size='large'
//                 label='Email'
//               />
//                   </Col>
//                   <Col sm={24} md={12} style={{margin:"5px 0"}}>
//                  <FormInput
//                 name='password'
//                 type='password'
//                 size='large'
//                 label='Password'
//               />
//                   </Col>
//                   <Col sm={24} md={12} style={{margin:"5px 0"}}>
//                  <FormInput
//                 name='contact_no'
//                 type='text'
//                 size='large'
//                 label='Contact no'
//               />
//                   </Col>
//                   <Col sm={24} md={12} style={{margin:"5px 0"}}>
//                  <FormInput
//                 name='about_user'
//                 type='text'
//                 size='large'
//                 label='Details'
//               />
//                   </Col>
//                   <Col sm={24} md={12} style={{margin:"5px 0"}}>
//                  <FormInput
//                 name='profile_img'
//                 type='text'
//                 size='large'
//                 label='Profile Img'
//                 value='testing'
//               />
//                   </Col>
//                   </Row>
//                   <Button type="primary" htmlType="submit" style={{margin:"10px 0"}}>Sign up</Button>
//               </Form>
//           </div>
//     </div>
//   )
// }

// export default RegisterForm