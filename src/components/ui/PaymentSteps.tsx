import { Steps } from 'antd';
import { IStepsProps } from './types';


const PaymentSteps = ({step}:IStepsProps) => (
  <Steps
        current={step}
        percent={50}
        labelPlacement="vertical"
        items={[
        {
            title:'Checkout'
        },
        {
            title:'Confirmed'
        },
        {
            title:'Finished'
        },
    ]}
  />
);

export default PaymentSteps;