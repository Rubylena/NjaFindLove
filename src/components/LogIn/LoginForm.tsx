import React, { useState, useEffect} from 'react'
import { useNavigate } from "react-router-dom";
import { axiosBase } from '../../api/api';
import Input from '../Input/Input'
import Button from '../Button/Button'
import eye from '../../asset/icon/eye.svg'
import './loginForm.scss'
import { FormData } from '../../api/auth';


const LoginForm: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        email: '',
        pass: '',
        lat: '',
        long: '',
    })
    const [geoError, setGeoError] =useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isProfileComplete, setIsProfileComplete] = useState<boolean>();
    const [responseMsg, setResponseMsg] = useState('')
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const navigate = useNavigate();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    }

    const getLocation =()=>{
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(showPosition, showError);
        } else {
            return 'Not supported'
        }

        function showPosition(position:any) {
            setFormData({...formData, lat: `${position.coords.latitude}`, long: `${ position.coords.longitude}`});
        }

        function showError(error:any) {
            switch(error.code) {
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
    getLocation();
    
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>)=>{
        setIsLoading(!isLoading)
        event.preventDefault();
        try {
            const response = await axiosBase.post<FormData>('/Authentication/SignIn', formData);
            setIsProfileComplete(response.data.profileComplete!)
            localStorage.setItem('userDetails', JSON.stringify({userId: response.data.userId!, session: response.data.session, email:formData.email}));
            setResponseMsg(response.data.responseMessage!)
            setIsLoading(isLoading)
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        const profileCheck = () =>{
            if (!isProfileComplete && responseMsg === 'LoginSuccessful'){
                navigate('/create-profile')
            }
            if(isProfileComplete && responseMsg === 'LoginSuccessful'){
                navigate('/dashboard')
            }
        }
        profileCheck();
    }, [isProfileComplete, navigate])
    

  return (
    <form onSubmit={handleSubmit} className='flex flex-col gap-5'>
        <Input
        label='Email'
        type='email'
        placeholder='Example@gmail.com'
        value={formData.email}
        name='email'
        action={handleChange}
        bgColor='bg-input-bg'
        />
        <Input
        label='Password'
        type={showPassword?"text":"password"}
        placeholder='Create a strong password'
        value={formData.pass}
        name='pass'
        action={handleChange}
        img={eye}
        alt='show password'
        bgColor='bg-input-bg'
        clickAction={()=>setShowPassword(!showPassword)}
        />
        <div className='flex flex-col gap-2 md:gap-0 md:flex-row justify-between'>
            <div>
                <input type='checkbox' name='remember' id='remember'
                className='appearance-none indeterminate:bg-gray-300 checked:bg-green checked:text-green mr-1 focus:ring-0'/>
                <label htmlFor='remember' className='appearance-none checked:text-green'>Remember me</label>
            </div>
            <span className='text-blue text-xs text-right'>Forgot your Password?</span>
        </div>
        <div>
            <p className={` ${responseMsg} === "LoginSuccessful" && 'text-good-green' text-red text-xs font-medium`}>{responseMsg}</p>
            <Button 
            text='LOG IN'
            spin={isLoading? 'block animate-spin w-4 h-4' : 'hidden'}
            bg='bg-purple'
            textColor='text-white'
            />
        </div>
    </form>
  )
}

export default LoginForm