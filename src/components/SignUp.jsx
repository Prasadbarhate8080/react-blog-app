import React,{useState} from 'react'
import authService from '../appWrite/auth'
import {Link,useNavigate} from "react-router-dom"
import { login } from '../store/authSlice.js'
import {Button,Input,Logo} from "./index.js"
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'

function SignUp() {
const navigate = useNavigate();
const [error,setError] = useState("");
const dispatch = useDispatch();
const {register,handleSubmit} = useForm();
const [loading, setLoading] = useState(false)
const create = async(data) => {
    setError("");
   try {
    setLoading(true)
     const session = await authService.createAccount(data)
     if(session)
     {
        const userData = await authService.getCurrentUser();
        if(userData)
            dispatch(login(userData));
        navigate("/");
     }
   } catch (error) {
    setError(error.message)
   }finally{
    setLoading(false)
   }
}

  return (
    <div className="flex items-center justify-center w-[94%] mx-auto">
    <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
    <div className="mb-2 flex justify-center">
            <span className="inline-block w-full max-w-[100px]">
                <Logo width="100%" />
            </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">Sign up to create account</h2>
        <p className="mt-2 text-center text-base text-black/60">
            Already have an account?&nbsp;
            <Link
                to="/login"
                className="font-medium text-primary transition-all duration-200 hover:underline"
            >
                Sign In
            </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

        <form onSubmit={handleSubmit(create)}>
            <div className='space-y-5'>
                <Input
                label="Full Name: "
                placeholder="Enter your full name"
                className={"focus:ring focus:ring-blue-700 focus:ring-offset-1"}
                {...register("name", {
                    required: true,
                })}
                />
                <Input
                label="Email: "
                placeholder="Enter your email"
                className={"focus:ring focus:ring-blue-700 focus:ring-offset-1"}
                type="email"
                {...register("email", {
                    required: true,
                    validate: {
                        matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                        "Email address must be a valid address",
                    }
                })}
                />
                <Input
                label="Password:"
                type="password"
                className={"focus:ring focus:ring-blue-700 focus:ring-offset-1"}
                placeholder="Enter your password"
                {...register("password", {
                    required: true,})}
                />
                <Button value={"Create Account"} 
                type="submit" 
                disabled= {loading}
                loading={loading}
                className="w-full disabled:bg-gray-800 disabled:cursor-not-allowed" 
                >
                </Button>
            </div>
        </form>
    </div>

</div>
  )
}

export default SignUp
