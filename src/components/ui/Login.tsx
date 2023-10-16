'use client'
import {useState} from 'react'
import Image from "next/image";
import PublicLayout from "./PublicLayout"
import { Col, Row,Button,message, Card, Modal, Spin } from 'antd';
import login_img from '@/assets/login.png'
import { useRouter } from "next/navigation";
import { FormValues } from "../types";
import { SubmitHandler } from "react-hook-form";
import Form from "../form/Form";
import FormInput from "../form/FormInput";
import { useUserLoginMutation } from "@/redux/api/authApi";
import { getUserInfo, storeUserInfo } from "@/services/auth.service";
import Link from "next/link";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "@/schemas/auth";
import PerLoader from './loader/PreLoader';

const Login = () => {
  const [isLoading,setIsLoading] = useState(false)

    const router = useRouter();
      const [userLogin] = useUserLoginMutation();

  const onsubmit: SubmitHandler<FormValues> = async (data: any) => {
    try {
        setIsLoading(true)
          const res = await userLogin({ ...data }).unwrap();
          
        if (res?.accessToken) {
          message.success('User logged in successfully')
          const accessToken = res?.accessToken
          await storeUserInfo(accessToken)
          const authInfo: any = getUserInfo();
          setIsLoading(false)
          console.log('--------------efrref----------------')
          router.push(`${authInfo?.role}/profile`);
        }
      if (!res.success) {
          setIsLoading(false)
           Modal.error({
                  content: 'Failed to login',
                });
        }
      } catch (error) {
        console.log(error)
    }
  }

    return (
      <PublicLayout>
          <Card style={{ width: "80%", margin: "0 auto", marginTop: "30px" }}>
                {/* {
            isLoading && <PerLoader/>
          } */}
          <Row justify='center'
               align='middle' >
          <Col xs={24} sm={10} md={8} span={12}> 
            
          <h1 style={{ margin: "15px 0" }}>Login your account</h1>
        <div>
          <Form submitHandler={onsubmit} resolver={yupResolver(loginSchema)}>
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
                label='User Password' />
                  </div>
            <Button type='primary' htmlType='submit'>
              Login
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

export default Login