import React, { useEffect, useState } from 'react'
import { axiosBase } from '../../api/api';
import { CreateProfileData, FormData, IdValue, Local } from '../../interface/auth'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dropDown from '../../asset/icon/drop-down-arrow.png'
import Input from '../Input/Input'
import Button from '../Button/Button';
import { useNavigate } from 'react-router-dom';
import Attributes from './Attributes';
import { encryptStorage } from '../../encrypt/encrypt';

const Profile = () => {
    const [userDetails, setUserDetails] = useState<Local>();

    const [genders, setGenders] = useState<IdValue[]>([]);

    const [moveToNext, setMoveToNext] = useState<boolean>();
    const navigate = useNavigate();

    const [interestedInWho, setInterestedInWho] = useState<IdValue[]>([])

    const [interest, setInterest] = useState<IdValue[]>([])
    const [returnSelectInterest, setReturnSelectInterest] = useState<number[]>([]);

    const [attributes, setAttributes] = useState<any[]>()
    const [attributesComp, setAttributesComp] = useState<any>([]);
    const [attributesArray, setAttributesArray] = useState<any>([])

    const [dateOfBirth, setDateOfBirth] = useState<null | Date>(null);
    const [eighteenFromToday, setEighteenFromToday] = useState<Date>(new Date());

    const [isLoading, setIsLoading] = useState<boolean>(false)

    const [formData, setFormData] = useState<CreateProfileData>({
        firstName: '',
        surname: '',
        userId: 0,
        session: '',
        email: '',
        dob: '',
        gender: 0,
        interestedIn: 0,
        fromAge: 18,
        toAge: 40,
        info: '',
        interest: [],
        attributes: [
            {
                attributeId: 0,
                attributeValue: 0,
            }
        ]
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = event.target;
        setFormData({
            ...formData, [name]: value, userId: userDetails!.userId, session: userDetails!.session,
            email: userDetails!.email!
        });
    }

    const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { value } = e.target;
        setFormData({ ...formData, info: value });
    }

    const ageChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const { name } = event.target;
        setFormData({ ...formData, [name]: parseInt(event.target.value) });
    }

    const handleGenderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, gender: parseInt(event.target.value) })
    }

    const handleInterestedChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, interestedIn: parseInt(event.target.value) })
    }

    const handleAttributeChildData = (childAttributeData: any) => {
        setAttributesComp((prev: any) => {
            const key = Object.keys(childAttributeData)[0]; // Assuming there's only one key in childAttributeData
            const existingIndex = prev.findIndex((obj: any) => key in obj);

            if (existingIndex !== -1) {
                prev[existingIndex][key] = childAttributeData[key];
            } else {
                prev.push(childAttributeData);
            }

            const updatedAttributesArray = prev.map((item: any) => {
                const objKey = Object.keys(item)[0]; // Get the key of the object
                const value: any = Object.values(item);

                return {
                    attributeId: parseInt(objKey),
                    attributeValue: parseInt(value),
                };
            });

            setAttributesArray(updatedAttributesArray);

            return prev;
        });
    };

    const concatenateDate = (date: Date) => {
        if (dateOfBirth) {
            const days = dateOfBirth.toString()
            const months = dateOfBirth.getMonth()
            if (months < 10) {
                const full = `${days.split(' ')[2]}/0${months + 1}/${days.split(' ')[3]}`
                setFormData({ ...formData, dob: full })
            } else {
                const full = `${days.split(' ')[2]}/${months + 1}/${days.split(' ')[3]}`
                setFormData({ ...formData, dob: full })
            }
        }
    }

    function subtractYears(date: Date, years: number) {
        date.setFullYear(date.getFullYear() - years);
        return date;
    }

    const invokeGender = async () => {
        try {
            const response = await axiosBase.get(`${import.meta.env.VITE_GENDERLIST_URL}`);
            setGenders(response.data)
        } catch (err) {
            console.error(err);
        }
    }

    const invokeInterestIn = async () => {
        try {
            const response = await axiosBase.get(`${import.meta.env.VITE_INTERESTEDIN_URL}`);
            setInterestedInWho(response.data)
        } catch (err) {
            console.error(err);
        }
    }

    const invokeInterest = async () => {
        try {
            const response = await axiosBase.get(`${import.meta.env.VITE_INTERESTLIST_URL}`);
            setInterest(response.data)
        } catch (err) {
            console.error(err);
        }
    }

    const invokeAttributes = async () => {
        try {
            const response = await axiosBase.get(`${import.meta.env.VITE_ATTRIBUTES_URL}`);
            setAttributes(response.data)
        } catch (err) {
            console.error(err);
        }
    }

    const handleSelectedInterest = (interestId: number) => {
        if (returnSelectInterest.includes(interestId) && formData.interest.includes(interestId)) {
            const remainingId = returnSelectInterest.filter((item2) => item2 !== interestId);
            const remainingId2 = formData.interest.filter((item3) => item3 !== interestId);
            setReturnSelectInterest(remainingId);
            setFormData({ ...formData, interest: remainingId2 });
        }
        if (returnSelectInterest.length < 5 && !returnSelectInterest.includes(interestId)) {
            setReturnSelectInterest([...returnSelectInterest, interestId])
            formData.interest.push(interestId)
        }
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        setIsLoading(!isLoading)
        console.log(formData)
        event.preventDefault();
        try {
            const response = await axiosBase.post<FormData>(`${import.meta.env.VITE_CREATEPROFILE_URL}`, formData);
            setMoveToNext(response.data.success)
            setIsLoading(isLoading)
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        const items = encryptStorage.getItem('userDetails')!;
        if (items) {
            setUserDetails(items);
        }
        invokeGender();
        invokeInterestIn();
        invokeInterest();
        invokeAttributes();

        const profileCheck = () => {
            if (moveToNext) {
                navigate('/profile-picture')
            }
        }
        profileCheck();
        concatenateDate(dateOfBirth!)

        setEighteenFromToday(subtractYears(new Date(), 18));

        setFormData((prev: any) => ({ ...prev, attributes: attributesArray }))
    }, [moveToNext, navigate, dateOfBirth, attributesComp, attributesArray]);

    return (
        <div className='text-black pt-0.5 md:pt-10 pb-10 md:h-full'>
            <form onSubmit={handleSubmit} autoComplete='off' className='md:gap-5 md:flex md:flex-col md:justify-center md:items-center md:h-full'>
                <input autoComplete="off" name="hidden" type="text" className="hidden" />
                <div className='md:flex md:flex-wrap md:justify-center md:gap-10'>
                    <div className='bg-white flex flex-col p-7 rounded-lg shadow-md gap-5 mb-10 md:mb-0'>
                        <div className='text-center'>
                            <h2 className='font-semibold text-2xl mb-4'>CREATE  A PROFILE</h2>
                            <p className='text-p-text md:w-80'>Details will enable you to match with the right people.</p>
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
                            placeholder='Surname'
                            label='Surname'
                            name='surname'
                            action={handleChange}
                            value={formData.surname!}
                            bgColor='bg-input-bg'
                        />

                        <div className='flex flex-col'>
                            <p>Birthday</p>
                            <div className='flex flex-wrap gap-2 mt-1'>
                                <div className='flex items-center rounded-3xl bg-input-bg'>
                                    <DatePicker
                                        className='appearance-none text-center border-none rounded-3xl bg-transparent focus:ring-0 placeholder:text-[10px] placeholder:leading-3 md:placeholder:text-xs'
                                        selected={dateOfBirth}
                                        onChange={(date) => setDateOfBirth(date)}
                                        placeholderText='dd/mm/yyyy'
                                        maxDate={eighteenFromToday}
                                        showMonthDropdown
                                        showYearDropdown
                                        dropdownMode="select"
                                    />
                                    <img src={dropDown} alt='dropdown button' className='pr-3 w-5' />
                                </div>
                            </div>
                        </div>

                        <div>
                            <p>Gender</p>
                            <div className='flex flex-wrap gap-4 md:gap-2 mt-2'>
                                {genders!.map((item, index) => (
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
                                {interestedInWho!.map((item2, index) => (
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
                                        bgColor='bg-input-bg text-center'
                                        placeholder='18'
                                        value={formData.fromAge}
                                        name='fromAge'
                                        action={ageChange} />
                                    {/* <div className='absolute top-5 right-0 mr-2'>
                                        <img src={dropDown} alt='dropdown button' className='w-2' />
                                    </div> */}
                                </div>
                                <p>to</p>
                                <div className='flex relative w-20 items-center'>
                                    <Input
                                        type='number'
                                        bgColor='bg-input-bg text-center'
                                        placeholder='40'
                                        value={formData.toAge}
                                        name='toAge'
                                        action={ageChange} />
                                    {/* <div className='absolute top-5 right-0 mr-2'>
                                        <img src={dropDown} alt='dropdown button' className='w-2' />
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='flex flex-col gap-4 px-7 md:pt-7 pb-7'>
                        <div className='text-center'>
                            <h2 className='text-2xl font-semibold mb-4'>Choose your interest</h2>
                            <p className='text-p-text md:w-96'>Write about yourself and choose your interest to get familiar with other users</p>
                        </div>

                        <div className='flex flex-col gap-1.5'>
                            <label htmlFor='interest'>About</label>
                            <textarea
                                required
                                placeholder='Write about yourself'
                                name='interest'
                                value={formData.info}
                                onChange={handleTextareaChange}
                                className='border-red rounded-xl placeholder:text-xs' rows={6} cols={40} />
                        </div>

                        <div>
                            <p className='text-xs'>Choose <b>5</b> interest below</p>
                            <div className="flex flex-wrap gap-2 justify-center md:justify-start md:w-[25rem]">
                                {interest.map((child, index) => (
                                    <p
                                        className={`bg-white rounded-2xl py-1 px-2 mt-1 ${returnSelectInterest.includes(child.id) &&
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

                    <div className='px-7 lg:px-0 md:pt-7 pb-7 w-full lg:w-fit'>
                        <p className='text-2xl font-semibold mb-4'>Attributes</p>
                        <div >
                            {attributes && attributes.map((attr, index) => (
                                <div key={index}>
                                    <Attributes
                                        name={[attr.attributeId, attr.attributeName]}
                                        selectionArray={attr.attributeValues.map((val: any) => val)}
                                        selected={handleAttributeChildData}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className='w-3/4 md:w-1/4 m-auto'>
                    <Button
                        text='Next'
                        bg='bg-purple'
                        spin={isLoading ? 'block animate-spin w-4 h-4' : 'hidden'}
                        textColor='text-white'
                    />
                </div>
            </form>
        </div>
    )
}

export default Profile