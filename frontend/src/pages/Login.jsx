import React from 'react'
import FormInput from '../components/FormInput';

const Login = () => {
  document.title="Login";
  return (
    <div className="min-h-screen flex justify-center py-36 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold ">Login</h2>
                </div>
                <form className="mt-8 space-y-6" action="/" method="POST">
                    <input type="hidden" name="remember" value="true" />
                    <div className="rounded-md shadow -space-y-px shadow-gray-400 dark:shadow-black">
                        
                        <FormInput name="email" type="email" placeholder="Email ID"/>                        
                        <FormInput name="password" type="password" placeholder="Password"/>                       
                    </div>

                    <div>
                        <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-slate-700 dark:hover:bg-slate-500  hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
  )
}

export default Login