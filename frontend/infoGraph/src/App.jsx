import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Login from './components/Login';
import Auth from './components/auth/Auth';
import LoginProvider from './components/context/LoginProvider';
import FormProvider from './components/context/FormProvider';

function App() {
  return (
    <LoginProvider>
      <FormProvider>
        <Routes>
          <Route path='/login' element={<Login />} />
        </Routes>
        <Auth>
          <Routes>
            <Route path='/' element={<Home />} />
          </Routes>
        </Auth>
      </FormProvider>
    </LoginProvider>
  );
}

export default App;
