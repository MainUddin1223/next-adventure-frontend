'use client'
import { StarFilled } from "@ant-design/icons"
import { Card, Carousel } from "antd"
import Image from "next/image"

const Reviews = ({reviews}:any) => {
  return (
      <div style={{margin:"10px",marginBottom:"30px"}}>
          <h1>Our happy clients</h1>
          <Carousel autoplay>
                  {
                  reviews?.reviews?.length ? reviews?.reviews.map((review: any) => (
                          <div key={review?.id}>
                          <Card  style={{ width: '50%', display: "block", margin: "0 auto" }}>
                            <Image src={review?.user?.profile_img} alt="review-img" width={80} height={80} style={{borderRadius:"50%"}}/>
                              <h3>{review?.user?.first_name} {review?.user?.last_name}</h3>
                              {
                                  Array.from({length:review?.rating}, (_, index) => (
                                      <StarFilled key={index} style={{color:"var(--button-color)"}}/>
                                  ))
                              }
                              <p>{ review?.review_description}</p>
                      
                          </Card>
                          </div>
                      )): <Card>
                      <h1>This is review Carousel</h1>
                    </Card>
                  }
  </Carousel>
    </div>
  )
}

export default Reviews