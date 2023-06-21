import { Fragment, useEffect, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { axiosBase } from '../../api/api';
import { encryptStorage } from '../../encrypt/encrypt';

interface ShowMorePictures {
    open: any,
    setOpen: any,
    pictures: any
}

export default function ShowPictures(props: ShowMorePictures) {
    const [details, setDetails] = useState<any>({})
    const cancelButtonRef = useRef(null)

    const handleDelete = async (session: string, email: string, id: number) => {
        try {
            const response = await axiosBase.post(`${import.meta.env.VITE_REMOVEPICTURE_URL}`, { session: session, email: email, id: id });
            if (response.data.success){
                window.location.reload()
            }
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        const items = encryptStorage.getItem('userDetails')!;
        if (items) {
            setDetails(items)
        }
    }, []);

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
                            <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left drop-shadow shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4 flex flex-wrap gap-2 justify-center">
                                    {props.pictures.map((img: any) => (
                                        <div className='relative' key={img.id}>
                                            <img src={`data:image/jpg;base64,${img?.imageBase64}`} alt='profile picture' className='w-28 h-full' />
                                            <span className='flex justify-center items-center rounded-full bg-red text-white w-4 h-4 absolute top-1 right-1 text-xs cursor-pointer'
                                                onClick={() => handleDelete(details.session, details.email, img.id)}>x</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                    <button
                                        type="button"
                                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                        onClick={() => props.setOpen(false)}
                                        ref={cancelButtonRef}
                                    >
                                        Ok
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}
