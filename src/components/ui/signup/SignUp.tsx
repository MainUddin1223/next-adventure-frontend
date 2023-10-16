'use client'
import {useState} from 'react'
import Image from "next/image";
import { Col, Row,Button,message, Card, Modal, Spin } from 'antd';
import login_img from '@/assets/login.png'
import { useRouter } from "next/navigation";
import { SubmitHandler } from "react-hook-form";
import { useSignupMutation } from "@/redux/api/authApi";
import { getUserInfo, storeUserInfo } from "@/services/auth.service";
import Link from "next/link";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema, signupSchema } from "@/schemas/auth";
import { FormValues } from '@/components/types';
import PublicLayout from '../PublicLayout';
import FormInput from '@/components/form/FormInput';
import Form from '@/components/form/Form';
import PerLoader from '../loader/PreLoader';

const SignUp = () => {
  const [isLoading,setIsLoading] = useState(false)

    const router = useRouter();
      const [signup] = useSignupMutation();

  const onsubmit: SubmitHandler<FormValues> = async (data: any) => {
    try {
        setIsLoading(true)
          const res = await signup({ ...data }).unwrap();
        if (res?.accessToken) {
          message.success('Congratulations!! Signup successfull')
          const accessToken = res?.accessToken
          await storeUserInfo(accessToken)
          const authInfo: any = getUserInfo();
          setIsLoading(false)
          router.push(`${authInfo?.role}/profile`);
        }
      if (!res.success) {
          setIsLoading(false)
           Modal.error({
                  content: res.message,
                });
        }
      } catch (error) {
        console.log(error)
    }
  }

    return (
      <PublicLayout>
          <Card style={{ width: "80%", margin: "0 auto", marginTop: "30px" }}>
                {
            isLoading && <PerLoader/>
          }
          <Row justify='center'
               align='middle' >
          <Col xs={24} sm={10} md={8} span={12}> 
            
          <h1 style={{ margin: "15px 0" }}>Login your account</h1>
        <div>
          <Form submitHandler={onsubmit} resolver={yupResolver(signupSchema)}>
            <div
            style={{ margin: "15px 0" }}
            >
              <FormInput
                name='email'
                type='text'
                size='large'
                label='User email'
              />
            </div>
            <div
            style={{ margin: "15px 0" }}
            >
              <FormInput
                name='password'
                type='password'
                size='large'
                label=' Password' />
                  </div>
            <div
            style={{ margin: "15px 0" }}
            >
              <FormInput
                name='confirmPassword'
                type='password'
                size='large'
                label='Confirm Password' />
                  </div>
            <Button type='primary' htmlType='submit'>
              Sign Up
            </Button>
                </Form>
                <p style={{marginTop:"20px",textAlign:"right"}}>New to Next Adventure?<Link href='/signup'>Sign up</Link></p>
        </div> 
      
              </Col>
                <Col xs={24} sm={10} md={8} span={12}>
                  <Image layout="responsive" src={login_img } width={500} height={500} alt="login_img"/>   
               </Col>
          </Row>
          </Card>
      </PublicLayout>
  )
}

export default SignUp