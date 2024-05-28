// FormModal.js
import React, { useState, forwardRef, useImperativeHandle } from "react";
import { EyeOpenIcon, EyeClosedIcon, AvatarIcon } from '@radix-ui/react-icons';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Api from "../../../../Api";


const UserFormModal = forwardRef(({ userData }, ref) => {
    const [imageBase64, setImageBase64] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [name, setName] = useState(userData.name);
    const [email, setEmail] = useState(userData.email);
    const [password, setPassword] = useState('');
    const userId = userData.sys_id;
  
    const togglePasswordVisibility = () => {
      setShowPassword((prevShowPassword) => !prevShowPassword);
    };
  
    const handleFileInputChange = (e) => {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setImageBase64(reader.result);
      };
    };
  
    const handleUpdate = async () => {
      try {
        console.log('Atualizar usuário: ', { userId, name, email, password, imageBase64 });
        const response = await Api.put("/update-user", { userId, name, email, password, imageBase64 });
        if (response.status === 200) {
          toast.success("User updated successfully");
          console.log('update ', response);
          
        } else {
          toast.error("Failed to update user");
        }
      } catch (error) {
        console.error('Error while updating user:', error.message);
        toast.error('Error while updating user. Please try again later.');
      }
    };
  
    useImperativeHandle(ref, () => ({
      handleUpdate
    }));
  
  return (
    <>
      <fieldset className="mb-[15px] flex items-center gap-5">
        {imageBase64 === '' ? (
          <div className="w-[20%] h-auto flex items-center justify-center rounded-full ">
            {userData.url_avatar ? (
              <img className="w-[100%] h-[100%] rounded-full" src={userData.url_avatar} alt="User Avatar" />
            ) : (
              <AvatarIcon className="text-gray-400 w-[80%] h-[100%] " />
            )}
          </div>
        ) : (
          <div className="w-[20%] h-auto flex items-center justify-center rounded-full ">
            <img className="w-[100%] h-[100%]  rounded-full" src={imageBase64} alt="User Avatar" />
          </div>
        )}
        <label
          className="text-violet11 w-[90px] h-[30px] text-left rounded-[4px]  flex items-center justify-center   text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px] cursor-pointer"
          htmlFor="avatar"
        >
          Avatar
        </label>
        <input
          id="avatar"
          type='file'
          defaultValue={imageBase64}
          placeholder='Avatar'
          className="hidden"
          required
          onChange={handleFileInputChange}
        />
      </fieldset>
      <fieldset className="mb-[15px] flex items-center gap-5">
        <label className="text-violet11 w-[90px] text-right text-[15px]" htmlFor="name">
          Name
        </label>
        <input
          className="text-violet11 shadow-violet7 focus:shadow-violet8 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
          id="name"
          type="text"
          defaultValue={userData.name}
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </fieldset>
      <fieldset className="mb-[15px] flex items-center gap-5">
        <label className="text-violet11 w-[90px] text-right text-[15px]" htmlFor="email">
          Email
        </label>
        <input
          className="text-violet11 shadow-violet7 focus:shadow-violet8 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
          id="email"
          type="email"
          defaultValue={userData.email}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </fieldset>
      <fieldset className="mb-[15px] flex items-center gap-5">
        <label className="text-violet11 w-[90px] text-right text-[15px]" htmlFor="password">
          Password
        </label>
        <div className="relative  ">
          <input
            className="text-violet11 shadow-violet7 focus:shadow-violet8 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
            id="userpassword"
            type={showPassword ? 'text' : 'password'}
            defaultValue={userData.password_user}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="absolute inset-y-0 right-0 px-3 py-2"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? <EyeClosedIcon /> : <EyeOpenIcon />}
          </button>
        </div>
      </fieldset>
    </>
  )
});

export default UserFormModal;
