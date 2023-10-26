'use client'
import PublicLayout from '@/components/ui/PublicLayout'
import { useGetPlanDetailsQuery } from '@/redux/api/publicApi'
import { useAppDispatch } from '@/redux/hooks'
import { addToCart } from '@/redux/slice/orderSlice'
import { checkValidity, formateDateAndTime } from '@/services/timeFormater'
import { CarOutlined, DollarOutlined, ExclamationCircleOutlined, FlagOutlined } from '@ant-design/icons'
import { Button, Card, Carousel, Col, FloatButton, Rate, Row, Tag } from 'antd'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import BackButton from '../buttons/BackButton'
import LoadingSpinner from '../loader/Loader'
import styles from './PlanDetails.module.css'

const PlanDetails = ({ id }: { id: number }) => {
    const router = useRouter();
    const dispatch = useAppDispatch()
    const { data, isLoading } = useGetPlanDetailsQuery(Number(id));
    if (isLoading) {
        return <LoadingSpinner/>
    }
    const info: any = data;
        const bookingDeadline = formateDateAndTime(info?.booking_deadline);
    const reportingTime = formateDateAndTime(info?.starting_time)
    const isValidDate = checkValidity(info?.booking_deadline);

    const title = <div className={styles.details_header_section}>
        <span>
            <h2 style={{ textTransform: "capitalize", padding: "10px 0" }}>{info?.plan_name}</h2>
                <div style={{fontSize:"18px"}}>
                    <p style={{marginTop:'10px',marginBottom:'5px', fontWeight:'bold'}}><DollarOutlined style={{color:'var(--button-color)',fontSize:'25px'}}/> Booking Fee : {info?.price } </p>
                    <p style={{margin:'10px 0',marginBottom:'5px', fontWeight:'bold'}}><FlagOutlined style={{color:'var(--button-color)',fontSize:'25px'}}/> Destination : {info?.destination}</p>
                    <p style={{margin:'10px 0px', fontWeight:'bold'}}><CarOutlined style={{color:'var(--button-color)',fontSize:'25px'}}/> Departure : {info?.destination}</p>
                </div>
        </span>
        {
            isValidDate ?
                <Tag color="green" style={{ fontSize: "16px", padding: "5px",cursor:'pointer' }} onClick={() => {
                    dispatch(addToCart(info))
                    router.push('/plan-summary')
                }}>Booking Available</Tag>
            :
            <Tag icon={<ExclamationCircleOutlined />} color="error" style={{fontSize:"16px",padding:"5px"}}>Booking closed </Tag>
        }
    </div>

const contentStyle: React.CSSProperties = {
  margin: 0,
  maxHeight: '360px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};

  return (
      <PublicLayout>
          <div className={styles.details_card_container}>
            <div>
                <BackButton/>
            </div>
            <Card title={title}>
              <Row gutter={15}>
                 <Col md={12} sm={24}>
                                                {
                          info?.images.length ?
                             <Carousel>
                                  {
                                      info?.images.map((img: string, i: number) => (
                                          <div key={i}>
                                              <h3 style={contentStyle}>   
                                              <Image  src={img} width={100} height={100} layout='responsive' alt='img'/>
                                              </h3>
                                </div>
                                      )) 
                                  }
                              </Carousel> :
                              <Carousel>
                                  <div>
                                    <Image src={'http://res.cloudinary.com/dld6ete1x/image/upload/v1697711303/n5xg1i3whu3lmg3wzrch.jpg'} width={100} height={100} layout='responsive' alt='default_img'/>
                                </div>
                          </Carousel>
                      }
                          <div style={{margin:'15px 0'}}>
                              <h2>Basic Details</h2>
                              <hr />
                            <div>
                                <p style={{margin:'5px 0',fontSize:'16px',fontWeight:'bold'}}>The Spots we will cover</p>
                                {
                                    info?.cover_location?.map((location:string,index:number) => (
                                        <Tag color="green" key={index} style={{margin:'5px 0', marginRight:'15px', padding:'5px',fontSize:'16px', fontWeight:'bold'}}>{ location}</Tag>
                                    ))
                                }
                            </div>
                            <div>
                                <p style={{margin:'5px 0',fontSize:'16px',fontWeight:'bold'}}>The events you can experience</p>
                                {
                                    info?.events?.map((event:string,index:number) => (
                                        <Tag color="blue" key={index} style={{margin:'5px 0', marginRight:'10px', padding:'5px',fontSize:'16px', fontWeight:'bold'}}>{ event}</Tag>
                                    ))
                                }
                              </div>
                              <hr />
                              <div>
                                  <Row gutter={[20,10]}>
                                      <Col sm={24} md={12}>
                                           <p style={{fontSize:'16px',fontWeight:'bold',margin:'5px 0'}}>
                                              <span>We will start our journery at </span>
                                              <span style={{color:'green'}}>{reportingTime.time} {reportingTime.date}</span>
                                          </p>                                         
                                          <p style={{fontSize:'16px',fontWeight:'bold',margin:'5px 0'}}>
                                              <span>We will take booking till</span>
                                              <span style={{color:'red'}}> {bookingDeadline.time}  {bookingDeadline.date}</span>
                                          </p>
                                      </Col>
                                      <Col sm={24}md={12}>
                                          <p style={{fontSize:'16px',fontWeight:'bold',margin:'5px 0'}}>
                                              <span>Our journey will be </span>
                                              <span style={{ color: 'green' }}> {info?.tour_duration}  Days long</span>
                                          </p>
                                          <p style={{fontSize:'16px',fontWeight:'bold', margin:'5px 0'}}>
                                              <span>We will provide you total </span>
                                              <span style={{ color: 'green' }}> {info?.total_meals}  Meals</span>
                                          </p>
                                      </Col>
                                  </Row>
                              </div>
                        </div>
                  </Col>
                      <Col md={12} sm={24}>
                            <div style={{margin:"15px 0"}}>
                              <Image src={info?.users?.profile_img} width={100} height={100} alt='profile' style={{ borderRadius: "10%", cursor: "pointer" }} />
                              <h2>Planner : <span style={{textTransform:"capitalize"}}>{info?.users?.first_name } {info?.users?.last_name }</span></h2>
                            </div>
                          <Rate disabled defaultValue={5} />
                          <hr />
                          <h2 style={{margin:'5px 0'}}>Description</h2>
                      <p style={{fontSize:'16px'}}>{info?.description }</p>
                  </Col>
              </Row>
              <div className={styles.book_button}>
                      <Button type='primary' size='large'
                          disabled = { isValidDate ? false : true }
                          onClick={() => {
                          dispatch(addToCart(info))
                      router.push('/plan-summary')
                  }} >Book plan</Button>
              </div>
              </Card>
              <FloatButton.BackTop type="primary"  tooltip={<div>Go to top</div>}/>
          </div>
   </PublicLayout>
  )
}

export default PlanDetails