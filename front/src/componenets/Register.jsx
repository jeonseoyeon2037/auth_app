import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { fetchRegister } from '../redux/slices/authSlices';

const Register = () => {
  const dispatch = useDispatch();
  const navigator = useNavigate();

  const [values, setValues] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const [file, setFile] = useState(null);
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      values.username === '' ||
      values.email === '' ||
      values.password === ''
    ) {
      alert('모든 입력창이 작성되어야 합니다.');
    }

    const formData = new FormData();
    formData.append('username', values.username);
    formData.append('email', values.email);
    formData.append('password', values.password);
    if (file) {
      formData.append('profile_image', file);
    }

    // console.log(formData);
    try {
      const response = await dispatch(fetchRegister(formData)).unwrap();
      // console.log(response);
      if(response.status === 201) {
        alert(response.data.msg);
        navigator('/login');
        return;
      }

      if (response.data.success === false) {
        alert(response.data.msg);
        return;
      }
    } catch (error) {
      alert(error.msg);
    }
  };

  return (
    <div className="register-wrapper flex justify-center items-center h-screen">
      <div className="contents-wrapper shadow-lg px-8 py-5 border w-[50%]">
        <h2 className="title text-lg font-bold mb-4">Register</h2>
        <form className="register-form" onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              placeholder="Enter Username..."
              name="username"
              onChange={handleChange}
            />
          </div>
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
          <div className="input-wrapper">
            <label htmlFor="profile_image">Profile Image</label>
            <input
              type="file"
              name="profile_image"
              onChange={handleFileChange}
            />
          </div>
          <button className="w-full bg-green-600 text-white py-2">
            Submit
          </button>
        </form>
        <div className="mt-4 text-center">
          <span>Already have an account?</span>
          <Link to="/login" className="text-blue-500">
            {' '}
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
