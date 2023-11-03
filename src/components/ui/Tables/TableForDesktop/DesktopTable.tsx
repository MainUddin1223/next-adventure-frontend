'use client'

import { Table } from "antd";
import { ITableProps } from "../../types";


const DesktopTable = ({
  columns,
  dataSource,
  loading = false,
  pageSize,
  totalPages,
  showSizeChanger = true,
  onPaginationChange,
  onTableChange,
  showPagination = true,
  expandable
}:ITableProps) => {
    const paginationConfig = showPagination
    ? {
        pageSize: pageSize,
        total: totalPages,
        pageSizeOptions: [5, 10, 20],
        showSizeChanger: showSizeChanger,
        onChange: onPaginationChange,
      }
    : false;
  const dataSourceWithKey = dataSource?.map((data:any) => {
    const newData = { ...data, key: data.id };
    return newData
})

  return (
    <Table
      loading={loading}
      columns={columns}
         size="middle"
    scroll={{ x: 'calc(600px + 50%)' }}
      dataSource={dataSourceWithKey}
      expandable={{...expandable,defaultExpandedRowKeys: [0]}}
      pagination={paginationConfig}
      onChange={onTableChange}
    />
  )
}

export default DesktopTable