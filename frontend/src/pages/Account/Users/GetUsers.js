// GetUsers.js
import React, { useState, useEffect } from 'react';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProfileSection from './Profile';
import Api from '../../../Api';
import CardSkeleton from './CardSkeleton';
//import { ThreeDots } from 'react-loader-spinner';


const GetUsers = ({ userId }) => {
    const [userData, setUserData] = useState(null);


    const [loading, setLoading] = useState(true);

   
    useEffect(() => {

        
        const fetchUserData = async () => {
            try {
                const response = await Api.get(`/get-user?userId=${userId}`);

                if (response.status === 200) {
                    const userInfor = response.data.userGet;
                    setUserData(userInfor);

                    // toast.success('Usuário autenticado');

                } else {
                    toast.error("Falha ao autenticar o usuário");
                }
            } catch (error) {
                console.error('Erro ao consultar a API do Backend:', error.message);
                toast.error('Erro durante a autenticação. Por favor, tente novamente mais tarde.');
            }
        };


        setTimeout(() => {
            setLoading(false);
            //setLoadingRemove(false)

        }, 4000); // 3 segundos

        fetchUserData();

    }, []);

    return (
        <>
           
            {loading ? (
                <div className="bg-white py-12 sm:py-12">
                <div className="mx-auto grid max-w-7xl gap-x-8 gap-y-20 px-6 lg:px-8 profile-background">
                <CardSkeleton />
                </div>
                </div>
            ) : (
                userData ? (
                    <ProfileSection userData={userData} />
                ) : (
                    <div className="bg-white py-12 sm:py-12">
                    <div className="mx-auto grid max-w-7xl gap-x-8 gap-y-20 px-6 lg:px-8 profile-background">
                    <CardSkeleton />
                    </div>
                    </div>
                )
            )}
    

        </>
    );
};

export default GetUsers;
