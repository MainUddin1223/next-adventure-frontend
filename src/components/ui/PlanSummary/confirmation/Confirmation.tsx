import { Button, Card } from 'antd'
import React from 'react'

type IConfirmationProps = {
    setStep: (arg: number) => void;
    handleConfirmation:()=>void
}

const Confirmation = ({setStep,handleConfirmation}:IConfirmationProps) => {
  return (
      <div style={{display:"block",width:"50%",margin:"0 auto"}}>
        <Card >
              <h1>Confirm your booking</h1>
              <div style={{display:"flex",gap:"10px",justifyContent:"center",marginTop:"15px"}}>
                   <Button  onClick={()=>setStep(0)}>Previous</Button>
                    <Button type='primary' onClick={handleConfirmation}>Confirm</Button>
             </div>
         </Card>
    </div>
  )
}

export default Confirmation