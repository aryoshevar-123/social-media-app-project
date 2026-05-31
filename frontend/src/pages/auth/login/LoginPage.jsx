import { useState } from 'react'
import { Link } from 'react-router-dom';

import { FaKey } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  // const { mutate, isError, isPending, error } = useMutation;

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const isError = false;

  return (
    <div className='max-w-screen-xl mx-auto flex h-screen px-10'>
      <div className='flex-1 flex flex-col justify-center items-center'>
        <form className='lg:w-2/3 mx-auto md:mx-20 flex gap-4 flex-col items-center' onSubmit=
          {handleSubmit}>
              <h1 className='lg:text-6xl text-4xl font-bold dark:text-white'>Happening now.</h1>
              <label className='input input-bordered w-full rounded flex items-center gap-2'>
                  <FaRegUser/>
                  <input 
                      type="text"
                      className='grow'
                      placeholder='Username'
                      name='username'
                      onChange={handleInputChange}
                      value={formData.username}
                  />
              </label>
              <label className='input input-bordered w-full rounded flex items-center gap-2'>
                  <FaKey/>
                  <input 
                      type="password"
                      className='grow'
                      placeholder='Password'
                      name='password'
                      onChange={handleInputChange}
                      value={formData.password}
                  />
              </label>
              <button className='btn rounded-full w-full btn-primary text-white'>Sign In</button>
              {isError && <p className='text-red-500'>Something went wrong</p>}
          </form>
          <div className="divider">Don't have an account?</div>
          <div className='flex flex-col lg:w-2/3 gap-2 mt-4'>
              <Link to='/signup'>
                  <button className='btn rounded-full btn-primary btn-outline
                  w-full'>
                      Sign Up
                  </button>
              </Link>
          </div>
      </div>
      <div className='flex-1 hidden lg:flex items-center justify-center'>
        <h1 className='text-8xl font-extrabold dark:text-white'>FAKE TWITTER</h1>
      </div>
    </div>
  )
}

export default LoginPage