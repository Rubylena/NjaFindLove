import React, { useEffect, useState } from 'react'
import Input from '../Input/Input'
import Button from '../Button/Button'
import { axiosBase } from '../../api/api'

interface Props {
    searched: any;
}

const SIdebarSearch = (props: Props) => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [formData, setFormData] = useState({
        email: '',
        session: '',
        fromAge: 18,
        toAge: 40,
        location: '',
        pageSize: 1,
        pageNumber: 10,
    });

    const ageChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const { name } = event.target;
        setFormData({ ...formData, [name]: parseInt(event.target.value) });
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        setIsLoading(!isLoading)
        event.preventDefault();
        try {
            const response = await axiosBase.post<FormData>('/InApp/SearchPeople', formData);
            props.searched(response.data);
            setIsLoading(isLoading)
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        const items = JSON.parse(localStorage.getItem('userDetails')!);
        if (items) {
            setFormData(prev => ({
                ...prev,
                email: items.email,
                session: items.session
            }))
        }
    }, []);

    return (
        <form onSubmit={handleSubmit} className='bg-tint-pink pb-5 rounded-lg '>
            <div className='px-5'>
                <p>Age range</p>
                <div className='flex gap-3 items-center'>
                    <div className='flex relative w-20'>
                        <Input
                            type='number'
                            bgColor='bg-white'
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
                            bgColor='bg-white'
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
            <div className='px-6 pt-3 pb-3'>
                <label>Location</label>
                <Input
                    type='text'
                    bgColor='bg-white'
                    placeholder='Enter location'
                    value={formData.location}
                    name='location'
                    action={handleChange} />
            </div>
            <div className='px-6'>
                <Button
                    text='Search'
                    bg='bg-purple'
                    spin={isLoading ? 'block animate-spin w-4 h-4' : 'hidden'}
                    textColor='text-white'
                />
            </div>
        </form>
    )
}

export default SIdebarSearch