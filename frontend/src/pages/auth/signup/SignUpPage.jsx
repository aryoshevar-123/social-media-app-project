import { Link } from 'react-router-dom'
import { useState } from 'react'

import SocialyFullLogoSvg from '../../../components/svgs/SocialyFullLogo';

import { MdEmail } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { FaKey } from "react-icons/fa";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { useMutation } from '@tanstack/react-query';
import { FaRegEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";

import toast from 'react-hot-toast';

const SignUpPage = () => {
    const [formData, setFormData] = useState({
        email: "",
        username: "",
        fullName: "",
        password: "",
    });
    const [emailError, setEmailError] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const { 
        mutate:signUp, 
        isError, 
        isPending, 
        error 
    } = useMutation({
        mutationFn: async({ email, username, fullName, password }) => {
            try {
                const res = await fetch("/api/auth/signup", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ email, username, fullName, password }),
                });

                const data = await res.json();
                if (!res.ok) throw new Error(data.error || "Failed to create account");
                console.log(data);
                return data; 
            } catch (error) {
                console.error(error);
                throw error;
            }
        },
        onSuccess: () => {
            toast.success("Account created successfully");
        },
    });

    const validateEmail = (emailValue) => {
        if(!emailValue) {
            setEmailError("");
        }
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(emailValue)) {
            setEmailError("Email format is incorrect");
        }
        else {
            setEmailError("");
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault(); 
        signUp(formData)
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        if (name === "email") {
            validateEmail(value);
        }
    };
  
    return (
        <div className='max-w-screen-xl mx-auto flex h-screen px-10'>
            <div className='flex-1 hidden lg:flex items-center justify-center'>
                <SocialyFullLogoSvg className='lg:w-3/3 font-black dark:fill-white' />
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
                    <div>
                        <label className={`input input-bordered rounded flex items-center gap-2 ${emailError ? 'input-error border-red-500' : ''}`}>
                            <MdEmail className={emailError ? 'text-red-500' : ''}/>
                            <input 
                                type="text"
                                className='grow'
                                placeholder='Email'
                                name='email'
                                onChange={handleInputChange}
                                value={formData.email}
                            />
                        </label>
                        {emailError && (
                            <span className="text-red-500 text-xs pl-1 transition-all duration-200 animate-fadeIn">
                                {emailError}
                            </span>
                        )}
                    </div>
                    
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
                            type={showPassword ? "text" : "password"}
                            className='grow'
                            placeholder='Password'
                            name='password'
                            onChange={handleInputChange}
                            value={formData.password}
                        />
                        <div 
                            className="absolute right-3 cursor-pointer text-slate-500 hover:text-slate-300 transition-colors duration-200"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <FaRegEye className="w-5 h-5" /> : <FaRegEyeSlash className="w-5 h-5" />}
                        </div>
                    </label>
                    <button className='btn rounded-full btn-primary text-white'>
                        {isPending ? "Loading..." : "Sign Up"}
                    </button>
                    {isError && <p className='text-red-500'>{error.message}</p>}
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