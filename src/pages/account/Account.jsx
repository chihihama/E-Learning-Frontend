import React from 'react';
import './Account.css';
import { MdDashboard } from "react-icons/md";
import { TbLogout } from "react-icons/tb";
import { UserData } from '../../context/UserContext';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Account = ({ user }) => {
  const { setIsAuth, setUser } = UserData();
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.clear();
    setIsAuth(false);
    setUser([]);
    toast.success("Logged out");
    navigate('/login');
  };

  return (
    <div className="account-section">
      {user && (
        <div className="profile">
          <h2>Account </h2>
          <div className="profile-info">
            <p>
              <strong>Name - {user.name}</strong>
            </p>
            <p>
              <strong>Email - {user.email}</strong>
            </p>
          </div>

          <button onClick={() => navigate(`/${user._id}/dashboard`)} className="common-btn">
            <MdDashboard /> Dashboard
          </button>

          {user.role === "admin" && (
            <button onClick={() => navigate(`/admin/dashboard`)} className="common-btn">
              <MdDashboard /> Admin Dashboard
            </button>
          )}

         <button
  onClick={logoutHandler}
  className="common-btn danger"
  style={{ backgroundColor: '#e63946', color: 'white' }}
>
  <TbLogout /> Logout
</button>


        </div>
      )}
    </div>
  );
};

export default Account;
