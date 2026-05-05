import React from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

function ResetPasswordPage() {

  const { token } = useParams();
  const navigate= useNavigate();

  const [password, setPassword] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  async function handleSubmit(e){
    e.preventDefault();

    if(!password){
      setMessage("Please enter new password");
      return;
    }

    try{
      setLoading(true);

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/forgotten`,
        {
          type: "resetPassword",
          token: token,
          newPassword: password
        }
      );

      setMessage(response.data.message);
      setPassword('');
      if(response.data.success){
        navigate('/login')
      }

    }catch(error){
      setMessage(error.response?.data?.message || "Something went wrong");
    }finally{
      setLoading(false);
    }
  }

  return (
    <div className='container mt-5'>

      <h2 className='mb-3'>Reset Password</h2>

      <form onSubmit={handleSubmit}>

        <input 
          type='password'
          placeholder='Enter new password'
          value={password}
          onChange={(e)=> setPassword(e.target.value)}
          className='form-control mb-3'
        />

        <button 
          type='submit'
          className='btn btn-success'
          disabled={loading}
        >
          {loading ? "Updating..." : "Update Password"}
        </button>

      </form>

      {message && (
        <p className='mt-3 text-info'>
          {message}
        </p>
      )}

    </div>
  )
}

export default ResetPasswordPage