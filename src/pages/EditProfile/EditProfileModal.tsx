import { Fragment, useEffect, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import EditAttributes from './EditAttributes'
import edit from '../../asset/icon/edit.svg'
import { axiosBase } from '../../api/api'
import { IdValue, updateInterestData } from '../../interface/auth'
import { encryptStorage } from '../../encrypt/encrypt'
// import Input from '../../components/Input/Input'

interface EditableProfile {
    open: any,
    setOpen: any,
    attributes: any[],
    userAttributes: any,
}

export default function EditProfileModal(props: EditableProfile) {
    const [aboutFormData, setAboutFormData] = useState({
        session: "",
        email: "",
        id: 0,
        info: ""
    })
    const [aboutUpdate, setAboutUpdate] = useState(false)
    const [interestFormData, setInterestFormData] = useState<updateInterestData>({
        session: "",
        email: "",
        id: 0,
        interest: [],
    });
    const [interestUpdate, setInterestUpdate] = useState(false)
    const [interest, setInterest] = useState<IdValue[]>([])
    const [returnSelectInterest, setReturnSelectInterest] = useState<number[]>([]);
    const [locationUpdate, setLocationUpdate] = useState(false)
    const [locationFormData, setLocationFormData] = useState({
        session: "",
        email: "",
        latitude: 0,
        longitude: 0,
    });
    const [attributesComp, setAttributesComp] = useState<any>([])
    const [attributesArray, setAttributesArray] = useState<any>()
    const [attributeUpdate, setAttributeUpdate] = useState<boolean>(false)
    const [attributeFormData, setAttributeFormData] = useState({
        session: "",
        email: "",
        id: 0,
        attributes: [
            {
                attributeId: 0,
                attributeValue: 0
            }
        ],
    });

    const cancelButtonRef = useRef(null)

    const getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
        } else {
            return 'Not supported'
        }

        function showPosition(position: any) {
            setLocationFormData({ ...locationFormData, latitude: position.coords.latitude, longitude: position.coords.longitude });
        }
    }

    // const handleLocationChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    //     const { name, value } = event.target;
    //     setLocationFormData({
    //         ...locationFormData, [name]: value
    //     });
    // }

    const handleLocationSubmit = async () => {
        setLocationUpdate(true);
        try {
            const response = await axiosBase.post(`${import.meta.env.VITE_UPDATELOCATION_URL}`, locationFormData);
        } catch (err) {
            console.log(err)
        } finally {
            setLocationUpdate(false);
            window.location.reload();
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

    const handleSelectedInterest = (interestId: number) => {
        if (returnSelectInterest.includes(interestId) && interestFormData.interest.includes(interestId)) {
            const remainingId = returnSelectInterest.filter((item2) => item2 !== interestId);
            const remainingId2 = interestFormData.interest.filter((item3) => item3 !== interestId);
            setReturnSelectInterest(remainingId);
            setInterestFormData({ ...interestFormData, interest: remainingId2 });
        }
        if (returnSelectInterest.length < 5 && !returnSelectInterest.includes(interestId)) {
            setReturnSelectInterest([...returnSelectInterest, interestId])
            interestFormData.interest.push(interestId)
        }
    };

    const handleInterestSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setInterestUpdate(true);
        try {
            await axiosBase.post(`${import.meta.env.VITE_UPDATEINTEREST_URL}`, interestFormData);
        } catch (err) {
            console.log(err)
        } finally {
            setInterestUpdate(false)
            window.location.reload();
        }
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

    const handleAttributeSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setAttributeUpdate(true);
        try {
            await axiosBase.post(`${import.meta.env.VITE_UPDATEATTRIBUTES_URL}`, attributeFormData);
        } catch (err) {
            console.log(err)
        } finally {
            setAttributeUpdate(false);
            window.location.reload();
        }
    }

    const handleAboutChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { value } = e.target;
        setAboutFormData({ ...aboutFormData, info: value });
    }

    const handleAboutSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setAboutUpdate(true);
        try {
            await axiosBase.post(`${import.meta.env.VITE_UPDATEINFO_URL}`, aboutFormData);
        } catch (err) {
            console.log(err)
        } finally {
            setAboutUpdate(false);
            window.location.reload();
        }
    }

    useEffect(() => {
        getLocation();

        const items = encryptStorage.getItem('userDetails')!;
        if (items) {
            setAboutFormData(prev => ({ ...prev, session: items.session, email: items.email, id: items.userId }))
            setInterestFormData(prev => ({ ...prev, session: items.session, email: items.email, id: items.userId }))
            setAttributeFormData(prev => ({ ...prev, session: items.session, email: items.email, id: items.userId, attributes: attributesArray }))
            setLocationFormData(prev => ({ ...prev, session: items.session, email: items.email }))
        }
        invokeInterest()

    }, [attributesComp, attributesArray])



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
                                <div className="bg-white px-4 pb-4 pt-2 sm:p-6 sm:pb-4">
                                    <div className="sm:flex sm:items-start">
                                        <div className="w-full mt-2 sm:ml-4 sm:mt-2 sm:text-left">
                                            <div className="flex gap-3">
                                                <img src={edit} alt='edit' className='h-6 w-6' aria-hidden="true" />
                                                <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                                                    Edit Details
                                                </Dialog.Title>
                                            </div>

                                            <form onSubmit={handleAboutSubmit}>
                                                <div className='flex flex-col gap-1.5'>
                                                    <label htmlFor='about'>About</label>
                                                    <textarea
                                                        required
                                                        placeholder='Write about yourself'
                                                        name='info'
                                                        value={aboutFormData.info}
                                                        onChange={handleAboutChange}
                                                        className='border-red rounded-xl placeholder:text-xs' rows={6} cols={40} />
                                                </div>
                                                <div className="bg-gray-50 py-3 sm:flex sm:flex-row-reverse">
                                                    <button
                                                        type="submit"
                                                        className="inline-flex w-full justify-center rounded-md bg-purple px-3 py-2 text-sm font-semibold text-white shadow-sm hover:border-purple hover:text-white sm:ml-3 sm:w-auto"
                                                    >
                                                        {aboutUpdate ? 'Updating...' : 'Update'}
                                                    </button>
                                                </div>
                                            </form>

                                            <form onSubmit={handleAttributeSubmit}>
                                                {props.attributes && props.userAttributes?.attributes.map((item: any, idx: number) => {
                                                    const matchingAttribute = props.attributes.find((attr: any) => attr.attributeId === item.attributeId);
                                                    const selectionArray = matchingAttribute ? matchingAttribute.attributeValues.map((val: any) => val) : [];
                                                    return (
                                                        <div key={idx}>
                                                            <EditAttributes
                                                                key={idx}
                                                                name={[item.attributeId, item.attributeName]}
                                                                defaultArray={{
                                                                    'id': item.attributeId,
                                                                    'value': item.attributeValue
                                                                }}
                                                                selectionArray={selectionArray}
                                                                selected={handleAttributeChildData}
                                                            />
                                                        </div>
                                                    );
                                                })}
                                                <div className="bg-gray-50 py-3 sm:flex sm:flex-row-reverse">
                                                    <button
                                                        type="submit"
                                                        className="inline-flex w-full justify-center rounded-md bg-purple px-3 py-2 text-sm font-semibold text-white shadow-sm hover:border-purple hover:text-white sm:ml-3 sm:w-auto"
                                                    >
                                                        {attributeUpdate ? 'Updating...' : 'Update'}
                                                    </button>
                                                </div>
                                            </form>

                                            <div>
                                                <form className='flex flex-wrap gap-3 items-center justify-between'>
                                                    <p>Location</p>
                                                    {/* <Input
                                                        type='text'
                                                        placeholder='location'
                                                        name='location'
                                                        action={handleLocationChange}
                                                        value={locationFormData.location}
                                                        bgColor='bg-input-bg'
                                                    /> */}
                                                    {/* <button
                                                        type="button"
                                                        className=" w-full justify-center rounded-md bg-purple px-3 py-2 text-sm font-semibold text-white shadow-sm hover:border-purple hover:text-white sm:ml-3 sm:w-auto"
                                                    >
                                                        {interestUpdate ? 'Updating...' : 'Update'}
                                                    </button> */}
                                                </form>
                                                <div className="bg-gray-50 py-3 sm:flex sm:flex-row-reverse">
                                                    <button
                                                        type="button"
                                                        className="inline-flex w-full justify-center rounded-md bg-purple px-3 py-2 text-sm font-semibold text-white shadow-sm hover:border-purple hover:text-white sm:ml-3 sm:w-auto"
                                                        onClick={handleLocationSubmit}
                                                    >
                                                        {locationUpdate ? 'Updating...' : 'Click to update with GPS'}
                                                    </button>
                                                </div>
                                            </div>

                                            <form onSubmit={handleInterestSubmit}>
                                                <div>
                                                    <p className='text-xs mt-2'>Choose <b>5</b> interest below</p>
                                                    <div className="flex flex-wrap gap-2 justify-center md:justify-start md:w-[25rem]">
                                                        {interest.map((child) => (
                                                            <p
                                                                className={`bg-white rounded-2xl py-1 px-2 mt-1 ${returnSelectInterest.includes(child.id) &&
                                                                    "bg-purple text-white"
                                                                    }`}
                                                                onClick={() => handleSelectedInterest(child.id)}
                                                                key={child.id}
                                                            >
                                                                {child.value}
                                                            </p>
                                                        ))}
                                                    </div>
                                                </div>
                                                <div className="bg-gray-50 py-3 sm:flex sm:flex-row-reverse">
                                                    <button
                                                        type="submit"
                                                        className="inline-flex w-full justify-center rounded-md bg-purple px-3 py-2 text-sm font-semibold text-white shadow-sm hover:border-purple hover:text-white sm:ml-3 sm:w-auto"
                                                    >
                                                        {interestUpdate ? 'Updating...' : 'Update'}
                                                    </button>
                                                    <button
                                                        type="button"
                                                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                                        onClick={() => {props.setOpen(false) }}
                                                        ref={cancelButtonRef}
                                                    >
                                                        Cancel
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
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
