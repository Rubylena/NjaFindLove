import React, { Fragment, useRef, useState, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import Button from '../../components/Button/Button';
import add from '../../asset/icon/add.png'
import { axiosBase } from '../../api/api';
import { FormData, Local, Picture } from '../../api/auth';
import { useNavigate } from 'react-router-dom';

interface AddMorePictures {
    open: any,
    setOpen: any,
}

export default function AddPictures(props: AddMorePictures) {
    const [file, setFile] = useState<File | null>(null);
    const [fileMsg, setFileMsg] = useState<string>('');
    const [fileType, setFileType] = useState<string>('')
    const [images, setImages] = useState<string>();

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [userDetails, setUserDetails] = useState<Local>();
    const [moveToNext, setMoveToNext] = useState<boolean>();

    const navigate = useNavigate();
    const cancelButtonRef = useRef(null)

    const [formData, setFormData] = useState<Picture>({
        session: '',
        email: '',
        imageBase64: ''
    })

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault()

        setFileMsg('')
        setFileType('')
        setFile(event.target.files?.[0]!);

        const reader = new FileReader();
        reader.onload = () => {
            const img = reader.result as string
            setImages(img);
            setFormData({ ...formData, session: userDetails!.session, email: userDetails!.email, imageBase64: img });
        };

        reader.readAsDataURL(event.target.files?.[0]!);
    };

    const imgTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        setIsLoading(true)
        event.preventDefault();
        try {
            if (!file) {
                setFileMsg('Please select an image.');
                return;
            }
            if (!imgTypes.includes(file.type)) {
                setFileType("Please accepted image type is jpg, jpeg and png.")
                return;
            }
            if (imgTypes.includes(file.type)) {
                const response = await axiosBase.post<FormData>('/Profile/AddPicture', formData);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        const items = JSON.parse(localStorage.getItem('userDetails')!);
        if (items) {
            setUserDetails(items);
        }
    }, [moveToNext, navigate,]);

    return (
        <Transition.Root show={props.open} as={Fragment}>
            <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={props.setOpen}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                    <form onSubmit={handleSubmit} >
                                        <div className='md:flex justify-center m-auto max-w-fit h-56 md:w-full my-10'>
                                            <div>
                                                <label htmlFor="picture" className='rounded-full bg-input-bg flex justify-center items-center border w-60 h-60'>
                                                    {file && imgTypes.includes(file.type) ?
                                                        <img src={images} alt="profile"
                                                            className='rounded-full w-full h-full object-cover'
                                                        />
                                                        :
                                                        file && !imgTypes.includes(file.type) ?
                                                            <img src={images} alt="wrong format: accepts only jpg,jpeg & png"
                                                                className=' w-full p-4'
                                                            />
                                                            :
                                                            <img src={add} alt="add" className=' p-20 md:p-24' />
                                                    }
                                                </label>
                                                <input type="file" onChange={handleChange} id='picture' className='sr-only' />
                                            </div>
                                        </div>
                                        <div className='flex  gap-3 justify-center'>
                                            <p className='text-red text-xs pb-2'>{fileMsg ? fileMsg : null}</p>
                                            <p className='text-red text-xs pb-2'>{fileType ? fileType : null}</p>
                                        </div>
                                        <div className='flex justify-center items-center gap-3 m-auto'>
                                            <button
                                                type="button"
                                                className="inline-flex w-20 justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold shadow-sm ring-1 ring-inset ring-purple hover:bg-purple hover:bg-opacity-30 hover:text-white sm:mt-0 sm:w-auto"
                                                onClick={() => props.setOpen(false)}
                                                ref={cancelButtonRef}
                                            >
                                                Cancel
                                            </button>

                                            <button
                                                type="submit"
                                                className="inline-flex w-32 justify-center rounded-md bg-purple ring-1 ring-inset ring-purple px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-white hover:text-purple sm:w-auto"
                                            >
                                                Add
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}
