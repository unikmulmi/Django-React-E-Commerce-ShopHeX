import React from 'react'
import styles from './UserInfo.module.css'
import pic from '../../assets/pic.jpg'

const UserInfo = ({userInfo}) => {
  return (
        <div className="row mb-4">
    <div className={`col-md-3 py-3 card ${styles.textCenter}`}>
        <img 
        src={pic}
        alt='User Profile'
        className={`img-fluid rounded circle mb-3 mx-auto ${styles.profileImage}`}
        />
        <h4>Unik Mulmi</h4>
        <p className='text-muted'>Unik.Mulmi@example.com</p>
        <button className="btn mt-2" style={{backgroundColor: '#3B3C65' , color:'white'}}></button>
    </div>
    <div className="col-md-9">
        <div className="card">
            <div className="card-header" style={{backgroundColor: '#3B3C65' , color: 'white'}}></div>
            <h5>Account Overview</h5>
        </div>
        <div className="card-body">
            <div className="row">
                <div className="col-md-6">
                   <p>
                 <strong>Full Name:</strong> {`${userInfo.first_name}${userInfo.last_name}`}
                </p>
                <p>
                <strong>Email: </strong>{userInfo.email}
                </p>
                <p>
                <strong>Phone: </strong> {userInfo.phone}
                </p>
                <div className="col-md-6">
                <p>
                <strong>Username:</strong> {userInfo.username}
                </p>
                <p>
                <strong>City: </strong> {userInfo.city}
                </p>
                <p>
                <strong>State: </strong> {userInfo.state}
                </p>
                </div>
                </div>
        </div>
         </div>
    </div>
    </div>
  )
}

export default UserInfo