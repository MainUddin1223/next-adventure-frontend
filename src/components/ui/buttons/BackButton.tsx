'use client'
import { LeftCircleFilled } from '@ant-design/icons';
import { useRouter } from 'next/navigation';

const BackButton = () => {
    const router = useRouter();
    
        return (
            <div style={ {margin:'20px 0'}}>
                <LeftCircleFilled onClick={() => {
                    const prevUrl = window && localStorage.getItem('prevRoute')
                    window && localStorage.removeItem('redirectTo')
                    if (prevUrl) {
                        console.log(prevUrl)
                        router.push(prevUrl)
                    } else {
                        console.log('hello')
                        router.back()
                    }
                }} style={{fontSize:'35px',color:'var(--button-color)',zIndex:'99',cursor:'pointer' }}/>
            </div>
        )
}

export default BackButton