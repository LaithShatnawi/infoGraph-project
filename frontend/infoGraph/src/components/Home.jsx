// import { DateRangePicker } from 'rsuite';
// import 'rsuite/dist/rsuite.min.css'; // or 'rsuite/dist/rsuite.min.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faRectangleList,
  faScrewdriverWrench,
} from '@fortawesome/free-solid-svg-icons';
import { useContext } from 'react';
import { FormContext } from './context/FormProvider';
import Restaurantform from './RestaurantForm';
import MenuItemsForm from './MenuItemsForm';
import MaintainanceForm from './MaintainanceForm';

const Home = () => {
  const state = useContext(FormContext);

  return (
    <>
      <div className='flex h-screen w-full'>
        <div className='bg-[#1E293B] rounded-lg shadow border border-[#ffffff1a] p-10 w-1/2 m-auto'>
          <h1 className='font-medium text-2xl mb-8 text-white font-bold'>
            Restaurant Information Form
          </h1>

          <ol className='flex justify-center items-center w-full mb-4 sm:mb-5'>
            <li className="flex w-full items-center text-blue-600 dark:text-blue-500 after:content-[''] after:w-full after:h-1 after:border-b after:border-blue-100 after:border-4 after:inline-block dark:after:border-blue-800">
              <div className='flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full lg:h-12 lg:w-12 dark:bg-blue-800 shrink-0'>
                <svg
                  className='w-4 h-4 text-blue-600 lg:w-6 lg:h-6 dark:text-blue-300'
                  aria-hidden='true'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='currentColor'
                  viewBox='0 0 20 16'
                >
                  <path d='M18 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2ZM6.5 3a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3.014 13.021l.157-.625A3.427 3.427 0 0 1 6.5 9.571a3.426 3.426 0 0 1 3.322 2.805l.159.622-6.967.023ZM16 12h-3a1 1 0 0 1 0-2h3a1 1 0 0 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Z' />
                </svg>
              </div>
            </li>
            <li className="flex w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-100 after:border-4 after:inline-block dark:after:border-gray-700">
              <div className='flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full lg:h-12 lg:w-12 dark:bg-gray-700 shrink-0'>
                <FontAwesomeIcon
                  icon={faRectangleList}
                  className='w-4 h-4 text-blue-600 lg:w-6 lg:h-6 dark:text-blue-300'
                />
              </div>
            </li>
            <li className='flex items-center'>
              <div className='flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full lg:h-12 lg:w-12 dark:bg-gray-700 shrink-0'>
                <FontAwesomeIcon
                  icon={faScrewdriverWrench}
                  className='w-4 h-4 text-blue-600 lg:w-6 lg:h-6 dark:text-blue-300'
                />
              </div>
            </li>
          </ol>
          {state.show1stForm && <Restaurantform />}
          {state.show2ndForm && <MenuItemsForm />}
          {state.show3rdForm && <MaintainanceForm />}
        </div>
      </div>
    </>
  );
};

export default Home;
