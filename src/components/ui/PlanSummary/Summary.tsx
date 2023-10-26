'use client'
import { useBookPlanMutation } from '@/redux/api/userApi';
import { useAppSelector } from '@/redux/hooks';
import { LeftCircleFilled } from '@ant-design/icons';
import { Card } from 'antd';
import { useState } from 'react';
import PaymentSteps from '../PaymentSteps';
import BackButton from '../buttons/BackButton';
import Checkout from './checkout/Checkout';
import Confirmation from './confirmation/Confirmation';
import styles from './summary.module.css';
import Thankyou from './thankyou/Thankyou';

const Summary = () => {
  
  const [step, setStep] = useState(0);
  const [bookPlan] = useBookPlanMutation()
  const { plan, quantity } = useAppSelector(state => state.orderSummary);
  
  const handleConfirmation = async () => {
    const payload = {planId: plan.id,quantity: quantity}
    const result = await bookPlan(payload).unwrap();
    if (result) {
     setStep(2)
    }
  }
 
  return (
    <div className={styles.summary_container}>
      {
        step == 0 ? <BackButton /> :
          <>
                <div style={ {margin:'20px 0'}}>
              <LeftCircleFilled onClick={() => {
                setStep(step-1)
                }} style={{fontSize:'35px',color:'var(--button-color)',zIndex:'99',cursor:'pointer' }}/>
            </div>
          </>
      }
          <div className={styles.stepper}>
            <PaymentSteps step={step}/>
          </div>
      <div>
        <Card>
          {
            step == 0 ? <Checkout setStep={setStep}/> :
              step == 1 ? <Confirmation setStep={setStep} handleConfirmation={ handleConfirmation } /> :
                <Thankyou/>
          }
        </Card>
      </div>
    </div>
  )
}

export default Summary