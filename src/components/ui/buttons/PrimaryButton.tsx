import { Button } from 'antd';
import React from 'react';

type IButtonProps = {
    handler: () => void;
    value: string;
    disabled?:boolean
}

const PrimaryButton = ({handler,value,disabled}:IButtonProps) => {
  return (
      <Button type='primary' onClick={handler}>{ value}</Button>
  )
}

export default PrimaryButton