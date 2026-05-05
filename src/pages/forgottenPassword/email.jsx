import React from 'react'
import axios from 'axios'

function ForgottenEmail() {

    const [email, setEmail] = React.useState('')
    const [message, setMessage] = React.useState('')
    const [loading, setLoading] = React.useState(false)

    async function EmailEnter(e){
        e.preventDefault();

        if(!email){
            setMessage("Please enter email");
            return;
        }

        try{
            setLoading(true);

            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/forgotten`,
                {
                    email: email,
                    type: "sendEmail"
                }
            );

            setMessage(response.data.message);
            setEmail('');

        }catch(error){
            setMessage(error.response?.data?.message || "Something went wrong");
        }finally{
            setLoading(false);
        }
    }

    return (
        <form onSubmit={EmailEnter} className='container mt-5'>

            <h2 className='mb-3'>Forgot Password</h2>

            <input 
                type='email' 
                placeholder='Enter email' 
                value={email} 
                onChange={(e)=> setEmail(e.target.value)} 
                className='form-control mb-3'
            />

            <button 
                type="submit"
                className='btn btn-primary'
                disabled={loading}
            >
                {loading ? "Sending..." : "Send Reset Link"}
            </button>

            {message && (
                <p className='mt-3 text-info'>
                    {message}
                </p>
            )}

        </form>
    )
}

export default ForgottenEmail