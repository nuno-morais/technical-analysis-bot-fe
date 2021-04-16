import { AccountBalance, AccountBalanceWallet, Autorenew, Notifications } from '@material-ui/icons';
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
      <Resource name="notifications" list={NotificationList} icon={Notifications} create={NotificationCreate} />
      <Resource name="portfolios" list={PortfolioList} icon={AccountBalanceWallet} create={PortfolioCreate} options={{label: 'Watchlist'}} />
      <Resource name="trades" list={TradeList} icon={Autorenew} create={TradeCreate} edit={TradeEdit} show={TradeShow}/>
      <Resource name="trades-summary" list={TradesSummaryList} icon={AccountBalance} options={{label: 'Summary'}}/>
    </Admin>
  )
};
export default App;
