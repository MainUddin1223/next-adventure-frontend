'use client'

import { DeleteOutlined,EditOutlined,EyeOutlined,ReloadOutlined } from '@ant-design/icons';
import { Button, Input, message } from "antd"
import Link from "next/link"
import { useState } from "react"
import dayjs from "dayjs"
import { useDebounced } from "@/redux/hooks";
import DesktopTable from '@/components/ui/Tables/TableForDesktop/DesktopTable';
import { useGetAllAgenciesQuery, useGetAllPlansQuery, useGetBookingHistoryQuery } from '@/redux/api/adminApi';



const BookingHistory = () => {
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
  
  const { data, isLoading } = useGetBookingHistoryQuery({ ...query });
  
  const bookings = data?.result;
  const meta = data?.meta;
  console.log(bookings)
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
      title: 'Plan Name',
    render: function (data:any) {
      return (
        <>
          <div style={{ display: "flex", gap: "5px" }}>
            <h3>{data?.plan?.plan_name}</h3>
          </div>
        
        </>
      )
   }
  },
    {
      title: 'Planner',
    render: function (data:any) {
      return (
        <>
          <div style={{ display: "flex", gap: "5px" }}>
            <h3>{data?.user.first_name}</h3>
            <h3>{data?.user.last_name}</h3>
          </div>
        
        </>
      )
   }
  },
  {
    title: 'Total Amount ',
        render: function (data:any) {
      return (
        <>
            <h3 style={{textAlign:"center"}}>$ {data?.total_amount}</h3>
        </>
      )
   }
  },
  {
    title: 'Quantity',
        render: function (data:any) {
      return (
        <>
            <h3 style={{textAlign:"center"}}>{data?.quantity}</h3>
        </>
      )
   }
  },
    {
      title: 'Status',
      dataIndex: 'status',
      key:'status'
    },
      {
        title: 'Deadline',
        render: function (data: any) {
          const today = new Date();
          const bookingDeadline = new Date(data?.plan.booking_deadline);
          console.log(data?.plan.booking_deadline ,new Date())
        if (bookingDeadline >= today) {
          const deadline = dayjs(data?.plan.booking_deadline).format("MMM D, YYYY hh:mm A")
          return (
            <h3>{deadline}</h3>
          )
        }
        else {
          return (
            <>
            <h3>Expired</h3>
            </>
          )
        }
      },
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
        dataSource = {bookings}
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

export default BookingHistory