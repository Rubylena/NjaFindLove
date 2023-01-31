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
    const [selectedGenders, setSelectedGenders] = useState<number>(0)

    const [interestedInWho, setInterestedInWho] = useState<IdValue[]>([])
    const [selectedInterestedIn, setSelectedInterestedIn] = useState<number>(0)

    const [interest, setInterest] = useState<IdValue[]>([])
    // const [returnSelectInterest, setReturnSelectInterest] = useState<IdValue>();
    const [returnSelectInterest, setReturnSelectInterest] = useState<number[]>([]);
    // const [finalInterestId, setFinalInterestId] = useState<number>()
    const [selectInterest, setSelectInterest] = useState<string[]>([]);

    const [day, setDay] = useState<null | Date>(null);
    const [month, setMonth] = useState<null | Date>(null);
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
        gender: selectedGenders,
        interestedIn: selectedInterestedIn,
        fromAge: 0,
        toAge: 0,
        info: '',
        interest: [],
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    }

    const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>)=>{
        const { value } = e.target;
        setFormData({ ...formData, info: value });
    }

    const handleGenderChange = (event: React.ChangeEvent<HTMLInputElement>)=> {
        setSelectedGenders(parseInt(event.target.value))
    }
    const handleInterestedChange = (event: React.ChangeEvent<HTMLInputElement>)=> {
        setSelectedInterestedIn(parseInt(event.target.value))
    }

    const concatenateDate = () =>{
        if(day! && month! && year!){
            const days = day.toString()
            const months = month.toString()
            const years = year.toString()
            setDateOfBirth(`${days.split(' ')[2]}-${months.split(' ')[1]}-${years.split(' ')[3]}`)
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
        setFormData({ ...formData, 
            userId: userDetails!.userId, session: userDetails!.session, 
            email: userDetails!.email!, dob: dateOfBirth,
            // interest: returnSelectInterest.id
        });
        try {
            const response = await axiosBase.post<FormData>('/Profile/CreateProfile', formData);
            console.log(response.data)
            setIsLoading(isLoading)
        } catch (err) {
            console.error(err);
        }
    }

    const handleSelectedInterest = (interestId: number, interestValue: string) => {
        if (returnSelectInterest.includes(interestId)) {
            const remainingId = returnSelectInterest.filter((item2) => item2 !== interestId);
            return setReturnSelectInterest(remainingId);
        }
        if (returnSelectInterest.length < 5){
            setReturnSelectInterest([...returnSelectInterest, interestId])
        }
        // if (selectInterest.includes(interestValue)) {
        //     const remainingStatus = selectInterest.filter((item) => item !== interestValue);
        //     return setSelectInterest(remainingStatus);
        // }
        // if (selectInterest.length < 5){
        //     setSelectInterest([...selectInterest, interestValue]);
        // }
    };
    console.log(returnSelectInterest)

    useEffect(() => {
        const items = JSON.parse(localStorage.getItem('userDetails')!);
        if(items) {
            setUserDetails(items);
        }
        invokeGender();
        invokeInterestIn();
        invokeInterest();
        concatenateDate();
        // setFinalInterestId(returnSelectInterest!.id!)
    }, []);
    // console.log(finalInterestId)
  return (
    <div className='h-full'>
        <form onSubmit={handleSubmit}>
            <div className='flex flex-col gap-10 justify-center'>
                <div className='bg-white'>
                    <h2>CREATE  A PROFILE</h2>
                    <p>Details will enable you to match with the right people.</p>
                    <Input
                    type='text'
                    placeholder='Olowosheni001'
                    label='First Name'
                    name='firstName'
                    action={handleChange}
                    value={formData.firstName!}
                    bgColor='bg-input-bg'
                    />
                    <Input
                    type='text'
                    placeholder='Olowosheni001last'
                    label='Last Name'
                    name='lastName'
                    action={handleChange}
                    value={formData.lastName!}
                    bgColor='bg-input-bg'
                    />
                    
                    <div className='flex gap-5'>
                        <div className='flex items-center px-3 rounded-3xl bg-input-bg'>
                            <DatePicker
                            className='appearance-none w-14 border-none rounded-3xl bg-input-bg focus:ring-0'
                            renderCustomHeader={({
                            }) => ('')}
                            selected={day}
                            onChange={(date) => setDay(date!)}
                            dateFormat="dd"
                            placeholderText='Day'
                            scrollableMonthYearDropdown
                            />
                            <img src={dropDown} alt='dropdown button' className='z-30 pr-2 w-5' />
                        </div>
                        <div className='flex items-center px-3 rounded-3xl bg-input-bg'>
                            <DatePicker
                            className='w-20 border-none rounded-3xl bg-input-bg focus:ring-0'
                            renderCustomHeader={({
                            }) => ('Months')}
                            selected={month}
                            onChange={(date) => setMonth(date!)}
                            dateFormat="MM"
                            placeholderText='Month'
                            showMonthYearPicker
                            showMonthDropdown
                            dropdownMode='select'
                            />
                            <img src={dropDown} alt='dropdown button' className='z-30 pr-2 w-5' />
                        </div>
                        <div className='flex items-center px-3 rounded-3xl bg-input-bg'>
                            <DatePicker
                            className='w-20 border-none rounded-3xl pr-3 bg-input-bg focus:ring-0'
                            selected={year}
                            onChange={(date) => setYear(date!)}
                            dateFormat="yyyy"
                            placeholderText='Year'
                            showYearPicker
                            />
                            <img src={dropDown} alt='dropdown button' className='z-30 pr-2 w-5' />
                        </div> 
                    </div>

                    <p>Gender</p>
                    <div className='flex gap-2'>
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
                                <label htmlFor={item.value} className='py-2 px-4 bg-input-bg rounded-3xl peer-checked:bg-purple peer-checked:text-white'>{item.value}</label>

                            </div>
                        ))}
                    </div>

                    <p>Interested In</p>
                    <div className='flex gap-2'>
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
                                <label htmlFor={`${item2.id}`} className='py-2 px-4 bg-input-bg rounded-3xl peer-checked:bg-purple peer-checked:text-white'>{item2.value}</label>

                            </div>
                        ))}
                    </div>

                    <p>Age range</p>
                    <div className='flex gap-3 items-center'>
                        <div className='flex relative'>
                            <Input
                            type='number'
                            bgColor='bg-input-bg'
                            placeholder='18'
                            value={formData.fromAge!}
                            name='fromAge'
                            action={handleChange}/>
                            <div className='absolute top-4 right-0'>
                                <img src={dropDown} alt='dropdown button' />
                            </div>
                        </div>
                        <p>to</p>
                        <div className='flex relative'>
                            <Input
                            type='number'
                            bgColor='bg-input-bg'
                            placeholder='40'
                            value={formData.toAge!}
                            name='toAge'
                            action={handleChange}/>
                            <div className='absolute top-4 right-0'>
                                <img src={dropDown} alt='dropdown button' />
                            </div>
                        </div>
                    </div>

                </div>
                <div className='h-fit'>
                    <h2>Choose your interest</h2>
                    <p>Write about yourself and choose your interest to get familiar with other users</p>
                    <label htmlFor='interest'>About</label>
                    <textarea
                    required
                    placeholder='Write about yourself'
                    name='interest'
                    value={formData.info}
                    onChange={handleTextareaChange}
                    className='border-tint-pink rounded-xl placeholder:text-xs' rows={6} cols={40}/>
                    <p>Choose <b>5</b> interest below</p>
                    <div className="flex flex-wrap gap-1">
                    {interest.map((child, index) => (
                    <p
                        className={` text-center font-medium bg-white rounded-2xl py-1 px-2 mt-1 ${
                        returnSelectInterest.includes(child.id) &&
                        "bg-purple text-white"
                        }`}
                        onClick={() => handleSelectedInterest(child.id, child.value)}
                        key={index}
                    >
                        {child.value}
                    </p>
                    ))}
                </div>
                </div>
            </div>
            <Button
            text='Get Started'
            bg='bg-purple'
            spin={isLoading? 'block animate-spin w-4 h-4' : 'hidden'}
            textColor='text-white'
             />
        </form>
    </div>
  )
}

export default Profile