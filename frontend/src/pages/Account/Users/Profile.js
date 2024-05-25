import React from 'react';
import './Profile.css';
import "react-toastify/dist/ReactToastify.css";

import DialogDemo from './ModalUser/EditProfile';
import { AvatarIcon } from '@radix-ui/react-icons';


const ProfileSection = ({ userData }) => {


    return (
        <div className="bg-white py-12 sm:py-12 ">


            <div className="mx-auto grid max-w-7xl gap-x-8 gap-y-20 px-6 lg:px-8  profile-background">
                {/* <div className="flex items-center justify-center rounded-full"></div> */}

                { userData &&(

                    <div className="mx-auto grid max-w-7xl gap-x-8 gap-y-20 px-6 lg:px-8 xl:grid-cols-2 ">

                        <ul role="list" className="divide-y divide-gray-100">

                            <li className=" gap-x-6 py-5">
                                <div className='flex min-w-0 gap-x-4'>
                                    {userData.url_avatar ? (
                                        <img className="w-full h-[85%]  rounded-full bg-gray-50 image-responsive" src={userData.url_avatar} alt="" />

                                    ) : (<AvatarIcon className=" rounded-full bg-gray-50 image-responsive w-full h-[85%] " />
                                    )}

                                    <div className="min-w-0 flex-auto">
                                        <p className="text-sm font-semibold leading-6 text-gray-900">{userData.name}</p>
                                        <p className="mt-1 truncate text-xs leading-5 text-gray-500">{userData.email}</p>
                                        <p className="text-sm font-semibold leading-6 text-indigo-600">Co-Founder / CEO</p>

                                    </div>
                                </div>
                            </li>

                        </ul>

                        <div className='profile-margin'>
                            <div className="px-4 sm:px-0">
                                <h3 className="text-base font-semibold leading-7 text-gray-900">Applicant Information</h3>
                                <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Personal details and application.</p>
                            </div>
                            <div className="mt-6 border-t border-gray-100">
                                <dl className="divide-y divide-gray-100">
                                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt className="text-sm font-medium leading-6 text-gray-900">Full name</dt>
                                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{userData.name}</dd>
                                    </div>
                                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt className="text-sm font-medium leading-6 text-gray-900">Application for</dt>
                                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">Backend Developer</dd>
                                    </div>
                                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt className="text-sm font-medium leading-6 text-gray-900">Email address</dt>
                                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{userData.email}</dd>
                                    </div>
                                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt className="text-sm font-medium leading-6 text-gray-900">Salary expectation</dt>
                                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">$120,000</dd>
                                    </div>

                                    <div className="mt-10">

                                        <DialogDemo userData={userData} />
                                    </div>
                                </dl>
                            </div>
                        </div>

                    </div>
                )}
            </div>
        </div >



    );
};
export default ProfileSection;
