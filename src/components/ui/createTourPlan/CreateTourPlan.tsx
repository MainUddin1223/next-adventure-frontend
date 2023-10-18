'use client'

import Form from "@/components/form/Form"
import FormInput from "@/components/form/FormInput"
import { Button, Card, Col, DatePicker, Modal, Row, message } from "antd"
import { SubmitHandler } from "react-hook-form"
import styles from './CreateTourPlan.module.css'
import { useRouter } from "next/navigation"
import { getUserInfo, storeUserInfo } from "@/services/auth.service"
import { useRegisterAgencyMutation } from "@/redux/api/authApi"
import { yupResolver } from "@hookform/resolvers/yup";
import FormTextArea from "@/components/form/FormTextArea"
import PublicLayout from "../PublicLayout"
import PerLoader from '../loader/PreLoader';
import { useState } from "react"
import RegisterImageUploader from "../ImageUploader/RegisterImageUploader"
import { registerSchema } from "@/schemas/auth"
import { formateDateAndTime } from "@/services/timeFormater"
import dayjs from "dayjs"
import FormDatePicker from "@/components/form/FormDatePicker"
import TagMaker from "@/components/form/TagMaker"
import TourImagesUploader from "./TourImages"
import { useCreateTourPlanMutation } from "@/redux/api/agencyApi"


const CreateTourPlan = () => {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter();
    
    const [ createTourPlan ] = useCreateTourPlanMutation();
    
  const onsubmit: SubmitHandler<any> = async (data: any) => {
        try {
            const res = await createTourPlan(data).unwrap();
           if (res?.accessToken) {
          const accessToken = res?.accessToken
          await storeUserInfo(accessToken)
          const authInfo: any = getUserInfo();
          setIsLoading(false)
             router.push(`${authInfo?.role}/profile`);
               message.success('Tour plan listed successfully')
        }
      if (!res.success) {
          setIsLoading(false)
           Modal.error({
                  content: 'Failed',
                });
        }
    } catch (error) {
      }
    }

  return (
      <div>
          <Card style={{ width: "80%", margin: "0 auto", marginTop: "30px" }}>
                {
            isLoading && <PerLoader/>
          }
      <div className={styles.form_container}>
            <h1 style={{ margin: "15px 0" }}>Register Agency</h1>
          <div>
              <Form  submitHandler={onsubmit}>
          <Row gutter={20}>
              <Col sm={24} md={24}>
                  <div style={{ margin: "15px 0" }}>
                    <TourImagesUploader name={'images'} />
                  </div>
             </Col>
                <Col sm={24} md={12} style={{margin:"5px 0"}}>
                 <FormInput
                name='plan_name'
                type='text'
                size='large'
                label='Plan name'
              />
                  </Col>
                  <Col sm={24} md={12} style={{margin:"5px 0"}}>
                 <FormInput
                name='starting_location'
                type='text'
                size='large'
                label='Start from'
              />
                  </Col>
                  <Col sm={24} md={12} style={{margin:"5px 0"}}>
                 <FormInput
                name='destination'
                type='text'
                size='large'
                label='Tour Destination'
              />
                  </Col>
                  <Col sm={24} md={12} style={{margin:"5px 0"}}>
                 <FormInput
                name='price'
                type='number'
                size='large'
                label='Plan Price'
              />
                  </Col>
                  <Col sm={24} md={12} style={{margin:"5px 0"}}>
                       <FormDatePicker name="booking_deadline" size="large" label="Booking Deadline"/>
                  </Col>
                  <Col sm={24} md={12} style={{margin:"5px 0"}}>
                       <FormDatePicker name="starting_time" size="large" label="Start time"/>
                     </Col>
                    <Col sm={24} md={12} style={{margin:"5px 0"}}>
                 <FormInput
                name='total_meals'
                type='number'
                size='large'
                label='Total Meals'
              />
                  </Col>
                  <Col sm={24} md={12} style={{margin:"5px 0"}}>
                 <FormInput
                name='tour_duration'
                type='number'
                size='large'
                label='Tour duration'
              />
                              </Col>
                  <Col sm={24} md={24} style={{margin:"5px 0"}}>
                 <TagMaker
                name='cover_location'
                type='number'
                size='large'
                label='Cover locations'
              />
                              </Col>
                  <Col sm={24} md={24} style={{margin:"5px 0"}}>
                 <TagMaker
                name='events'
                type='number'
                size='large'
                label='Total events'
              />
                              </Col>
                              
                <Col sm={24} md={24}>
                <div style={{ margin: "15px 0" }}>
                  <FormTextArea
                    name='description'
                    rows = {6}
                    placeholder="About..."
                    label='Tour Description'
                  />
            </div>
             </Col> 
                  </Row>
                  <Button type="primary" htmlType="submit" style={{margin:"10px 0"}}>Create Plan</Button>
              </Form>
          </div>
        </div>
        </Card>
         </div>

  )
}

export default CreateTourPlan