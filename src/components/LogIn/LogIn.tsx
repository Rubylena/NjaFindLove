import LoginForm from './LoginForm';

const LogIn = () => {
  return (
    <div className='mx-5 md:mx-0 md:max-w-[441px] bg-white rounded-lg pt-5'>
        <h1 className='text-2xl font-semibold text-center'>LOG IN</h1>
          <div className='px-10 py-5 rounded-lg'>

              <LoginForm />
              <p
              className='text-center text-[10px] leading-[15px] mt-5'
              >
                  By logging into an account , you agree to our Terms and Conditions. Learn how we use your data in our Privacy Policy through link.</p>
          </div>
    </div>
  )
}

export default LogIn