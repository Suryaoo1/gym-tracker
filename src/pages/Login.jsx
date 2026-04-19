import React, { useState } from 'react'
import { apiRequest } from '../api/client';

const Login = () => {
   const [form, setForm] = useState({email : "", password : ""});

   const handleCheck = (e) => {
        const {name, value} = e.target
        setForm(prevVal => ({
            ...prevVal, 
            [name] : value
        }))
   }

   const handleSubmit = async(e) => {
    e.preventDefault();
    setForm("");
    try{
        const data = await apiRequest("/login", "POST", form);
        localStorage.setItem("token", data.token);
    } 
    catch(err){
        console.log(err.message);       
    }
   }

  return (
    <div className='min-h-screen flex items-center justify-center bg-purple-100'>
      <form onSubmit={handleSubmit} className="bg-white p-10 shadow-xl rounded-2xl min-w-sm w-100">
        <h2 className='text-2xl font-bold text-center mb-6'>
          Login
        </h2>

        {/* Email */}
        <div>
            <label className="block text-sm font-medium mb-1">Email </label>
            <input 
            type="email" 
            name='email' 
            value={form.email} //controlled input 
            onChange={handleCheck}
            placeholder='Enter your email'
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-300" />
        </div>

        {/* Password */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-1">
            Password
          </label>
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={handleCheck}
            placeholder="Enter your password"
            autoComplete="current-password"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-300"
          />
        </div>

        {/* Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-500 transition">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login