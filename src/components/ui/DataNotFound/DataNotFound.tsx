import not_found_img from '@/assets/data-not-found.png';
import Image from 'next/image';
import { IDataNotFoundProps } from '../types';

const DataNotFound = ({title,searchValue}:IDataNotFoundProps) => {
  return (
      <div>
          <Image style={{margin:'0 auto',display:'block'}} src={not_found_img} height={100} width={100} alt='data_not_found' />
          <span style={{textAlign:'center'}}>
               {
              title ? <p>{ title} <strong>{searchValue}</strong></p> : <p> No data found </p>
          }
         </span>
    </div>
  )
}

export default DataNotFound