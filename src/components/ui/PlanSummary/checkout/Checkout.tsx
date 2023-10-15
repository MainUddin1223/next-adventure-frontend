'use client'
import { Button, Card, Col, Row } from 'antd';
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import styles from './checkout.module.css'
import { formateDateAndTime } from '@/services/timeFormater';
import { addToCart, decreaseQuantity } from '@/redux/slice/orderSlice';
import { useRouter } from 'next/navigation';

type ICheckoutProps = {
    setStep:(arg:number)=>void
}

const Checkout = ({setStep}:ICheckoutProps) => {
  const router = useRouter()
  const { plan, quantity } = useAppSelector(state => state.orderSummary);
  const dispatch = useAppDispatch()
  const startingTime = formateDateAndTime(plan.starting_time);
  return (
        <div>
        <div className={styles.summary_container}>
          <Row gutter={15}>
            <Col sm={24} md={12}>
                <Card>
              {
                quantity ? <>
                   <p>Plan : { plan?.plan_name}</p>
                <span style={{ display: "flex", gap: "10px" }}>Seat Quantity : 
                <Button onClick={()=>dispatch(decreaseQuantity())}>-</Button>
                <input
                  readOnly
                  disabled
                  value={quantity}
                  style={{ width: "45px", textAlign: "center", padding: '5x', fontSize: "20px" }}
                />
                <Button onClick={()=>dispatch(addToCart(plan))}>+</Button></span>
              <p>Price : {quantity} * { plan.price} </p>
              <p>Total : {(quantity*plan.price).toFixed(2)} </p>
              <p>Starting point: { plan?.starting_location}</p>
              <p>Reporting time : { startingTime.time}</p>
              <p>Reporting Date : { startingTime.date}</p>
                </> :
                  <>
                    <h1>No plan in cart</h1>
                    <Button type='primary' onClick={()=>router.push('/')}>Select a plan</Button>
                  </>
                 }
               </Card>
            </Col>
            <Col sm={24} md={12}>
              <Card>
                          <h1>Payment gateway will be implemented soon</h1>
                          <Button
                              type='primary' onClick={() => setStep(1)}>Next</Button>
               </Card>
            </Col>
          </Row>
        </div>

    </div>
  )
}

export default Checkout