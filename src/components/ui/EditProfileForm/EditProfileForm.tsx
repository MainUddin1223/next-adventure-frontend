'use client'

import Form from '@/components/form/Form'
import FormInput from '@/components/form/FormInput'
import { Button, Card, Col, Row } from 'antd'
import ProfileImageUploader from '../ImageUploader/ImageUploader'
import { useGetUserProfileQuery, useUpdateUserProfileMutation } from '@/redux/api/userApi'
import { SubmitHandler } from "react-hook-form";
import FormTextArea from '@/components/form/FormTextArea'
import { useRouter } from 'next/navigation'

const EditProfileForm = () => {

  const { data: profileData } = useGetUserProfileQuery(undefined);
  const router = useRouter()

  const userInfo = {
    first_name: profileData?.first_name,
    last_name: profileData?.last_name,
    contact_no:profileData?.contact_no,
    profile_img:profileData?.profile_img,
    about_user:profileData?.about_user
  }
  
  const [updateUserProfile] = useUpdateUserProfileMutation()

  const onsubmit: SubmitHandler<any> = async (data: any) => {
    const res: any = await updateUserProfile(data);

      if (res?.data?.success == true) {
        router.back()
      }
  }

  return (
    <div>
        <Card style={{ width: "80%", margin: "0 auto", marginTop: "30px" }}>
          <h1 style={{ margin: "15px 0" }}>Update your profile</h1>
        <div>
          <Form submitHandler={onsubmit} defaultValues={userInfo}>
            <Row gutter={[20, 20]}>
             <Col sm={24} md={24}>
              <div style={{ margin: "15px 0" }}>
                  <ProfileImageUploader name={'profile_img'} defaultUrl={profileData?.profile_img} />
            </div>
             </Col> 

             <Col sm={24} md={12}>
              <div style={{ margin: "15px 0" }}>
                <FormInput
                    name='first_name'
                    value={profileData?.first_name}
                type='text'
                size='large'
                label='First name'
              />
            </div>
             </Col>             
             <Col sm={24} md={12}>
              <div style={{ margin: "15px 0" }}>
                <FormInput
                name='last_name'
                    type='text'
                size='large'
                label='Last name'
              />
            </div>
             </Col>             
            <Col sm={24} md={12}>
              <div style={{ margin: "15px 0" }}>
                <FormInput
                name='contact_no'
                type='text'
                size='large'
                label='Contact no'
              />
            </div>
             </Col>             
             <Col sm={24} md={24}>
                <div style={{ margin: "15px 0" }}>
                  <FormTextArea
                    name='about_user'
                    rows = {6}
                    placeholder="About..."
                    label='About'
                  />
            </div>
             </Col>                         
            </Row>
            <Button type='primary' htmlType='submit'>
              Update
            </Button>
                  </Form>
                  </div>
          </Card>
    </div>
  )
}

export default EditProfileForm