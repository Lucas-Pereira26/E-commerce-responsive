// No componente pai que renderiza ProfileSection
import React from 'react';
import GetUsers from './Users/GetUsers';


const UserProfile = () => {
    const userId = localStorage.getItem('token');

    const handerComponent = () => {
        return <GetUsers userId={userId} />
    }
    return (
        <div>

            {handerComponent()}


        </div>
    );
};

export default UserProfile;
