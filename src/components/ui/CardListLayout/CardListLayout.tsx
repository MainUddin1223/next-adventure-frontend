'use client'
import { Card, FloatButton } from 'antd';
import BackButton from '../buttons/BackButton';
import styles from './CardListLayout.module.css';

type ICardListProps = {
    children: React.ReactNode;
    title: string;
    description:string
}

const CardListLayout = ({children,title,description}:ICardListProps) => {
  return (
      <div className={styles.layout_container}>
            <div>
                <BackButton/>
            </div>
          <Card>
                <div style={{margin:"15px"}}>
                  <h1 style={{ fontSize: '2rem' }}>{ title}</h1>
                  <h3>{ description }</h3>
                  <hr />
              </div>
              <div>
                  {
                      children
                  }
              </div>
          </Card>
              <div style={{margin:"20px 0"}}>
             <FloatButton.BackTop type="primary"  tooltip={<div>Go to top</div>}/>
      </div>
    </div>
  )
}

export default CardListLayout