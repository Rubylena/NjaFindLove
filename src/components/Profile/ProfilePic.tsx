import React, { useEffect, useState } from 'react'
import Button from '../Button/Button';
import add from '../../asset/icon/add.png'
import { axiosBase } from '../../api/api';
import { FormData, Local, Picture } from '../../api/auth';
import { useNavigate } from 'react-router-dom';

const ProfilePic: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [fileMsg, setFileMsg] = useState<string>('');
  const [fileType, setFileType] = useState<string>('')
  const [images, setImages] = useState<string>();

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [userDetails, setUserDetails] = useState<Local>();
  const [moveToNext, setMoveToNext] = useState<boolean>();

  const navigate = useNavigate();

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
    setIsLoading(isLoading)
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
        setMoveToNext(response.data.success)
        setIsLoading(!isLoading)
      }
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('userDetails')!);
    if (items) {
      setUserDetails(items);
    }
    const profileCheck = () => {
      if (moveToNext) {
          navigate('/dashboard/meet')
      }
  }
  profileCheck();
  }, [moveToNext, navigate,]);

  return (
    <div className='h-full'>
      <div className='h-full mt-10'>
        <div className='text-center'>
          <h1 className='font-semibold text-2xl'>UPLOAD PICTURE</h1>
          <p className='text-p-text'>Upload a profile picture to increase your chance of finding a match</p>
        </div>
        <form onSubmit={handleSubmit} >
          <div className='md:flex justify-center m-auto max-w-fit h-56 md:w-full my-10'>
            <div>
              <label htmlFor="picture" className='rounded-full bg-input-bg flex justify-center'>
                {file ?
                  <img src={images} alt="profile"
                    className='rounded-full object-cover w-60 h-60' />
                  :
                  <img src={add} alt="add" className='p-20 md:p-24' />
                }
              </label>
              <input type="file" onChange={handleChange} id='picture' className='sr-only' />
            </div>
          </div>
          <div className='flex  gap-3 justify-center'>
            <p className='text-red text-xs pb-2'>{fileMsg ? fileMsg : null}</p>
            <p className='text-red text-xs pb-2'>{fileType ? fileType : null}</p>
          </div>
          <div className='w-2/4 md:w-1/4 m-auto'>
            <Button
              text='Next'
              bg='bg-purple'
              spin={isLoading ? 'block animate-spin w-4 h-4' : 'hidden'}
              textColor='text-white'
            />
          </div>
        </form>
      </div>
    </div>
  )
}

export default ProfilePic
