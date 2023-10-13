import { Layout } from 'antd'
import Sider from 'antd/es/layout/Sider';
import { Content, Footer, Header } from 'antd/es/layout/layout'
import React from 'react'
import { Col, Row } from 'antd';
import NavBar from './navBar/NavBar';



const footerStyle: React.CSSProperties = {
  textAlign: 'center',
  color: '#fff',
  backgroundColor: '#7dbcea',
};

const PublicLayout = ({children}:{children:React.ReactNode}) => {
    return (
          <Layout>
            <NavBar />
            <div style={{minHeight:"100vh"}}>
                {children}
            </div>
      <Footer style={footerStyle}>Footer</Footer>
    </Layout>
  )
}

export default PublicLayout