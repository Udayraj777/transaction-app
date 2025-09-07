import { useEffect, useState } from 'react';
import Button from './Button';  
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UsersList = () => {
  // Sample users data - you can replace this with real data later
  const [users,setUsers]=useState([]);
  const [filter,setFilter]=useState("");
  
  useEffect(() => {
  const token = localStorage.getItem('token');
  
  axios.get("http://localhost:8081/api/v1/user/bulk?filter="+filter, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
  .then(response => {
    setUsers(response.data.users); // Fixed: users instead of user
  })
  .catch(error => {
    console.error('Error fetching users:', error);
  });
}, [filter])

  return <>
  <div className='font-bold mt-6 text-lg px-6 py-4'>
    Users
  </div>
  <div className='my-2 px-6 py-4'>
    <input onChange={(e)=>{
        setFilter(e.target.value)
    }} type='text' placeholder='search users...' className='w-full px-2 py-1 rounded border-slate-2000'></input>
  </div>
  <div className='px-6 py-4'>
  {users.map(user => <User key={user._id} user={user} />)}
</div>
  </>
};

export default UsersList;

function User({user}){
  const navigate = useNavigate();
    return <div className='flex justify-between'>
        <div className="flex">
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                <div className="flex flex-col justify-center h-full text-xl">
                    {user.firstName[0]}
                </div>
            </div>
            <div className="flex flex-col justify-center h-ful">
                <div>
                    {user.firstName} {user.lastName}
                </div>
            </div>
        </div>

        <div className="flex flex-col justify-center h-ful">
            <Button label={"Send Money"} onClick={()=>{
              navigate("/send?id=" + user._id + "&name=" + user.firstName);
            }}/>
        </div>
    </div>
}