import { Link } from 'react-router-dom'
import { useState } from 'react'

import { MdEmail } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { FaKey } from "react-icons/fa";
import { MdDriveFileRenameOutline } from "react-icons/md";

const SignUpPage = () => {
    const [formData, setFormData] = useState({
        email: "",
        username: "",
        fullName: "",
        password: "",
    });

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
            <div className='flex-1 hidden lg:flex items-center justify-center'>
                <h1 className='text-6xl font-extrabold dark:text-white'>FAKE TWITTER</h1>
            </div>
            <div className='flex-1 flex flex-col justify-center items-center'>
                <form className='lg:w-2/3 mx-auto md:mx-20 flex gap-4 flex-col' onSubmit=
                {handleSubmit}>
                    <h1 className='text-4xl font-bold dark:text-white'>Join today.</h1>
                    <label className="input input-bordered rounded flex items-center gap-2">
                        <FaRegUser />
                        <input 
                            type="text" 
                            className="grow" 
                            placeholder="Username" 
                            name='username'
                            onChange={handleInputChange}
                            value={formData.username}
                        />
                    </label>
                    <label className='input input-bordered rounded flex items-center gap-2'>
                        <MdEmail/>
                        <input 
                            type="email"
                            className='grow'
                            placeholder='Email'
                            name='email'
                            onChange={handleInputChange}
                            value={formData.email}
                        />
                    </label>
                    <label className='input input-bordered rounded flex items-center gap-2'>
                        <MdDriveFileRenameOutline />
                        <input 
                            type="text"
                            className='grow'
                            placeholder='Full Name'
                            name='fullName'
                            onChange={handleInputChange}
                            value={formData.fullName}
                        />
                    </label>
                    <label className='input input-bordered rounded flex items-center gap-2'>
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
                    <button className='btn rounded-full btn-primary text-white'>Sign Up</button>
                    {isError && <p className='text-red-500'>Something went wrong</p>}
                </form>
                <div className="divider">Already have account?</div>
                <div className='flex flex-col lg:w-2/3 gap-2 mt-4'>
                    <Link to='/login'>
                        <button className='btn rounded-full btn-primary btn-outline
                        w-full'>
                            Sign in
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default SignUpPage