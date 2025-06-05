import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { clearToken } from '../redux/slices/loginSlices';

const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.login.user);
  const { id, username, email, profile_image } = user || {};

  const handleLogout = () => {
    dispatch(clearToken());
  }
  
  return (
    <div>
      {
        user ? (
     
      <div>
        <p>id: {id}</p>
        <p>username: {username}</p>
        <p>email: {email}</p>
        <img src={profile_image} alt="" />
        <button onClick={handleLogout}>LOGOUT</button>
      </div>
        ) : (
          <Link to="/login">LOGIN</Link>
        )}
    </div>
  )
}

export default Header
