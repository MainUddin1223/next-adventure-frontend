'use client'
import { Card, FloatButton } from 'antd';
import BackButton from '../buttons/BackButton';
import { ICardListProps } from '../types';
import styles from './CardListLayout.module.css';

const CardListLayout = ({children,title,description}:ICardListProps) => {
  return (
      <div className={styles.layout_container}>
            <div>
                <BackButton/>
            </div>
          <Card>
                <div>
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
              <div >
             <FloatButton.BackTop type="primary"  tooltip={<div>Go to top</div>}/>
      </div>
    </div>
  )
}

export default CardListLayout