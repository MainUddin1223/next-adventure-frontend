'use client'

import { useGetAgenciesQuery } from "@/redux/api/publicApi"
import SkeletonLoader from "../Skeleton/Skeleton";
import AgencyCard from "../agencyCard/AgencyCard";
import { Col, Input, Row } from "antd";
import PaginationCompo from "../pagination/Pagination";
import { useState } from "react";
import { useDebounced } from "@/redux/hooks";
import styles from './agencyContainer.module.css'

const AgenciesContainer = () => {

  const query: Record<string, any> = {}
  const [size, setSize] = useState<number>(10);
  const [page, setPage] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>('');

    query['limit'] = size
    query['page'] = page

    const debouncedTerm = useDebounced({
    searchQuery: searchTerm,
    delay:1500
    })
  
  if (!!debouncedTerm) {
    query['search'] = debouncedTerm
  }


 const { data, isLoading } = useGetAgenciesQuery({...query});
  if (isLoading) {
    return (<>
     <h1>Find your tour planner</h1>
    <SkeletonLoader items={8} sm={24} md={6}/>
    </>)
  }
  //@ts-ignore
  const agencies: [] = data?.result;
  //@ts-ignore
  const meta = data?.meta
  return (
      <div style={{margin:"15px"}}>
          <h1>Find your tour planner</h1>
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
                   agencies?.length ?
                  agencies.map((agency: any) => (
                    <Col xs={24} sm={24} md={12} lg={12} xl={8} key={agency.id}>
                          <AgencyCard agency={ agency} />
              </Col>
             ))
                  : <span>Coming soon</span>
              }

          </Row>
      </div>
      <PaginationCompo totalPage={meta?.totalPage} setSize={ setSize} setPage={setPage} />
    </div>
  )
}

export default AgenciesContainer