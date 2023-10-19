'use client'

import { DeleteOutlined,EditOutlined,EyeOutlined,ReloadOutlined } from '@ant-design/icons';
import { Button, Input, message } from "antd"
import Link from "next/link"
import { useState } from "react"
import dayjs from "dayjs"
import { useDebounced } from "@/redux/hooks";
import DesktopTable from '@/components/ui/Tables/TableForDesktop/DesktopTable';
import { useGetAllAgenciesQuery, useGetAllPlansQuery } from '@/redux/api/adminApi';



const TourManagement = () => {
    const query: Record<string, any> = {}
    const [size, setSize] = useState<number>(10);
    const [page, setPage] = useState<number>(1);
    const [sortBy, setSortBy] = useState<string>('');
    const [sortOrder, setSortOrder] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');
  
    query['limit'] = size
  query['page'] = page
  
    // query['sortBy'] = sortBy
    // query['sortOrder'] = sortOrder
  
    const onPaginationChange = (page: number, pageSize: number) => {
      setSize(pageSize)
      setPage(page)
  }

  
  const debouncedTerm = useDebounced({
    searchQuery: searchTerm,
    delay:600
  })
  if (!!debouncedTerm) {
    query['search'] = searchTerm
  }
  
  const { data, isLoading } = useGetAllPlansQuery({ ...query });
  const plans = data?.result;
  const meta = data?.meta;
  const onTableChange = ( pagination:any, filter:any, sorter:any ) => {
    const { field, order } = sorter;
    setSortBy(field as string);
    setSortOrder(order === "asc" ? "asc" : "desc");
  }
  
  const resetFilters = () => {
    setSortBy("");
    setSortOrder("");
    setSearchTerm("");
  };
  
  const columns = [
  {
      title: 'Name',
      dataIndex: 'plan_name',
     key:'plan_name'
    },
    {
    title: 'Planner',
    render: function (data:any) {
      return (
        <>
          <div style={{ display: "flex", gap: "5px" }}>
            <h3>{data?.users?.first_name}</h3>
            <h3>{data?.users?.last_name}</h3>
          </div>
        
        </>
      )
   }
  },
  {
      title: 'Price',
     dataIndex: 'price',
  },
    {
      title: 'Status',
      dataIndex: 'starting_time',
      render: function (data: any) {
        if (data > new Date()) {
          return <h4>Available</h4>
        }
        else {
          return  <h4>Expired</h4>
        }
      },
    },
  {
    title: 'Deadline',
    dataIndex: 'booking_deadline',
          render: function (data: any) {
          return data && dayjs(data).format("MMM D, YYYY hh:mm A");
        },
        sorter: true,
  },
  {
    title: 'Action',
    render: function (data:any) {
      return (
        <>
             <div style={{ display: "flex", gap: "5px" }}>
         <Button type="primary">
        <EditOutlined /></Button>
            <Button type="primary">
        <DeleteOutlined /></Button>
          </div>
        
        </>
      )
   }
  },
  ];
  
  return (
    <>
        <Input
          type='text'
          size='large'
          placeholder='Search ... '
        style={{ width: "20%" }}
           value={searchTerm}
          onChange={(e)=>setSearchTerm(e.target.value)}
        />
           <div>
          {(!!sortBy || !!sortOrder || !!searchTerm) && (
            <Button
              onClick={resetFilters}
              type="primary"
              style={{ margin: "0px 5px" }}
            >
              <ReloadOutlined />
            </Button>
          )}
        </div>
      <DesktopTable
        columns={columns}
        dataSource = {plans}
        loading={isLoading}
        pageSize= {size}
        totalPages = {meta?.total}
        showSizeChanger = {true}
        onPaginationChange={onPaginationChange}
        onTableChange={onTableChange}
        showPagination = {true}
      />
    </>
  )
}

export default TourManagement