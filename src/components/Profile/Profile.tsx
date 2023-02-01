import React, { useEffect, useState } from 'react'
import { axiosBase } from '../../api/api';
import { CreateProfileData, IdValue, Local } from '../../api/auth'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dropDown from '../../asset/icon/drop-down-arrow.png'
import Input from '../Input/Input'
import Button from '../Button/Button';

const Profile = () => {
    const [userDetails, setUserDetails] = useState<Local>();

    const [genders, setGenders] = useState<IdValue[]>([])

    const [interestedInWho, setInterestedInWho] = useState<IdValue[]>([])

    const [interest, setInterest] = useState<IdValue[]>([])
    const [returnSelectInterest, setReturnSelectInterest] = useState<number[]>([]);

    const [day, setDay] = useState<null | Date>(null);
    const [month, setMonth] = useState<Date>();
    const [year, setYear] = useState<null | Date>(null);
    const [dateOfBirth, setDateOfBirth] = useState<string>('');

    const [isLoading, setIsLoading] = useState<boolean>(false)

    const [formData, setFormData] = useState<CreateProfileData>({
        firstName: '',
        lastName: '',
        userId: 0,
        session: '',
        email: '',
        dob: '',
        gender: 0,
        interestedIn: 0,
        fromAge: 0,
        toAge: 0,
        info: '',
        interest: [0],
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    }

    const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>)=>{
        const { value } = e.target;
        setFormData({ ...formData, info: value });
    }

    const ageChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const { name } = event.target;
        setFormData({ ...formData, [name]: parseInt(event.target.value) });
    }

    const handleGenderChange = (event: React.ChangeEvent<HTMLInputElement>)=> {
        setFormData({...formData, gender: parseInt(event.target.value) })
    }

    const handleInterestedChange = (event: React.ChangeEvent<HTMLInputElement>)=> {
        setFormData({ ...formData, interestedIn: parseInt(event.target.value)})
    }

    const concatenateDate = () =>{
        if(day! && month! && year!){
            const days = day.toString()
            const months = month.getMonth()
            const years = year.toString()
            setDateOfBirth(`${days.split(' ')[2]}/${months + 1}/${years.split(' ')[3]}`)
        }
    }

    const invokeGender = async ()=>{
        try {
            const response = await axiosBase.get('/Profile/GetGenderList');
            setGenders(response.data)
        } catch (err) {
            console.error(err);
        }
    }

    const invokeInterestIn = async ()=>{
        try {
            const response = await axiosBase.get('/Profile/GetInterestedIn');
            setInterestedInWho(response.data)
        } catch (err) {
            console.error(err);
        }
    }

    const invokeInterest = async ()=>{
        try {
            const response = await axiosBase.get('/Profile/GetInterestList');
            setInterest(response.data)
        } catch (err) {
            console.error(err);
        }
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>)=>{
        setIsLoading(!isLoading)
        event.preventDefault();
        // concatenateDate();
        try {
            setFormData({ ...formData, 
                userId: userDetails!.userId, session: userDetails!.session,
                email: userDetails!.email!, interest: returnSelectInterest,
                dob: dateOfBirth, 
                // gender: selectedGenders, interestedIn: selectedInterestedIn
            });
            console.log('formData', formData)
            const response = await axiosBase.post<FormData>('/Profile/CreateProfile', formData);
            console.log('response', response.data)
            setIsLoading(isLoading)
        } catch (err) {
            console.error(err);
        }
    }

    const handleSelectedInterest = (interestId: number) => {
        if (returnSelectInterest.includes(interestId)) {
            const remainingId = returnSelectInterest.filter((item2) => item2 !== interestId);
            setReturnSelectInterest(remainingId);
        }
        if (returnSelectInterest.length < 5 && !returnSelectInterest.includes(interestId)){
            setReturnSelectInterest([...returnSelectInterest, interestId])
        }
    };

    useEffect(() => {
        const items = JSON.parse(localStorage.getItem('userDetails')!);
        if(items) {
            setUserDetails(items);
        }
        invokeGender();
        invokeInterestIn();
        invokeInterest();
        concatenateDate();
    }, []);

 return (
    <div className='text-black pt-0.5 md:pt-10 pb-10 md:h-full'>
        <form onSubmit={handleSubmit} className='md:flex md:flex-col md:justify-center md:items-center md:h-full'>
            <div className='md:flex md:gap-10 justify-center'>
                <div className='bg-white flex flex-col p-7 rounded-lg shadow-md gap-5 mb-10 md:mb-0'>
                    <div className='text-center'>
                        <h2 className='font-semibold text-2xl mb-4'>CREATE  A PROFILE</h2>
                        <p className='text-p-text w-80'>Details will enable you to match with the right people.</p>
                    </div>
                    <Input
                    type='text'
                    placeholder='First Name'
                    label='First Name'
                    name='firstName'
                    action={handleChange}
                    value={formData.firstName!}
                    bgColor='bg-input-bg'
                    />
                    <Input
                    type='text'
                    placeholder='Last Name'
                    label='Last Name'
                    name='lastName'
                    action={handleChange}
                    value={formData.lastName!}
                    bgColor='bg-input-bg'
                    />
                    
                    <div className='flex flex-col'>
                        <p>Birthday</p>
                        <div className='flex flex-wrap gap-2 mt-1'>
                            <div className='flex items-center rounded-3xl bg-input-bg'>
                                <DatePicker
                                className='appearance-none w-14 border-none rounded-3xl bg-transparent focus:ring-0 placeholder:text-[10px] placeholder:leading-3 md:placeholder:text-xs'
                                renderCustomHeader={({
                                }) => ('')}
                                selected={day}
                                onChange={(date) => setDay(date!)}
                                dateFormat="dd"
                                placeholderText='Day'
                                scrollableMonthYearDropdown
                                />
                                <img src={dropDown} alt='dropdown button' className='pr-3 w-5' />
                            </div>
                            <div className='flex items-center rounded-3xl bg-input-bg'>
                                <DatePicker
                                className='w-20 border-none rounded-3xl bg-transparent focus:ring-0 placeholder:text-[10px] placeholder:leading-3 md:placeholder:text-xs'
                                renderCustomHeader={({
                                }) => (<p className='font-bold'>Months</p>)}
                                selected={month}
                                onChange={(date) => setMonth(date!)}
                                dateFormat="MM"
                                placeholderText='Month'
                                showMonthYearPicker
                                showMonthDropdown
                                dropdownMode='select'
                                />
                                <img src={dropDown} alt='dropdown button' className='pr-3 w-5' />
                            </div>
                            <div className='flex items-center rounded-3xl bg-input-bg '>
                                <DatePicker
                                className='w-16 border-none rounded-3xl pr-3 bg-transparent focus:ring-0 placeholder:text-[10px] placeholder:leading-3 md:placeholder:text-xs'
                                selected={year}
                                onChange={(date) => setYear(date!)}
                                dateFormat="yyyy"
                                placeholderText='Year'
                                showYearPicker
                                yearItemNumber={6}
                                />
                                <img src={dropDown} alt='dropdown button' className=' pr-3 w-5' />
                            </div> 
                        </div>
                    </div>

                    <div>
                        <p>Gender</p>
                        <div className='flex flex-wrap gap-4 md:gap-2 mt-2'>
                            {genders!.map((item, index)=>(
                                <div key={index}>
                                    <input
                                    type='radio'
                                    name='gender'
                                    value={item.id}
                                    id={item.value}
                                    className='hidden peer '
                                    onChange={handleGenderChange}
                                    />
                                    <label htmlFor={item.value} className='py-1.5 px-4 bg-input-bg rounded-3xl peer-checked:bg-purple peer-checked:text-white'>{item.value}</label>

                                </div>
                            ))}
                        </div>
                    </div>

                    <div>
                        <p>Interested In</p>
                        <div className='flex gap-4 md:gap-2 mt-2 flex-wrap'>
                            {interestedInWho!.map((item2, index)=>(
                                <div key={index}>
                                    <input
                                    type='radio'
                                    name='interestedIn'
                                    value={item2.id}
                                    id={`${item2.id}`}
                                    className='hidden peer'
                                    onChange={handleInterestedChange}
                                    />
                                    <label htmlFor={`${item2.id}`} className='py-1.5 px-4 bg-input-bg rounded-3xl peer-checked:bg-purple peer-checked:text-white'>{item2.value}</label>

                                </div>
                            ))}
                        </div>
                    </div>

                    <div>
                        <p>Age range</p>
                        <div className='flex gap-3 items-center'>
                            <div className='flex relative w-20'>
                                <Input
                                type='number'
                                bgColor='bg-input-bg'
                                placeholder='18'
                                value={formData.fromAge!}
                                name='fromAge'
                                action={ageChange}/>
                                <div className='absolute top-5 right-0 mr-2'>
                                    <img src={dropDown} alt='dropdown button' className='w-2' />
                                </div>
                            </div>
                            <p>to</p>
                            <div className='flex relative w-20 items-center'>
                                <Input
                                type='number'
                                bgColor='bg-input-bg'
                                placeholder='40'
                                value={formData.toAge!}
                                name='toAge'
                                action={ageChange}/>
                                <div className='absolute top-5 right-0 mr-2'>
                                    <img src={dropDown} alt='dropdown button' className='w-2' />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='flex flex-col gap-4 px-7 md:pt-7  pb-7'>
                    <div className='text-center'>
                        <h2 className='text-2xl font-semibold mb-4'>Choose your interest</h2>
                        <p className='text-p-text w-96'>Write about yourself and choose your interest to get familiar with other users</p>
                    </div>

                    <div className='flex flex-col gap-1.5'>
                        <label htmlFor='interest'>About</label>
                        <textarea
                        required
                        placeholder='Write about yourself'
                        name='interest'
                        value={formData.info}
                        onChange={handleTextareaChange}
                        className='border-red rounded-xl placeholder:text-xs' rows={6} cols={40}/>
                    </div>

                    <div>
                        <p className='text-xs'>Choose <b>5</b> interest below</p>
                        <div className="flex flex-wrap gap-2 justify-center md:justify-start md:w-[25rem]">
                        {interest.map((child, index) => (
                        <p
                            className={`bg-white rounded-2xl py-1 px-2 mt-1 ${
                            returnSelectInterest.includes(child.id) &&
                            "bg-purple text-white"
                            }`}
                            onClick={() => handleSelectedInterest(child.id)}
                            key={index}
                        >
                            {child.value}
                        </p>
                        ))}
                        </div>
                    </div>
                </div>
            </div>
            <div className='w-3/4 md:w-1/4 m-auto'>
                <Button
                text='Get Started'
                bg='bg-purple'
                spin={isLoading? 'block animate-spin w-4 h-4' : 'hidden'}
                textColor='text-white'
                />
            </div>
        </form>
    </div>
  )
}

export default Profile