import { useState } from 'react';
import Container from '../components/Container';
import FriendInfo from '../components/FriendInfo';
import AmountInput from '../components/AmountInput';
import Button from '../components/Button';

const Send = () => {
  // Add this state for amount
  const [amount, setAmount] = useState('');

  const handleTransfer = () => {
    console.log('Transfer amount:', amount);
    // Add transfer logic later
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <Container>
        <h1 className="text-2xl font-bold text-center mb-6">Send Money</h1>
        
        <FriendInfo name="Friend's Name" initial="A" />
        
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