import { useState,useEffect } from "react";
import axios from 'axios'
const BalanceCard = () => {

  const [balance,setBalance]=useState("");

  useEffect(() => {
  const token = localStorage.getItem('token');
  
  axios.get("http://localhost:8081/api/v1/account/balance", {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
  .then(response => {
    setBalance(response.data.balance);
  })
  .catch(error => {
    console.error('Error fetching balance:', error);
  });
}, []);

  return (
    <div className="px-6 py-4">
      <div className="flex items-center gap-4">
        <span className="text-xl font-semibold text-gray-900">Your Balance</span>
        <span className="text-xl font-bold text-gray-900">${balance}</span>
      </div>
    </div>
  );
};

export default BalanceCard;