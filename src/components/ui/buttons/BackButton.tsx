'use client'
import { LeftCircleFilled } from '@ant-design/icons';
import { useRouter } from 'next/navigation';

const BackButton = ({url}:{url?:string | undefined| null}) => {
    const router = useRouter();
    
        return (
            <div style={ {margin:'20px 0'}}>
                <LeftCircleFilled onClick={() => {
                    localStorage.removeItem('redirectTo')
                    if (url) {
                        router.push(url)
                    } else {
                        router.back()
                    }
                }} style={{fontSize:'35px',color:'var(--button-color)',zIndex:'99',cursor:'pointer' }}/>
            </div>
        )
}

export default BackButton