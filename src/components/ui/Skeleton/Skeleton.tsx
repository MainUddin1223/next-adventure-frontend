import { Col, Row, Skeleton } from "antd"

const SkeletonLoader =
    ({ items, sm = 24, md = 12 }: { items: number, sm?: number, md?: number }) => {
  return (
      <div>
          <Row gutter={[15, 15]} justify={"center"}>
              {
                  Array.from({ length: items }, (_, index) => (
                      <Col sm={sm} md={md} key={index}>
                        <div>
                        <div>
                         <Skeleton.Image active style={{margin:"10px"}}/>
                            <Skeleton.Image active />
                            </div>
                            <Skeleton active />
                        </div>
                        </Col>
                     ))
              }
          </Row>
        </div>
  )
}

export default SkeletonLoader