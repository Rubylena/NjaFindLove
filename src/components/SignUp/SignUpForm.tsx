import React, { useEffect, useState } from 'react'
import { axiosBase } from '../../api/api';
import Input from '../Input/Input'
import Button from '../Button/Button'
import { FormData } from '../../api/auth';
import { useNavigate } from 'react-router-dom';
import eye from '../../asset/icon/eye.svg'
import openEye from '../../asset/icon/openEye.png'

const SignUpForm: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        email: '',
        pass: '',
        lat: '',
        long: '',
    })

    const [geoError, setGeoError] = useState('');
    const [showPassword, setShowPassword] = useState<boolean>()
    // const [isProfileComplete, setIsProfileComplete] = useState<boolean>();
    // const [pixUpload, setPixUpload] = useState<boolean>();
    const [responseMsg, setResponseMsg] = useState('')
    const [isLoading, setIsLoading] = useState<boolean>(false)

    // const navigate = useNavigate();

    const handleSignUpChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    }

    const getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition, showError);
        } else {
            return 'Not supported'
        }

        function showPosition(position: any) {
            setFormData({ ...formData, lat: `${position.coords.latitude}`, long: `${position.coords.longitude}` });
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
        setIsLoading(!isLoading)
        event.preventDefault();
        try {
            const response = await axiosBase.post<FormData>('/Authentication/SignUp', formData);
            // setIsProfileComplete(response.data.profileComplete!)
            // setPixUpload(response.data.pixUpload!)
            setResponseMsg(response.data.responseMessage!)
            setIsLoading(isLoading)
        } catch (err) {
            console.error(err);
        }
    }

    // useEffect(() => {
    //     getLocation();
    //     const profileCheck = () =>{
    //         if (!isProfileComplete && responseMsg === 'Registration Completed Successfully. Kindly Login'){
    //             navigate('/create-profile')
    //         }
    //         if (isProfileComplete && !pixUpload && responseMsg === 'Registration Completed Successfully. Kindly Login'){
    //             navigate('/profile-picture')
    //         }
    //         if(isProfileComplete && responseMsg === 'Registration Completed Successfully. Kindly Login'){
    //             navigate('/dashboard/meet')
    //             localStorage.setItem('isLoggedIn', JSON.stringify(true))
    //         }
    //     }
    //     profileCheck();
    // }, [isProfileComplete, navigate])

    return (
        <form onSubmit={handleSubmit} className='flex flex-col gap-5'>
            <Input
                label='Email'
                type='email'
                placeholder='Example@gmail.com'
                value={formData.email}
                name='email'
                action={handleSignUpChange}
            />
            <Input
                label='Password'
                type={showPassword ? 'text' : 'password'}
                placeholder='Create a strong password'
                value={formData.pass}
                img={showPassword ? eye : openEye}
                imgClass={` ${!showPassword ? 'top-3' : 'top-5'}`}
                alt='show password'
                clickAction={() => setShowPassword(!showPassword)}
                name='pass'
                action={handleSignUpChange}
                warning='Password must contain characters and Numbers'
            />
            <div>
                <p className={` ${responseMsg} === "Registration Completed Successfully. Kindly Login" && 'text-good-green' text-red text-xs`}>{responseMsg}</p>
                <Button
                    text='Create my account'
                    spin={isLoading ? 'block animate-spin w-4 h-4' : 'hidden'}
                    bg='bg-white'
                    textColor='text-purple '
                />
            </div>
        </form>
    )
}

export default SignUpForm