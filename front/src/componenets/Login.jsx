import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { fetchLogin } from '../redux/slices/authSlices';
import { setToken } from '../redux/slices/loginSlices';


const Login = () => {
  const dispatch = useDispatch();
  const navigator = useNavigate();

  const [values, setValues] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (values.email === '' || values.password === '') {
      alert('모든 입력창은 작성되어야 합니다.');
    }

    try {
      const response = await dispatch(fetchLogin(values)).unwrap();
      
      if (response.status === 201) {
        alert('로그인 되었습니다.');
        localStorage.setItem('token', response.data.token);
        dispatch(setToken(response.data.token));
        navigator('/');
        return;
      }

      if (response.data.success === false) {
        alert(response.data.msg);
        return;
      }
    } catch (error) {
      console.log(error.msg);
    }
  };

  return (
    <div className="register-wrapper flex justify-center items-center h-screen">
      <div className="contents-wrapper shadow-lg px-8 py-5 border w-[50%]">
        <h2 className="title text-lg font-bold mb-4">Login</h2>
        <form className="register-form" onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              placeholder="Enter Email..."
              name="email"
              onChange={handleChange}
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="Enter Password..."
              name="password"
              onChange={handleChange}
            />
          </div>
          <button className="w-full bg-green-600 text-white py-2">
            Submit
          </button>
        </form>
        <div className="mt-4 text-center">
          <span>Don't have an account?</span>
          <Link to="/register" className="text-blue-500">
            {' '}
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
