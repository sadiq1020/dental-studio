import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';

const SignUp = () => {
    const { createUser, updateUser } = useContext(AuthContext);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [signUpError, setSignUPError] = useState('');

    const navigate = useNavigate();

    const handleSignUp = data => {
        // console.log(data);
        setSignUPError('');
        createUser(data.email, data.password)
            .then(result => {
                const user = result.user;
                console.log(user);
                toast.success('User Created Successfully')

                navigate('/');

                const userInfo = {
                    displayName: data.name
                }

                updateUser(userInfo)
                    .then(() => { })
                    .catch(error => console.error(error));
            })
            .catch(error => {
                console.error(error)
                setSignUPError(error.message)
            });
    }


    return (
        <div className='h-[800px] flex justify-center items-center'>
            <div className='w-96 p-7'>
                <h2 className='text-xl font-bold text-center'>Sign Up</h2>

                <form onSubmit={handleSubmit(handleSignUp)}>
                    <div className="form-control w-full max-w-xs">

                        {/* name */}
                        <label className="label"> <span className="label-text">Name</span></label>

                        <input type="text" {...register("name", { required: "Name is Required" })} className="input input-bordered w-full max-w-xs" />

                        {errors.name && <p className='text-red-600'>{errors.name.message}</p>}
                    </div>
                    <div className="form-control w-full max-w-xs">

                        {/* email */}
                        <label className="label"> <span className="label-text">Email</span></label>
                        <input type="email" {...register("email", { required: "email is required" })} className="input input-bordered w-full max-w-xs" />
                        {errors.email && <p className='text-red-600'>{errors.email.message}</p>}
                    </div>
                    <div className="form-control w-full max-w-xs">

                        {/* password */}
                        <label className="label"> <span className="label-text">Password</span></label>

                        <input type="password" {...register("password", { required: "password is required", minLength: { value: 6, message: 'Password must be 6 characters or longer' }, pattern: { value: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])/, message: 'Password must have uppercase, number and special character' } })} className="input input-bordered w-full max-w-xs" />
                        {errors.password && <p className='text-red-600'>{errors.password.message}</p>}

                    </div>
                    <input type="submit" className='btn btn-info w-full mt-6' value="Sign Up" />
                    {signUpError && <p className='text-red-600'>{signUpError}</p>}
                </form>
                <p>Already have an account? <Link className='text-secondary' to="/login">Please Log in</Link></p>
                <div className='divider'>OR</div>
                <button className='btn btn-outline w-full'>CONTINUE WITH GOOGLE</button>
            </div>
        </div>
    );
};

export default SignUp;