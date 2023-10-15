'use client'

import Image from "next/image";
import PublicLayout from "./PublicLayout"
import { Col, Row,Button,message } from 'antd';
import login_img from '@/assets/login.png'
import { useRouter } from "next/navigation";
import { FormValues } from "../types";
import { SubmitHandler } from "react-hook-form";
import Form from "../form/Form";
import FormInput from "../form/FormInput";
import { useUserLoginMutation } from "@/redux/api/authApi";
import { getUserInfo, storeUserInfo } from "@/services/auth.service";

const Login = () => {
    const router = useRouter();
      const [userLogin] = useUserLoginMutation();

  const onsubmit:SubmitHandler<FormValues> = async (data:any) => {
      try {
          const res = await userLogin({ ...data }).unwrap();
          
        if (res?.accessToken) {
          message.success('User logged in successfully')
          const accessToken = res?.accessToken
          await storeUserInfo(accessToken)
          const authInfo:any = getUserInfo();
          router.push(`${authInfo?.role}/profile`);
        }
    } catch (error) {
    }
  }
    return (
      <PublicLayout>
          <Row justify='center'
               align='middle' style={{width:"80%", margin:"0 auto"}}>
                <Col xs={24} sm={10} md={8} span={12}>  
                        <h1
          style={{ margin: "15px 0" }}
        >First login your account</h1>
        <div>
          <Form submitHandler={onsubmit}>
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
        </div>    
              </Col>
                <Col xs={24} sm={10} md={8} span={12}>
                  <Image layout="responsive" src={login_img } width={500} height={500} alt="login_img"/>   
               </Col>
    </Row>
      </PublicLayout>
  )
}

export default Login