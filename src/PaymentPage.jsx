import React, { useState } from 'react';
import { Card, Row, Col, message } from 'antd';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const banks = [
  { name: 'Abyssinia Bank', logo: '/images/abyssinia.png' },
  { name: 'Awash International Bank', logo: '/images/Awash_International_Bank.png' },
  { name: 'CBE', logo: '/images/CBE_SA.png' },
  { name: 'Debub Global Bank', logo: '/images/debub.png' },
  { name: 'Wegagen Bank', logo: '/images/wegagen.jpg' },
  { name: 'Zemen Bank', logo: '/images/zemen.jpg' },
];

const PaymentPage = () => {
  const { t } = useTranslation();
  const [selectedBank, setSelectedBank] = useState('');

  const handleBankSelect = (bank) => {
    message.loading(t('Processing payment...'), 2); // 2 seconds duration

    // Simulate payment success after a delay
    setTimeout(() => {
      setSelectedBank(bank);
      message.success(t('Payment Successful! 🎉'), 3); // 3 seconds duration
    }, 2000); // 2000 milliseconds (2 seconds) delay
  };

  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1>{t('Select Bank for Payment')}</h1>
      <Row gutter={[16, 16]} justify="center">
        {banks.map((bank) => (
          <Col key={bank.name} xs={24} sm={12} md={8} lg={8} xl={6}>
            {/* Adjusted responsive properties for a better layout */}
            <Card
              hoverable
              style={{ textAlign: 'center', marginBottom: '16px' }}
              cover={<img alt={bank.name} src={bank.logo} style={{ maxHeight: '100px', objectFit: 'contain' }} />}
              onClick={() => handleBankSelect(bank.name)}
            >
              <Card.Meta title={bank.name} />
            </Card>
          </Col>
        ))}
      </Row>
      <div style={{ marginTop: '20px' }}>
        <Link to="/">{t('Go Back')}</Link>
      </div>
    </div>
  );
};

export default PaymentPage;
