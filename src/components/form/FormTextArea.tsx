'use client';

import { useFormContext, Controller } from "react-hook-form"
import {Input} from 'antd'

interface ITextArea{
    name: string;
    value?: string | string[] | undefined;
    rows:number,
    placeholder?: string;
    label?:string
}


const FormTextArea = ({ name, value,rows, placeholder,label }: ITextArea) => {
    const {control} = useFormContext()
  return (
      <div className={`flex flex-col w-full`}>
                    { label ? label : null}
       <Controller
          control={control}
          name={name}
              render={({ field }) => (
                  <Input.TextArea
                      rows={rows}
                  placeholder={placeholder}
                  {...field}
                  value={ value ? value : field.value}
                      />
          )}
      />
    </div>
  )
}

export default FormTextArea