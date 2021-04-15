import React from 'react';
import { Admin, Resource } from 'react-admin';
import authProvider from './auth/authProvider';
import dataProvider from './dataProvider';
import MyLoginPage from './home/myLoginPage';
import { NotificationCreate, NotificationList } from './notifications/notifications';
import { PortfolioCreate, PortfolioList } from './portfolios/portfolios';
import { TradesSummaryList } from './trades-summary/trades-summary';
import { TradeCreate, TradeEdit, TradeList, TradeShow } from './trades/trades';

const App = () => {
  return (
    <Admin loginPage={MyLoginPage} authProvider={authProvider} dataProvider={dataProvider}>
      <Resource name="notifications" list={NotificationList} create={NotificationCreate} />
      <Resource name="portfolios" list={PortfolioList} create={PortfolioCreate} />
      <Resource name="trades" list={TradeList} create={TradeCreate} edit={TradeEdit} show={TradeShow}/>
      <Resource name="trades-summary" list={TradesSummaryList}/>
    </Admin>
  )
};
export default App;
