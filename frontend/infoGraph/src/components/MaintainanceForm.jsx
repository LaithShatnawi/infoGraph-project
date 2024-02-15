import { useContext, useState, useEffect } from 'react';
import { FormContext } from './context/FormProvider';
import { DateRangePicker } from 'rsuite';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCircleXmark,
    faCheck,
  } from '@fortawesome/free-solid-svg-icons';
import 'rsuite/dist/rsuite.min.css'; // or 'rsuite/dist/rsuite.min.css'

const MaintainanceForm = () => {
  const state = useContext(FormContext);
  const [showModal, setShowModal] = useState(false); // state to control modal visibility

  const [formData, setFormData] = useState({
    date: '',
    impact: 'Complete shutdown',
    price: '',
    comments: '',
    restaurant_id: state.restId,
  });

  const handleSubmission = (e) => {
    e.preventDefault();
    state.maintananceInfo(formData);
    setShowModal(true); // show modal after form submission
  };

  const closeModal = () => {
    setShowModal(false); // close modal
    window.location.reload(); // refresh the page
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const toggleBodyOverflow = () => {
    if (showModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  };

  // Call toggleBodyOverflow whenever showModal changes
  useEffect(() => {
    toggleBodyOverflow();
  }, [showModal]);

  return (
    <>
      <form method='POST' onSubmit={handleSubmission}>
        <h3 className='mb-4 text-xl font-medium leading-none text-white'>
          Maintainance History
        </h3>
        <div className='flex flex-col justify-center gap-4 items-center'>
          <div className='w-full'>
            <label className='block mb-2 text-sm font-medium text-white'>
              Maintainance Date
            </label>
            <DateRangePicker
              onChange={(value) =>
                setFormData((prevData) => ({ ...prevData, date: value }))
              } // handle DateRangePicker change
            />
          </div>

          <div className=' flex gap-4 w-full'>
            <div className='w-full'>
              <label className='block mb-2 text-sm font-medium text-white'>
                Impact on the Restaurant
              </label>
              <select
                name='impact'
                className='bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                required
                value={formData.impact} // bind value to state
                onChange={handleChange} // handle select change
              >
                <option value='Complete shutdown'>Complete shutdown</option>
                <option value='Partial shutdown'>Partial shutdown</option>
                <option value='Normal operations'>Normal operations</option>
              </select>
            </div>
          </div>
          <div className='w-full'>
            <label className='block mb-2 text-sm font-medium text-white'>
              Quota/Price of the maintenance
            </label>
            <input
              type='number'
              name='price'
              className='bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
              placeholder='30'
              value={formData.price} // bind value to state
              onChange={handleChange} // handle input change
              required
            />
          </div>

          <div className='w-full'>
            <label className='block mb-2 text-sm font-medium text-white'>
              Comments
            </label>
            <textarea
              className='bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
              name='comments'
              cols='30'
              rows='10'
              value={formData.comments} // bind value to state
              onChange={handleChange} // handle textarea change
            ></textarea>
          </div>
        </div>
        <button
          type='submit'
          className='mt-6 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
        >
          Submit
        </button>
      </form>
      {showModal && (
        <div className='fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none'>
          <div className='relative w-auto max-w-md'>
            {/* Modal content */}
            <div className='border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none'>
            <FontAwesomeIcon className='text-2xl absolute right-0 top-0 m-4 cursor-pointer text-[#1E293B]' onClick={closeModal} icon={faCircleXmark} />
              <div className='flex flex-col items-center justify-center p-10  border-solid border-blueGray-200 rounded-t text-[#1E293B]'>
                <h3 className='text-3xl font-semibold text-center'>
                  Form submitted successfully!
                </h3>
                <FontAwesomeIcon className='text-3xl m-4 cursor-pointer text-emerald-500' icon={faCheck} />
              </div>
            </div>
          </div>
        </div>
      )}
      {showModal && (
        <div className='opacity-25 fixed inset-0 z-40 bg-black'></div>
      )}
    </>
  );
};

export default MaintainanceForm;
