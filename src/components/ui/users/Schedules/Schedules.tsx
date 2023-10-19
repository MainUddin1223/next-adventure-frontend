'use client'

import { useGetUpcomingSchedulesQuery, useManageBookingsMutation } from "@/redux/api/userApi";
import { formateDateAndTime } from "@/services/timeFormater";
import { Button, Card, Table, message } from "antd";
import dayjs from "dayjs";

const ManageSchedules = () => {
    const [manageBookings]=useManageBookingsMutation()

    const handleBookings = async (id: number) => {
        const result = await manageBookings(id);
        //@ts-ignore
        const data = result?.data;
        if (data.success) {
            if (data.status == 'cenceled') {
                message.warning('Booking have cenceld successfully')
            }
            if (data.status == 'rejected') {
                message.warning('Booking have rejected successfully')
            }
            if (data.status == 'booked') {
               message.success('Congratulations!!! You have confirmed the booking')
            }
            
        }
}
    const { data:bookingData, isLoading } = useGetUpcomingSchedulesQuery(undefined);
    const upcomingSchedulesList = bookingData?.result;
  const columns = [
  {
          title: 'Plan name',
          render: (data:any) => <h3>{ data?.plan?.plan_name}</h3>
  }, {
      title: 'Booking Status',
          render: (data: any) => {
              return (
                  <div>
                      {
                          data?.status == 'pending' ?
                              <strong style={{color:'yellowgreen'}}> {data?.status}</strong> :
                              data?.status == 'booked' ?
                                  <strong style={{color:'var(--button-color)'}}> {data?.status}</strong> :
                                   data?.status == 'cenceled' ?
                                  <strong style={{color:'red'}}> {data?.status}</strong> :
                                  <strong style={{color:'red'}}> {data?.status}</strong>
                      }
                  </div>
              )
          }
  },
  {
      title: 'Reporting time',
      render: (data: any) => {
          const { time, date } = formateDateAndTime(data?.plan?.starting_time);
          return <p>{time} { date}</p>
      }
  },
  {
      title: 'Deadline',
      render: (data: any) => {
                const currentDate = new Date();
            currentDate.setHours(currentDate.getHours() + 6);
            const formattedDate = currentDate.toISOString();
            const isValidDeadline = data.plan?.booking_deadline > formattedDate;
          const { time, date } = formateDateAndTime(data?.plan?.starting_time);
          return isValidDeadline?<p>{time} { date}</p> : <p style={{color:"red"}}>{time} { date}</p>
      }
  },
  {
     title: 'Total Seat',
    dataIndex: 'quantity',
    key: 'quantity',
  },
   {
    title: 'Action',
       render: function (data: any) {
          const currentDate = new Date();
            currentDate.setHours(currentDate.getHours() + 6);
            const formattedDate = currentDate.toISOString();
            const isValidDeadline = data.plan?.booking_deadline > formattedDate;
      return (
        <>
              {
                  data.status == 'booked' ||  data.status == 'pending'?
                      <div style={{ display: "flex", gap: "5px" }}>
                          <Button
                              danger
                              disabled = { isValidDeadline? false : true }
                              onClick={() => handleBookings(data?.id)}>
                                Cencel Booking</Button>
                      </div> :  data.status == 'cenceled' || data.status == 'rejected' ?
                          <div>
                              <Button disabled danger>{ data.status}</Button>
                        </div >:
                            <div style={{ display: "flex", gap: "5px" }}>
                                <Button type="primary" onClick={()=>handleBookings(data?.id)}>
                                Cencel Booking</Button>
                                </div>
                 }
              
        
        </>
      )
   }
  },
  ];
  
  return (
    <>
          <Card>
              <span style={{display:'flex',alignItems:"center",gap:'10px', margin:"10px 0"}}>Plan Title: <h3> { bookingData?.plan_name}</h3></span>
      <Table
        columns={columns}
        dataSource = {upcomingSchedulesList}
        loading={isLoading}
        pagination={false}
      />
</Card>
    </>
  )
}

export default ManageSchedules