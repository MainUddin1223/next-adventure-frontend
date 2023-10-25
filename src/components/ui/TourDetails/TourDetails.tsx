'use client'
import profile_img from '@/assets/popular-agency.jpg'
import PublicLayout from '@/components/ui/PublicLayout'
import { useGetPlanDetailsQuery } from '@/redux/api/publicApi'
import { useAppDispatch } from '@/redux/hooks'
import { addToCart } from '@/redux/slice/orderSlice'
import { formateDateAndTime } from '@/services/timeFormater'
import { CarOutlined } from '@ant-design/icons'
import { Button, Card, Col, Rate, Row, Tag } from 'antd'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import styles from './TourDetails.module.css'

const TourDetails = ({ id }: { id: number }) => {
    const router = useRouter();
    const dispatch = useAppDispatch()
    const { data, isLoading } = useGetPlanDetailsQuery(Number(id))
    const info: any = data;
    const title = <div className={styles.details_header_section}>
        <span>
            <h2>{info?.plan_name}</h2>
            <p> $ {info?.price}</p>
            <span style={{display:"flex",gap:"10px"}}>
                <CarOutlined /><p>{info?.starting_location}</p>
            </span>
        </span>
        <div style={{display:"flex",gap:"10px",alignItems:"center",margin:"15px 0"}}>
            <Image src={profile_img} width={40} height={40} alt='profile' style={{borderRadius:"50%",cursor:"pointer"}}/>
            <p style={{fontSize:"19px"}}>{info?.users?.first_name } {info?.users?.last_name }</p>
        </div>
        <Rate disabled defaultValue={5} />
    </div>
    const bookingDeadline = formateDateAndTime(info?.booking_deadline);
    const reportingTime = formateDateAndTime(info?.starting_time)
  return (
        <PublicLayout>
       <Card title={title} className={styles.details_card_container} style={{ margin:"0 auto",marginTop:"50px",padding:'0'  }}>
              <Row gutter={15}>
                  <Col sm={24}>Image section</Col>
                  <Col md={12} sm={24}>
                      <p>Description{info?.description }</p>
                      <div>
                          <p>Cover locations</p>
                          {
                              info?.cover_location?.map((location:string,index:number) => (
                                  <Tag color="green" key={index}>{ location}</Tag>
                              ))
                          }
                     </div>
                      <div>
                          <p>Events</p>
                          {
                              info?.events.map((event:string,index:number) => (
                                  <Tag color="green" key={index}>{ event}</Tag>
                              ))
                          }
                     </div>
                  </Col>
                  <Col md={12}>
                      <p>Deadline: {bookingDeadline.time} {bookingDeadline.date }</p>
                      <p>Tour duration: {info?.tour_duration}</p>
                      <p>Total meals: {info?.total_meals}</p>
                      <p>Reporting time: {reportingTime.time} {reportingTime.date }</p>
                  </Col>
              </Row>
              <div className={styles.book_button}>
                  <Button type='primary' onClick={() => {
                      dispatch(addToCart(info))
                      router.push('/plan-summary')
                  }} >Book plan</Button>
              </div>
       </Card>
   </PublicLayout>
  )
}

export default TourDetails