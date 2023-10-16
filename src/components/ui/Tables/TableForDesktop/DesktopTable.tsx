'use client'

import { Table } from "antd"

type ITableProps = {
  loading?: boolean;
  columns: any;
  dataSource: any
  pageSize?: number
  totalPages?: number
  showSizeChanger?: boolean
  showPagination?: boolean
  onPaginationChange:(page:number, pageSize:number) => void
  onTableChange : ( pagination:any, filter:any, sorter:any ) => void

}


const DesktopTable = ({
  columns,
  dataSource,
  loading = false,
  pageSize,
  totalPages,
  showSizeChanger = true,
  onPaginationChange,
  onTableChange,
  showPagination = true
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
  
  return (
    <Table
      loading={loading}
      columns={columns}
      dataSource={dataSource}
      pagination={paginationConfig}
      onChange={onTableChange}
    />
  )
}

export default DesktopTable