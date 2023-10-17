'use client'

import { useGetUserProfileQuery } from "@/redux/api/userApi"
import { Button, Card } from "antd";
import styles from './profile.module.css'
import dummy_img from '@/assets/146.jpg'
import Image from "next/image";
import LoadingSpinner from "@/components/ui/loader/Loader";
import { useRouter } from "next/navigation";
import { getUserInfo } from "@/services/auth.service";
import Link from "next/link";

const CommonProfile = () => {
  const { data, isLoading } = useGetUserProfileQuery(undefined);
  const authInfo: any = getUserInfo();
  if (isLoading) {
    return <LoadingSpinner/>
  }
  return (
    <div className={styles.profile_container}>
      <Card style={{ width: '100%' }}>
        <div className={styles.profile_image_container}>
          <Image src={dummy_img} style={{borderRadius:"20px"}} width={100} height={100} layout="responsive" alt="dummy"/>
        </div>
        <h3>{data?.first_name} { data?.last_name}</h3>
        <h3>{data?.email}</h3>
        <h3>{data?.contact_no}</h3>
        <h3>{data?.about_user}</h3>
        <Link href={`profile/edit`}>
        <Button type='primary'>Edit Profile</Button>
        </Link>
    </Card>
    </div>
  )
}

export default CommonProfile