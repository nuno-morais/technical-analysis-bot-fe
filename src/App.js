import React from 'react';
import { Admin, Resource } from 'react-admin';
import authProvider from './auth/authProvider';
import dataProvider from './dataProvider';
import MyLoginPage from './home/myLoginPage';
import { NotificationCreate, NotificationList } from './notifications/notifications';
import { PortfolioCreate, PortfolioList } from './portfolios/portfolios';
import { TradeCreate, TradeList } from './trades/trades';

const App = () => {
  return (
    <Admin loginPage={MyLoginPage} authProvider={authProvider} dataProvider={dataProvider}>
      <Resource name="notifications" list={NotificationList} create={NotificationCreate} />
      <Resource name="portfolios" list={PortfolioList} create={PortfolioCreate} />
      <Resource name="trades" list={TradeList} create={TradeCreate} />
    </Admin>
  )
};
export default App;
