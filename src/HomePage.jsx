import React, { useEffect, useState } from 'react';
import { Input, Button, Modal, Card } from 'antd';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import i18n from 'i18next'; // Import i18n
import axios from 'axios';


const HomePage = () => {
  const { t } = useTranslation();
  const [orderCode, setOrderCode] = useState('');
  const [allOrders, setAllOrders] = useState([]);
  const [orderDetails, setOrderDetails] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    // Fetch initial data from the server using Axios
    axios
      .get('http://192.168.8.101:8000/getData')
      .then((response) => {
        const data = response.data.data;
        const validOrders = Object.values(data);

        // Sort orders based on the time they were sent, latest first
        validOrders.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

        setAllOrders(validOrders);
      })
      .catch((error) => {
        console.error('Error fetching initial data:', error);
      });
  }, []);

  const handleOrderCodeChange = (e) => {
    setOrderCode(e.target.value);
  };

  const handlePayNow = () => {
    // Find the order with the specified ID
    const foundOrder = allOrders.find((order) => order.id === orderCode);

    if (foundOrder) {
      setOrderDetails(foundOrder);
      setModalVisible(true);
    } else {
      // Handle case when the order is not found
      console.error('Order not found');
    }
  };

  const handleModalClose = () => {
    setModalVisible(false);
  };

  const handleLanguageChange = () => {
    // Toggle between English and Amharic
    const newLanguage = i18n.language === 'en' ? 'am' : 'en';
    i18n.changeLanguage(newLanguage);
  };

  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <Card
        style={{
          width: 400,
          textAlign: 'left',
          margin: 'auto',
          padding: '20px',
          background: '#f0f2f5',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        }}
      >
        <div style={{ display: 'flex flex-col', justifyContent: 'space-between', marginBottom: '20px' }}>
          <div style={{ width:'100%', height: '250px', objectFit:'contain', display:'flex', alignItems:'center', justifyContent:'center' }}>
          <img
            src="./images/logo.png" // Replace with your actual logo URL
            alt="Restaurant Logo"
            style={{ width: '100%', marginBottom: '20px'}}
          />

          </div>
         
        </div>
        <Input
          size="large"
          placeholder={t('Enter Order Code')}
          value={orderCode}
          onChange={handleOrderCodeChange}
          style={{ marginBottom: '20px' }}
        />
        <Button type="primary" size="large" onClick={handlePayNow} block>
          {t('Pay Now')}
        </Button>
      </Card>

      <Modal
        title={t('Order Receipt')}
        visible={modalVisible}
        onCancel={handleModalClose}
        footer={null}
        width={400}
      >
        {orderDetails && (
          <Card>
            <img
              src="./images/logo.png" // Replace with your actual logo URL
              alt="Restaurant Logo"
              style={{ width: '100%', marginBottom: '12px' }}
            />
            <p>{t('Order ID')}: {orderDetails.id}</p>
            <p>{t('Dishes')}: {orderDetails.dishes ? orderDetails.dishes.join(', ') : 'N/A'}</p>
            <p>{t('Total Price')}: {orderDetails.totalPrice}</p>
            {/* Add more details as needed */}
            <Link to="/payment">
              <Button type="primary" style={{ marginTop: '12px' }}>
                {t('Proceed with Payment')}
              </Button>
            </Link>
          </Card>
        )}
      </Modal>
    </div>
  );
};

export default HomePage;
