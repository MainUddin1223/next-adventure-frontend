'use client'

import { useGetMyTourPlansQuery } from "@/redux/api/agencyApi"
import { useDebounced } from "@/redux/hooks";
import { DeleteOutlined, EditOutlined, ReloadOutlined } from "@ant-design/icons";
import { Button, Card, Input } from "antd";
import dayjs from "dayjs";
import { useState } from "react";
import DesktopTable from "../Tables/TableForDesktop/DesktopTable";

const MyBookingHistory = () => {
       const query: Record<string, any> = {}
    const [size, setSize] = useState<number>(10);
    const [page, setPage] = useState<number>(1);
    const [sortBy, setSortBy] = useState<string>('');
    const [sortOrder, setSortOrder] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');
  
    query['limit'] = size
  query['page'] = page

  
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
  
    const {data, isLoading} = useGetMyTourPlansQuery(undefined);
   
  const myPlans = data?.result;
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
     title: 'Plan name',
    dataIndex: 'plan_name',
    key: 'plan_name',
  },
  {
     title: 'Destination',
    dataIndex: 'destination',
    key: 'destination',
  },
  {
    title: 'Start from',
    dataIndex: 'starting_time',
          render: function (data: any) {
          return data && dayjs(data).format("MMM D, YYYY hh:mm A");
        },
        sorter: true,
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
        dataSource = {myPlans}
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

export default MyBookingHistory