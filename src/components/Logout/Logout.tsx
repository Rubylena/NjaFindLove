import React from 'react'
import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { Link, useLocation, useNavigate} from 'react-router-dom';

interface LogOutComponent {
    logout: any,
    setLogout: any,
}

const Logout = (props: LogOutComponent) => {
    const location = useLocation();
    const active = location.pathname;

    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem('userDetails')
        navigate('/')
        window.location.reload();
    }

    return (
        <Transition.Root show={props.logout} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={props.setLogout}>
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


                <div className="fixed inset-0 z-10 overflow-y-auto bg-black bg-opacity-20">
                    <div className="flex justify-center h-full items-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel className="relative transform rounded-lg transition-all">
                                <div className='bg-white p-5 rounded-xl'>
                                    <p className='font-medium mb-5'>Are you sure you want to Quit?</p>
                                    <div className='flex justify-center items-center gap-5 cursor-pointer'>
                                        <p onClick={handleLogout} className='border shadow border-red rounded-md py-1 px-3 text-red'>Yes</p>
                                        <a href={active} className='border shadow border-purple rounded-md py-1 px-3 outline-none'>No</a>
                                    </div>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}

export default Logout