import { useState } from 'react';
import Container from '../components/Container';
import FriendInfo from '../components/FriendInfo';
import AmountInput from '../components/AmountInput';
import Button from '../components/Button';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';

const Send = () => {
  // Add this state for amount
  const [searchParams]=useSearchParams();
  const id=searchParams.get("id");
  const name=searchParams.get("name");
  const [amount, setAmount] = useState('');
  const [isLoading,setIsLoading]=useState(false);
  const navigate=useNavigate();

  const handleTransfer = async () => {
  if (!amount || amount <= 0) {
    alert('Please enter a valid amount');
    return;
  }

  setIsLoading(true);

  try {
    const token = localStorage.getItem('token');
    
    const response = await axios.post("http://localhost:8081/api/v1/account/transfer", {
      to: id,
      amount: parseFloat(amount)
    }, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    alert(`Successfully sent $${amount} to ${name}!`);
    navigate('/dashboard'); // This will refresh the balance

  } catch (error) {
    console.error('Transfer error:', error);
    
    // Handle specific error messages from your backend
    if (error.response?.data?.message) {
      alert(error.response.data.message); // Shows "Insufficient Balance" or "Invalid Account"
    } else {
      alert('Transfer failed. Please try again.');
    }
  } finally {
    setIsLoading(false);
  }
};

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <Container>
        <h1 className="text-2xl font-bold text-center mb-6">Send Money</h1>
        
        <FriendInfo name={name} initial={name[0]} />
        
        <AmountInput 
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        
        <Button 
          label="Initiate Transfer"
          onClick={handleTransfer}
        />
      </Container>
    </div>
  );
};

export default Send;