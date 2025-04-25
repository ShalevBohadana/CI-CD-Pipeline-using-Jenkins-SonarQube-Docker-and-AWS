import { UserManagement } from './components/UserManagement';

export const Main = () => {
  return (
    <main className='flex flex-col gap-8 overflow-auto min-h-screen pb-8'>
      <div className='flex-1 grid gap-5'>
        <UserManagement />
      </div>
    </main>
  );
};
