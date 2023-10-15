import { Pagination } from 'antd'
import type { PaginationProps } from 'antd';
import React from 'react';


type IPaginationProps = {
    setSize: (value: number) => void;
    setPage: (value: number) => void;
    totalPage:number
}

const PaginationCompo = ({totalPage,setSize,setPage}:IPaginationProps) => {
    const onShowSizeChange: PaginationProps['onShowSizeChange'] = (current, pageSize) => {
        setSize(pageSize);
      setPage(current)
    };
    
  return (
      <div style={{margin:"20px 10px",display:"flex",justifyContent:"end"}}>
            <Pagination
              showSizeChanger
              onShowSizeChange={onShowSizeChange}
              defaultCurrent={1}
              total={totalPage}
              onChange={(value) => setPage(value)}
    />
   </div>
  )
}

export default PaginationCompo
