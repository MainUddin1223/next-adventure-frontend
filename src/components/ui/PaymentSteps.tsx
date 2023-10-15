import React from 'react';
import { Steps } from 'antd';

type IStepsProps = {
    step: number;
}

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