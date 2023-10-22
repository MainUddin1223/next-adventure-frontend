'use client'

import { useGetTourPlansQuery } from "@/redux/api/publicApi";
import { useAppSelector, useDebounced } from "@/redux/hooks";
import { Input, Row } from "antd";
import { useState } from "react";
import SkeletonLoader from "../Skeleton/Skeleton";
import PaginationCompo from "../pagination/Pagination";
import PlanCard from "../planCard/PlanCard";
import styles from './TourPlanContainer.module.css';

const TourPlanContainer = () => {

  const query: Record<string, any> = {}
  const [size, setSize] = useState<number>(10);
  const [page, setPage] = useState<number>(1);
  const { searchTermValue } = useAppSelector(state => state.planState);
  const [searchTerm, setSearchTerm] = useState<string>(searchTermValue);


    query['limit'] = size
    query['page'] = page

    const debouncedTerm = useDebounced({
    searchQuery: searchTerm,
    delay:1500
    })
  
  if (!!debouncedTerm) {
    query['search'] = debouncedTerm
  }


    const { data, isLoading } = useGetTourPlansQuery({ ...query });
    
  if (isLoading) {
    return (<>
     <h1>Pic your tour plan</h1>
    <SkeletonLoader items={8} sm={24} md={6}/>
    </>)
  }
  //@ts-ignore
  const tourPlans: [] = data?.result;
  //@ts-ignore
  const meta = data?.meta
  return (
      <div style={{margin:"15px"}}>
          <h1>Pic your tour plan</h1>
      <div >
          <Input
          type='text'
          size='large'
          placeholder='Search ... '
          className={styles.search_field}
          onChange={(e)=>setSearchTerm(e.target.value)}
        />
        <Row gutter={24}>
          {
                   tourPlans?.length ?
                  tourPlans.map((plan: any,i:number) => (
                          <PlanCard plan={ plan} key={i}/>
             ))
                  : <span>Coming soon</span>
              }

          </Row>
      </div>
      <PaginationCompo totalPage={meta?.totalPage} setSize={ setSize} setPage={setPage} />
    </div>
  )
}

export default TourPlanContainer