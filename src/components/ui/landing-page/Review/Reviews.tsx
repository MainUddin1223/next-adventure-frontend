'use client'
import { StarFilled } from "@ant-design/icons"
import { Card, Carousel } from "antd"
import Image from "next/image"

const Reviews = ({ reviews }: any) => {
  console.log(reviews.reviews)
  return (
      <div style={{margin:"10px",marginBottom:"30px"}}>
          <h1>Our happy clients</h1>
          <Carousel autoplay>
                  {
          reviews?.reviews.map((review: any, i: number) => {
            return(
                          <div key={i}>
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
                      )})
                  }
  </Carousel>
    </div>
  )
}

export default Reviews