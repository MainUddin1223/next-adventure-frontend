import React from 'react';
import { Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}

const ExpandableTable = ({ data }: any) => {
        const columns: ColumnsType<DataType> = [
        {
            title: 'Plan Id',
            dataIndex: 'plan_id',
            key: 'plan_id',
        },
        {
            title: 'Plan Name',
            key: 'age',
            render: (text) => <p>{text?.plan?.plan_name}</p>,
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            key: 'quantity',
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            key: 'amount',
        },
        {
            title: 'Action',
            key: 'action',
            render: (data) => (
                <Space size="middle">
                    <a>Invite {data.id}</a>
                    <a>Delete</a>
                </Space>
            ),
        },
    ];
  return (
      <div>
          <Table columns={columns} dataSource={data} pagination={false}/>
    </div>
  )
}

export default ExpandableTable