import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import { useContext, useState } from 'react';
import { LoginContext } from './context/LoginProvider';

const Login = () => {
  const state = useContext(LoginContext);
  const [user, setUser] = useState({ username: '', password: '' });

  const handleChange = (e) => {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    state.login(user.username, user.password);
  };

  return (
    <div className='h-screen flex justify-center items-center'>
      <div className=' bg-[#1E293B] rounded-lg shadow border border-[#ffffff1a] p-10 w-1/2'>
        <h1 className='text-white pb-8 font-medium text-4xl text-center'>
          Login
        </h1>
        <form
          action='POST'
          onSubmit={handleSubmit}
          className='flex flex-col gap-6'
        >
          <div className='relative'>
            <input
              type='text'
              placeholder='Username'
              name='username'
              className='px-4 py-2 rounded-lg w-full'
              onChange={handleChange}
            />
            <FontAwesomeIcon
              icon={faUser}
              className='absolute right-4 top-3 text-[#1E293B] text-lg'
            />
          </div>
          <div className='relative'>
            <input
              type='password'
              placeholder='Password'
              name='password'
              className='px-4 py-2 rounded-lg w-full'
              onChange={handleChange}
            />
            <FontAwesomeIcon
              icon={faLock}
              className='absolute right-4 top-3 text-[#1E293B] text-lg'
            />
          </div>
          {state.signError && (
            <div className='text-red-500'>Invalid username or password</div>
          )}
          <button className='bg-[#38BDF8] rounded-lg py-2 w-1/4 self-center mt-4 shadow'>
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
