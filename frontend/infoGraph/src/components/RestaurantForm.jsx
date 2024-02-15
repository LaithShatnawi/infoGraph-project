import { useContext, useState } from 'react';
import { FormContext } from './context/FormProvider';

const Restaurantform = () => {
  const state = useContext(FormContext);
  const [phoneError, setPhoneError] = useState(false);
  const [basicInfo, setBasicInfo] = useState({
    name: '',
    phone: '',
    openFrom: '07:00AM',
    openTo: '12:00PM',
    street: '',
    nearby: '',
  });

  const validatePhoneNumber = (phone) => {
    let regEx = /^\++[0-9]+$/g;
    if (!phone.match(regEx)) {
      setPhoneError(true);
    } else {
      setPhoneError(false);
    }
  };
  const handleChange = (e) => {
    setBasicInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmission = (e) => {
    e.preventDefault();
    !phoneError && state.handleBasicInfo(basicInfo);
  };
  return (
    <form method='POST' onSubmit={handleSubmission}>
      <h3 className='mb-4 text-xl font-medium leading-none text-white'>
        Basic information
      </h3>
      <div className='grid gap-4 mb-4 sm:grid-cols-2'>
        <div>
          <label className='block mb-2 text-sm font-medium text-white'>
            Name of the restaurant
          </label>
          <input
            type='text'
            name='name'
            id='name'
            className='bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            placeholder='Name of the restaurant'
            required
            onChange={handleChange}
          />
        </div>
        <div>
          <label className='block mb-2 text-sm font-medium text-white'>
            Phone number
          </label>
          <input
            type='text'
            name='phone'
            id='phone'
            className='bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            placeholder='+962987654321'
            required
            onChange={handleChange}
            onBlur={(e) => validatePhoneNumber(e.target.value)}
          />
        </div>
        <div>
          <label className='block mb-2 text-sm font-medium text-white'>
            Opening Hours
            <div className='text-gray-400 text-xs'>From</div>
          </label>
          <select
            name='openFrom'
            id='openFrom'
            className='bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            required
            onChange={handleChange}
          >
            <option value='07:00AM'>07:00AM</option>
            <option value='08:00AM'>08:00AM</option>
            <option value='09:00AM'>09:00AM</option>
            <option value='10:00AM'>10:00AM</option>
            <option value='11:00AM'>11:00AM</option>
          </select>
        </div>
        <div>
          <label className='block mb-2 text-sm font-medium text-white'>
            Opening Hours
            <div className='text-gray-400 text-xs'>To</div>
          </label>
          <select
            name='openTo'
            id='openTo'
            className='bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            required
            onChange={handleChange}
          >
            <option value='12:00PM'>12:00PM</option>
            <option value='01:00PM'>01:00PM</option>
            <option value='02:00PM'>02:00PM</option>
            <option value='03:00PM'>03:00PM</option>
            <option value='04:00PM'>04:00PM</option>
            <option value='05:00PM'>05:00PM</option>
            <option value='06:00PM'>06:00PM</option>
            <option value='07:00PM'>07:00PM</option>
            <option value='08:00PM'>08:00PM</option>
            <option value='09:00PM'>09:00PM</option>
            <option value='10:00PM'>10:00PM</option>
          </select>
        </div>
        <div>
          <label className='block mb-2 text-sm font-medium text-white'>
            Street name
            <div className='text-gray-400 text-xs'>
              please specify the street closest to the location
            </div>
          </label>
          <input
            type='text'
            name='street'
            id='street'
            className='bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            placeholder='Example st.'
            required
            onChange={handleChange}
          />
        </div>
        <div>
          <label className='block mb-2 text-sm font-medium text-white'>
            Nearby landmarks
            <div className='text-gray-400 text-xs'>
              {' '}
              plaese keep them seperated by commas (,)
            </div>
          </label>
          <input
            type='text'
            name='nearby'
            id='nearby'
            className='bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            placeholder='school,market'
            required
            onChange={handleChange}
          />
        </div>
      </div>
      {state.submitError && (
        <div className='text-red-500 mb-4'>
          something went wrong, please re-submit the form.
        </div>
      )}
      {phoneError && (
        <div className='text-red-500 mb-4'>
          Invalid phone number format, please follow the suggested format
        </div>
      )}
      <button
        type='submit'
        className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
      >
        Next Step
      </button>
    </form>
  );
};

export default Restaurantform;
