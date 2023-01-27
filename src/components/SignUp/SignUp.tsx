import SignUpForm from './SignUpForm'

const SignUp = () => {
  return (
    <div className='text-purple mx-5 md:mx-0 flex flex-col h-full md:w-full justify-center items-center'>
        <h1 className='text-2xl font-semibold text-center'>Sign Up</h1>
        <p className='text-center'>for free online dating</p>
        <div className='bg-purple text-white px-10 pt-10 pb-5 rounded-lg md:max-w-[441px]'>
            <p className='text-center'>Meet and create memories with new people near you</p>
            <SignUpForm />
            <p
            className='text-center text-[10px] leading-[15px] mt-5'
            >By creating an account , you agree to our Terms and Conditions. Learn how we use your data in our Privacy Policy through link.</p>
        </div>
    </div>
  )
}

export default SignUp