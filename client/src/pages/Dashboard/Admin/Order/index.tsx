import { ExtendHead } from '../../../../components/ExtendHead';

import { Header } from './Header';
import { Main } from './Main';

export const AdminOrder = () => {
  return (
    <>
      <ExtendHead title='Order - Admin Dashboard' description='Order Admin dashboard' />
      <Header />
      <Main />
    </>
  );
};
