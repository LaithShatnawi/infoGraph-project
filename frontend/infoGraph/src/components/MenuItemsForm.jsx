import { useContext, useState } from 'react';
import { FormContext } from './context/FormProvider';

const MenuItemsForm = () => {
  const state = useContext(FormContext);
  const [addedItem, setAddedItem] = useState([]);

  const handleChange = (e) => {
    const { id, checked } = e.target;

    // Check if input is checked
    if (checked) {
      // Add the input's id to the array of objects
      setAddedItem((prevState) => [...prevState, { id, checked }]);
    } else {
      // Remove the input's id from the array of objects
      setAddedItem((prevState) => prevState.filter((input) => input.id !== id));
    }
  };

  const handleTimeChange = (e) => {
    const { id, value } = e.target;
    setAddedItem((prevState) => {
      const updatedItems = [...prevState];
      const index = updatedItems.findIndex(item => item.id === id);
      if (index !== -1) {
        updatedItems[index] = { ...updatedItems[index], value }; // Update the item with the new value
      }
      return updatedItems;
    });
  }

  const handleSubmission = (e) => {
    e.preventDefault();
    // Filter the checked items
    // Map the selected items to include their select option values
    const selectedItemsWithServeTimes = addedItem.map((item) => ({
      restaurantId: state.restId,
      menuItemId: parseInt(item.id),
      serving_time: item.value || '07:00AM - 09:00AM', // Access the corresponding select option value
    }));
    // Send `selectedItemsWithServeTimes` to the backend
    state.addMenuItems(selectedItemsWithServeTimes)
  };
  return (
    <form method='POST' onSubmit={handleSubmission}>
      <h3 className='mb-4 text-xl font-medium leading-none text-white'>Menu</h3>
      <div className=''>
        <div className='grid gap-4 mb-4 sm:grid-cols-2'>
          <label className='block mb-2 text-sm font-medium text-white'>
            Item Selection
          </label>
          <label className='block mb-2 text-sm font-medium text-white'>
            Serving Times
          </label>
        </div>
        <div className=''>
          <div>
            <div className='flex flex-col justify-center gap-4 items-center'>
              {state.menuItems.map((item, idx) => {
                return (
                  <div key={idx} className='flex justify-center gap-4 w-full'>
                    <div className='flex gap-4 w-1/2'>
                      <input
                        type='checkbox'
                        name='item'
                        value={item.name}
                        id={item.id}
                        className='bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                        placeholder='Name of the restaurant'
                        onChange={handleChange}
                      />
                      <span className='text-white'>{item.name}</span>
                    </div>
                    <div className=' flex gap-4 w-1/2'>
                      <div className='w-full'>
                        <select
                          name='serveTime'
                          id={item.id}
                          className='bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                          required
                          onChange={handleTimeChange}
                        >
                          <option value='07:00AM - 09:00AM'>
                            07:00AM - 09:00AM
                          </option>
                          <option value='09:00AM - 11:00AM'>
                            09:00AM - 11:00AM
                          </option>
                          <option value='11:00AM - 01:00PM'>
                            11:00AM - 01:00PM
                          </option>
                          <option value='01:00PM - 03:00PM'>
                            01:00PM - 03:00PM
                          </option>
                          <option value='03:00PM - 05:00PM'>
                            03:00PM - 05:00PM
                          </option>
                          <option value='05:00PM - 07:00PM'>
                            05:00PM - 07:00PM
                          </option>
                          <option value='07:00PM - 09:00PM'>
                            07:00PM - 09:00PM
                          </option>
                          <option value='09:00PM - 11:00PM'>
                            09:00PM - 11:00PM
                          </option>
                          <option value='11:00AM - 12:00AM'>
                            11:00AM - 12:00AM
                          </option>
                        </select>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <i className="fa-duotone fa-circle-xmark"></i>
      <button
        type='submit'
        className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
      >
        Next Step
      </button>
    </form>
  );
};

export default MenuItemsForm;
