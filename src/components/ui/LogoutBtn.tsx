'use client'
import { LogoutOutlined } from '@ant-design/icons'
import { useRouter } from 'next/navigation'

const LogoutBtn = () => {
    const router = useRouter()
  return (
   <p
				onClick={() => {
              localStorage.clear();
              router.push('/')
					}}
					style={{
						cursor: 'pointer',
					}}
				>
					<LogoutOutlined style={{ fontSize: '21px', marginRight: '10px' }} />
					Logout
				</p>
  )
}

export default LogoutBtn