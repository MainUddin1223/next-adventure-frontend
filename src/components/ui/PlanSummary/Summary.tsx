'use client'
import { Button} from 'antd';
import PaymentSteps from '../PaymentSteps'
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Checkout from './checkout/Checkout';
import { useBookPlanMutation } from '@/redux/api/userApi';
import { useAppSelector } from '@/redux/hooks';
import Confirmation from './confirmation/Confirmation';
import Thankyou from './thankyou/Thankyou';

const Summary = () => {
  const [step, setStep] = useState(0);
  const [bookPlan] = useBookPlanMutation()
   const { plan, quantity } = useAppSelector(state => state.orderSummary);
  const router = useRouter()
  const handleConfirmation = async () => {
    const payload = {
      planId: plan.id,
      quantity: quantity,
    }
    const result = await bookPlan(payload).unwrap();
    if (result) {
     setStep(2)
    }
  }
 
  return (
        <div>
        <div style={{width:'50%',margin:"20px auto"}}>
          <PaymentSteps step={step}/>
      </div>
      <div>
        {
          step == 0 ? <Checkout setStep={setStep}/> :
            step == 1 ? <Confirmation setStep={setStep} handleConfirmation={ handleConfirmation } /> :
              <Thankyou/>
        }
      </div>
    </div>
  )
}

export default Summary