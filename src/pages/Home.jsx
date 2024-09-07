import React, { useEffect } from 'react';
import Header from '../components/Header';
import toast, { Toaster } from 'react-hot-toast';
import CustomTable from '../components/CustomTable';

function Home() {
  useEffect(() => {
    const message = localStorage.getItem('productAdded');
    if (message) {
      toast.success(message);
      localStorage.removeItem('productAdded');
    }
  }, []);

  return (
    <div className='bg-gray-500 h-[100vh]'>
      <Toaster position="top-center" reverseOrder={false} />
      <Header />
      <div className='m-10 flex items-center space-x-2 flex-col'>
        <CustomTable />
      </div>
    </div>
  );
}

export default Home;
