import { ExtendHead } from '../../../../components/ExtendHead';

import { Header } from './Header';
import { Main } from './Main';

export const Reviews = () => {
  return (
    <>
      <ExtendHead
        title='Reviews View - Admin Dashboard'
        description='Reviews View Admin dashboard'
      />
      <Header />
      <Main />
    </>
  );
};
