'use client'


import { useEffect, useState } from 'react';
import { SignedIn, useAuth } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import FinanceForm from '@/components/forms/FinanceForm'
import DealForm from '@/components/forms/DealForm'
const page = () => {
  // State to control the visibility of each component
  const [activeComponent, setActiveComponent] = useState('finance'); 

  const router = useRouter();
  const { isSignedIn } = useAuth();

  useEffect(() => {
    if (!isSignedIn) {
      router.push('/login');
    }
  }, [isSignedIn, router]);

  
  // Handler to set the active component
  const handleClick = (component) => {
    setActiveComponent(component);
  };

  return (
    <SignedIn>
    <div className="flex flex-col justify-center items-center bg-gray-200 py-16 sticky top-0 z-10">
      <h1 className="text-4xl font-bold text-center mb-8 pl-16 md:pl-0 text-gray-700">Add Data</h1>
      {/* Filter Buttons */}
      <div className='pl-16 md:pl-0'>
        <button
          className={`px-6 rounded-full py-2 mr-2 ${activeComponent === 'finance' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
          onClick={() => handleClick('finance')}
        >
          Finance
        </button>
        <button
          className={`px-6 rounded-full py-2 mr-2 ${activeComponent === 'deals' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
          onClick={() => handleClick('deals')}
        >
          Deals
        </button>
        {/* <button
          className={`px-4 py-2 ${activeComponent === 'yearly' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
          onClick={() => handleClick('yearly')}
        >
          Yearly
        </button> */}
      </div>

      {/* Conditionally render components */}
      {activeComponent === 'deals' && <DealForm />}
      {activeComponent === 'finance' && <FinanceForm />}
     
    </div>
    </SignedIn>
  )
}

export default page;
