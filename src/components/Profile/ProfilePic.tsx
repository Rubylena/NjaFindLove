import React, { useEffect, useState } from 'react'
import Button from '../Button/Button';
import add from '../../asset/icon/add.png'
import { axiosBase } from '../../api/api';
import { Local, Picture } from '../../api/auth';

// interface Image {
//   id: number;
//   url: string;
// }

const ProfilePic: React.FC = () => {
  const [file, setFile] = useState<File | null>();
  const [file2, setFile2] = useState<File>();

  const [images, setImages] = useState<string>();
  const [images2, setImages2] = useState<string>();

  const [completeFile, setCompleteFile] = useState<string[]>([ ])

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [userDetails, setUserDetails] = useState<Local>();

  const [formData, setFormData] = useState<Picture>({
    session: '',
    email: '',
    imageBase64: ''
  })
  
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    setFile(event.target.files?.[0]);

    const reader = new FileReader();
    reader.onload = () => {
      const img = reader.result as string
      setImages(img);
      setFormData({...formData, session: userDetails!.session, email: userDetails!.email, imageBase64: img});
      setCompleteFile([...completeFile, img]);
    };
    reader.readAsDataURL(event.target.files?.[0]!);

    // setFormData({...formData, session: userDetails!.session, email: userDetails!.email, imageBase64: completeFile[0]});
  };
  
  const handleChange2 = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    setFile2(event.target.files?.[0]);

    const reader = new FileReader();
    reader.onload = () => {
      const img = reader.result as string
      setImages2(img);
      // setImages2((prevImages) => [
      //   ...prevImages,
      //   {
      //     id: prevImages.length + 1,
      //     url: reader.result as string,
      //   },
      // ]);
      setCompleteFile([...completeFile, img]);
    };
    reader.readAsDataURL(event.target.files?.[0]!);
  };

const handleSubmit = async (event: React.FormEvent<HTMLFormElement>)=>{
  setIsLoading(!isLoading)
  event.preventDefault();
  try {
      const response = await axiosBase.post<FormData>('/Profile/AddPicture', formData);
      console.log(formData)
      console.log(response.data)
      setIsLoading(isLoading)
  } catch (err) {
      console.error(err);
  }
}

useEffect(() => {
  const items = JSON.parse(localStorage.getItem('userDetails')!);
  if(items) {
      setUserDetails(items);
  }
}, []);

  return (
    <div className='h-full'>
      <div className='h-full'>
        <div className='text-center'>
          <h1>UPLOAD PICTURE</h1>
          <p>Upload 2 profile pictures to increase your chance of finding a match</p>
        </div>
        <form onSubmit={handleSubmit} >
          <div className='md:flex justify-center m-auto max-w-fit h-56 md:w-full my-10'>
            <div>
              <label htmlFor="picture" className='rounded-full bg-input-bg flex justify-center'>
                {file ?
                  <img src={images} alt="profile" 
                  className='rounded-full object-cover p-20' />
                  :
                  <img src={add} alt="add" className='p-20 md:p-24' />
                }
              </label>
              <input type="file" onChange={handleChange} id='picture' className='sr-only' />
              {/* {file && <p>{file.name}</p>} */}
            </div>
            {/* <div>
              <label htmlFor="picture2" className='rounded-full bg-input-bg flex justify-center'>
                {file2 ? 
                    // images2.map((imagery) => (
                    //   <img key={imagery.id} src={imagery.url} alt="profile" 
                    //   className='rounded-full w-48 h-48 object-cover' />
                    // ))
                    <img src={images2} alt="profile" 
                    className='rounded-full w-52 h-52 object-cover' />
                    :
                    <img src={add} alt="add" className='p-24' />
                }
              </label>
              <input type="file" onChange={handleChange2} id='picture2' className='sr-only' />
              {file2 && <p>{file2.name}</p>}
            </div> */}
          </div>
          <div className='w-2/4 md:w-1/4 m-auto'>
                <Button
                text='Next'
                bg='bg-purple'
                spin={isLoading? 'block animate-spin w-4 h-4' : 'hidden'}
                textColor='text-white'
                />
          </div>
        </form>
      </div>
    </div>
  )
}

export default ProfilePic
