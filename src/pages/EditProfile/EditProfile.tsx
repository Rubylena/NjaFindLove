import React, { useEffect, useMemo, useState } from 'react'
import DashboardLayout from '../../components/DashboardLayout/DashboardLayout'
import profileImg from '../../asset/images/profileImg.png'
import verified from '../../asset/icon/verified.png'
import caution from '../../asset/icon/caution.png'
import logoutImg from '../../asset/icon/logout.svg'
import edit from '../../asset/icon/edit.svg'
import Logout from '../../components/Logout/Logout';
import { axiosBase } from '../../api/api'
import EditProfileModal from './EditProfileModal'
import ShowPictures from './ShowPictures'
import AddPictures from './AddPictures'
import { encryptStorage } from '../../encrypt/encrypt'

const EditProfile = () => {
  const [logout, setLogout] = useState(false)
  const [userAttributes, setUserAttributes] = useState<any>()
  const [attributes, setAttributes] = useState<any[]>([])
  const [openEditableProfile, setOpenEditableProfile] = useState(false)
  const [openPictures, setOpenPictures] = useState(false)
  const [addPictures, setAddPictures] = useState(false)

  const invokeAttributes = async () => {
    try {
      const response = await axiosBase.get(`${import.meta.env.VITE_ATTRIBUTES_URL}`);
      setAttributes(response.data)
    } catch (err) {
      console.error(err);
    }
  }

  const handleAttributes = async (session: string, email: string, userId: number) => {
    try {
      const attributeResponse = await axiosBase.post(`${import.meta.env.VITE_PROFILE_URL}`, { session: session, email: email, userId: userId });
      setUserAttributes(attributeResponse.data)
    } catch (err) { console.error(err); }
  }

  useEffect(() => {
    const items = encryptStorage.getItem('userDetails')!;
    if (items) {
      handleAttributes(items.session, items.email, items.userId)
    }
    invokeAttributes()
  }, []);

  return (
    <DashboardLayout>
      <section className='px-6 pt-10 md:pr-20'>

        <div className='flex flex-wrap justify-center md:justify-between items-center mb-5 gap-5'>
          <div className='flex flex-wrap justify-center items-center gap-6'>
            <div className='md:w-52 md:h-52 w-32 h-32'>
              <img src={userAttributes === undefined ? profileImg : `data:image/jpg;base64,${userAttributes?.pix[0].imageBase64}`} alt='profile picture'
                className='w-full h-full object-cover rounded-full' />
            </div>
            <div>
              <div className='flex items-center gap-3'>
                <p className='font-bold text-4xl md:text-[42px]'>{userAttributes?.firstname}</p>
                <img src={verified} alt='verified' />
              </div>
              <div className='flex items-center gap-1 mt-3'>
                <img src={caution} alt='caution information' />
                <p className='text-xl font-light'>Turn on your verification</p>
              </div>
            </div>
          </div>
          <div className='flex items-center gap-2 cursor-pointer' onClick={() => setLogout(!logout)}>
            <img src={logoutImg} alt='logout' />
            <p className='text-red font-medium'>Log out</p>
            {logout && (<Logout logout={logout} setLogout={setLogout} />)}
          </div>
        </div>

        <section>

          <div className='flex flex-wrap gap-3 items-center'>
            <h2 className='font-bold text-[33px] leading-8'>Personal information</h2>
            {attributes && userAttributes &&
              <div className='flex items-center gap-1 w-5 cursor-pointer'>
                <img src={edit} alt='edit' className='w-full' />
                <>
                  <p className='text-blue text-2xl text-medium' onClick={() => setOpenEditableProfile(!openEditableProfile)}>Edit</p>

                  <EditProfileModal open={openEditableProfile} setOpen={setOpenEditableProfile} attributes={attributes} userAttributes={userAttributes} />
                </>
              </div>
            }
          </div>

          {userAttributes && (
            <div className='flex flex-col gap-10 md:gap-0 md:flex-row mt-3 mb-8'>
              <div className='md:w-3/4 flex flex-col gap-3'>
                <div className='flex flex-wrap gap-2 items-center'>
                  <p className='lg:w-2/6 font-semibold text-xl'>About:</p>
                  <p>{userAttributes.info}</p>
                </div>
                {userAttributes.attributes.map((item: any, idx: number) => (
                  <div key={idx} className='flex flex-wrap gap-2 items-center'>
                    <p className='lg:w-2/6 font-semibold text-xl'>{item.attributeName}:</p>
                    <p>{item.attributeValue}</p>
                  </div>
                ))}
                <div className='flex flex-wrap gap-2 items-center'>
                  <p className='lg:w-2/6 font-semibold text-xl'>Location</p>
                  <p>{userAttributes.location.city}</p>
                </div>
                <div className='flex flex-wrap gap-2 items-center'>
                  <p className='lg:w-2/6 font-semibold text-xl'>Interest:</p>
                  <div className='flex gap-2 items-center flex-wrap'>
                    {userAttributes.interestedList?.map((item: any, index: number) => (
                      <p key={index}>{item}</p>
                    ))}
                  </div>
                </div>
              </div>

              <div className='md:w-1/4 flex md:flex-col justify-center items-center gap-3'>
                <div className='flex flex-wrap gap-2 justify-center'>
                  {userAttributes.pix.length < 2 ? userAttributes?.pix.map((img: any) => (
                    <img key={img.id} src={`data:image/jpg;base64,${img?.imageBase64}`} alt='profile picture' className='w-28' />
                  ))
                    :
                    <div className='flex flex-wrap gap-2 justify-center relative cursor-pointer' onClick={() => setOpenPictures(!openPictures)}>
                      {userAttributes?.pix.slice(0, 1).map((img: any) => (
                        <img key={img.id} src={`data:image/jpg;base64,${img?.imageBase64}`} alt='profile picture' className='w-28' />
                      ))}
                      <p className='text-white text-4xl font-bold absolute bottom-2 right-1'>+{userAttributes.pix.length - 1}</p>
                      {openPictures && <ShowPictures open={openPictures} setOpen={setOpenPictures} pictures={userAttributes.pix} />}
                    </div>
                  }
                </div>
                <p className='bg-tint-pink py-2 px-6 rounded-2xl text-center text-blue font-medium mt-1 cursor-pointer' onClick={() => setAddPictures(!addPictures)}>Add more pictures</p>
                {addPictures && <AddPictures open={addPictures} setOpen={setAddPictures} />}
              </div>
            </div>
          )}
        </section>
      </section>
    </DashboardLayout>
  )
}

export default EditProfile