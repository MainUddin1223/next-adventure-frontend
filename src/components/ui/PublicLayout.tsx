import { Layout } from 'antd';
import { Footer } from 'antd/es/layout/layout';
import React from 'react';
import NavBar from './navBar/NavBar';

const PublicLayout = ({children}:{children:React.ReactNode}) => {
    return (
      <div>
          <Layout>
            <NavBar />
            <div style={{minHeight:"100vh"}}>
                {children}
            </div>
      <Footer style={{backgroundColor:'var(--primary-color)',color:'white',textAlign:'center'}}>Footer</Footer>
    </Layout>
      </div>
  )
}

export default PublicLayout