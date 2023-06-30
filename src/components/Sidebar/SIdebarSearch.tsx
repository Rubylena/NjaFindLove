import React, { useEffect, useState } from 'react'
import Input from '../Input/Input'
import Button from '../Button/Button'
import { axiosBase } from '../../api/api'
import { encryptStorage } from '../../encrypt/encrypt';

interface Props {
    searched: any;
}

const SIdebarSearch = (props: Props) => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [searchError, setSearchError] = useState('')
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
        let parsedValue = parseInt(event.target.value, 10)
        if (isNaN(parsedValue)) {
            parsedValue = 0;
        }
        setFormData({ ...formData, [name]: parsedValue });
        setSearchError('')
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
        setSearchError('')
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        setIsLoading(!isLoading)
        event.preventDefault();
        setSearchError('')
        try {
            const response = await axiosBase.post(`${import.meta.env.VITE_SEARCH_URL}`, formData);
            if (response.data.users.length > 0) {
                props.searched(response.data);
                // console.log(response.data)
            }
            if (response.data.users.length === 0) {
                setSearchError('No users within this age range or location')
            }
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(isLoading)

        }
    }

    useEffect(() => {
        const items = encryptStorage.getItem('userDetails')!;
        if (items) {
            setFormData(prev => ({
                ...prev,
                email: items.email,
                session: items.session
            }))
        }
    }, []);

    return (
        <form onSubmit={handleSubmit} className='bg-tint-pink pb-5 rounded-lg shadow-lg pt-5 drop-shadow w-full '>
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
            {searchError && <p className='py-3 px-6 text-red font-medium text-center'>{searchError}</p>}
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