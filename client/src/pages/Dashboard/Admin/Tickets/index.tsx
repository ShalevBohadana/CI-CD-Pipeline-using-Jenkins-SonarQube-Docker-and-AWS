import { ExtendHead } from '../../../../components/ExtendHead';

import { Header } from './Header';
import { Main } from './Main';

export const Tickets = () => {
  return (
    <>
      <ExtendHead title='Tickets - Admin Dashboard' description='Tickets Admin dashboard' />
      <Header />
      <Main />
    </>
  );
};
