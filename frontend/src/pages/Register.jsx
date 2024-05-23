import React from 'react'
import FormInput from '../components/FormInput';

const Register = () => {
  document.title="Register";
  return (
    <div className="min-h-screen flex justify-center py-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold ">Register</h2>
                </div>
                <form className="mt-8 space-y-6" action="/" method="POST">
                    <input type="hidden" name="remember" value="true" />
                    <div className="rounded-md shadow -space-y-px shadow-gray-400 dark:shadow-black">
                        <FormInput name="firstName" type="text" placeholder="First Name"/>
                        <FormInput name="lastName" type="text" placeholder="Last Name"/>
                        <FormInput name="email" type="email" placeholder="Email ID"/>
                        <FormInput name="phone" type="number" placeholder="Phone No."/>
                        <FormInput name="username" type="text" placeholder="Username"/>
                        {/* <FormInput name="gender" type="text" placeholder="Gender"/> */}
                        <div>
                            <label htmlFor="gender" className="sr-only">Role</label>
                            <select id="gender" name="gender" className="bg-blue-100 dark:bg-white appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm" placeholder="Select Gender">
                              <option value="">Select Gender...</option>
                              <option value="Male">Male</option>
                              <option value="Female">Female</option>
                              <option value="Others">Others</option>
                            </select>
                        </div>
                        <FormInput name="password" type="password" placeholder="Password"/>
                        <FormInput name="confPassword" type="text" placeholder="Confirm Password"/>                        
                    </div>

                    <div>
                        <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-slate-700 dark:hover:bg-slate-500  hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                            Register
                        </button>
                    </div>
                </form>
            </div>
        </div>
  )
}

export default Register