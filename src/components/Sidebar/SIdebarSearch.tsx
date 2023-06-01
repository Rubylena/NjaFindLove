import React, { useState } from 'react'
import Input from '../Input/Input'
import dropDown from '../../asset/icon/drop-down-arrow.png'
import Button from '../Button/Button'

const SIdebarSearch = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [formData, setFormData] = useState({
        fromAge: 18,
        toAge: 40,
        location: '',
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
            console.log(formData)
            // const response = await axiosBase.post<FormData>('/Profile/CreateProfile', formData);
            // setMoveToNext(response.data.success)
            setIsLoading(isLoading)
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <form onSubmit={handleSubmit} className='bg-tint-pink pb-5 rounded-b-[50px] '>
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