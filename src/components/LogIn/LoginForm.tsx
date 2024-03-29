import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { axiosBase } from '../../api/api';
import Input from '../Input/Input'
import Button from '../Button/Button'
import './loginForm.scss'
import { FormData } from '../../interface/auth';
import eye from '../../asset/icon/eye.svg'
import openEye from '../../asset/icon/openEye.png'
import { encryptStorage } from '../../encrypt/encrypt';

const LoginForm: React.FC = () => {
    const [formLogInData, setFormLogInData] = useState<FormData>({
        email: '',
        pass: '',
        lat: '',
        long: '',
    })
    const [geoError, setGeoError] = useState('');
    const [showPassword, setShowPassword] = useState<boolean>()
    const [isProfileComplete, setIsProfileComplete] = useState<boolean>();
    const [pixUpload, setPixUpload] = useState<boolean>();
    const [responseMsg, setResponseMsg] = useState('')
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const navigate = useNavigate();

    const handleLogInChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormLogInData({ ...formLogInData, [name]: value });
    }

    const getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition, showError);
        } else {
            return 'Not supported'
        }

        function showPosition(position: any) {
            setFormLogInData({ ...formLogInData, lat: `${position.coords.latitude}`, long: `${position.coords.longitude}` });
        }

        function showError(error: any) {
            switch (error.code) {
                case error.PERMISSION_DENIED:
                    setGeoError("User denied the request for Geolocation.")
                    break;
                case error.POSITION_UNAVAILABLE:
                    setGeoError("Location information is unavailable.")
                    break;
                case error.TIMEOUT:
                    setGeoError("The request to get user location timed out.")
                    break;
                case error.UNKNOWN_ERROR:
                    setGeoError("An unknown error occurred.")
                    break;
            }
        }
    }


    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        setIsLoading(true)
        event.preventDefault();
        try {
            const response = await axiosBase.post<FormData>(`${import.meta.env.VITE_LOGIN_URL}`, formLogInData);
            setIsProfileComplete(response.data.profileComplete!)
            setPixUpload(response.data.pixUpload!)
            if (response.data.success) {
                setIsLoading(false)
                encryptStorage.setItem('userDetails', { userId: response.data.userId!, session: response.data.session, email: formLogInData.email })
                encryptStorage.setItem('isLoggedIn', true);
                response.data.profileComplete! && encryptStorage.setItem('completeProfile', true);
            }
            setResponseMsg(response.data.responseMessage!)
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        getLocation();
        const profileCheck = () => {
            if (!isProfileComplete && responseMsg === 'LoginSuccessful') {
                navigate('/create-profile')
            }
            if (isProfileComplete && !pixUpload && responseMsg === 'LoginSuccessful') {
                navigate('/profile-picture')
            }
            if (isProfileComplete && pixUpload && responseMsg === 'LoginSuccessful') {
                navigate('/dashboard')
            }
        }
        profileCheck();
    }, [isProfileComplete, navigate])


    return (
        <form onSubmit={handleSubmit} className='flex flex-col gap-6'>
            <Input
                label='Email'
                type='email'
                placeholder='Example@gmail.com'
                value={formLogInData.email}
                name='email'
                action={handleLogInChange}
                bgColor='bg-input-bg'
            />
            <Input
                label='Password'
                type={showPassword ? 'text' : 'password'}
                placeholder='Create a strong password'
                value={formLogInData.pass}
                name='pass'
                img={showPassword ? eye : openEye}
                imgClass={` ${!showPassword ? 'top-3' : 'top-5'}`}
                alt='show password'
                clickAction={() => setShowPassword(!showPassword)}
                action={handleLogInChange}
                bgColor='bg-input-bg'
            />
            {/* <div className='flex flex-col gap-2 md:gap-0 md:flex-row justify-between'>
                <div>
                    <input type='checkbox' name='remember' id='remember'
                        className='appearance-none indeterminate:bg-gray-300 checked:bg-green checked:text-green mr-1 focus:ring-0' />
                    <label htmlFor='remember' className='appearance-none checked:text-green'>Remember me</label>
                </div>
                <span className='text-blue text-xs text-right'>Forgot your Password?</span>
            </div> */}
            <div>
                <p className={` ${responseMsg} === "LoginSuccessful" && 'text-good-green' text-red text-xs font-medium`}>{responseMsg}</p>
                <Button
                    text='LOG IN'
                    spin={isLoading ? 'block animate-spin w-4 h-4' : 'hidden'}
                    bg='bg-purple'
                    textColor='text-white'
                />
            </div>
        </form>
    )
}

export default LoginForm