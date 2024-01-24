import React, { useState, useEffect } from 'react';
import { Layout, Menu, Button } from 'antd';
import { PayCircleOutlined, HomeOutlined, GlobalOutlined } from '@ant-design/icons';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import HomePage from './HomePage';
import PaymentPage from './PaymentPage';

const { Header, Content, Sider } = Layout;

const App = () => {
  const { t, i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language);

  const toggleLanguage = () => {
    const newLanguage = currentLanguage === 'en' ? 'am' : 'en';
    i18n.changeLanguage(newLanguage);
  };

  // useEffect to update the state when the language changes
  useEffect(() => {
    setCurrentLanguage(i18n.language);
  }, [i18n.language]);

  return (
    <Router>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider theme="dark" width={60} style={{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0, zIndex: 1 }}>
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="vertical" style={{ textAlign: 'center', borderRight: 0 }}>
            <Menu.Item key="1" icon={<PayCircleOutlined />} style={{ fontSize: '24px', height: '60px', lineHeight: '60px', marginTop: '50px', whiteSpace: 'nowrap' }}>
              <Link to="/payment">{/* Wrap Link around the content */}</Link>
            </Menu.Item>
            <Menu.SubMenu key="sub1" icon={<HomeOutlined />} style={{ display: 'none' }}>
              <Menu.Item key="2">
                <Link to="/" />
              </Menu.Item>
            </Menu.SubMenu>
          </Menu>
        </Sider>
        <Layout style={{ marginLeft: 60, transition: 'margin 0.2s' }}>
          <Header style={{ background: '#001529', padding: 0, textAlign: 'center', color: 'white', height: '60px', lineHeight: '60px', paddingLeft: '16px' }}>
            <Button type="link" onClick={toggleLanguage} style={{ color: '#fff', marginRight: '16px' }}>
              {currentLanguage === 'en' ? 'አማርኛ' : 'English'}
            </Button>
            <Button type="link" style={{ color: '#fff' }} icon={<GlobalOutlined />} />
          </Header>
          <Content style={{ margin: '16px', minHeight: '100vh' }}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/payment" element={<PaymentPage />} />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </Router>
  );
};

export default App;
