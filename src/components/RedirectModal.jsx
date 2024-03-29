import axios from 'axios';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import {
  IconCircleX
} from '@tabler/icons-react';

function RedirectModal({ openModal, setOpenModal }) {
  const [inputData, setInputData] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const validateUsername = async (username) => {
    try {
      const response = await axios.get(`https://api.github.com/users/${username}`);
      if (response.status === 200) {
        window.location.href = `/${username}`;
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setErrorMessage('Invalid username');
      } else {
        setErrorMessage('An error occurred while validating the username.');
      }
    }
  };

  const submitForm = () => {
    setErrorMessage('');
    validateUsername(inputData);
  };

  return (
    <AlertDialog
      open={openModal}
      onOpenChange={setOpenModal}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle></AlertDialogTitle>
          <AlertDialogDescription>
            <AlertDialogTitle className='flex justify-between'>
            <div className='text-black mb-3'>Enter Github username</div>
            <IconCircleX size={24} color="black" onClick={() => setOpenModal(false)} />
          </AlertDialogTitle>
            <Input
              type="text"
              value={inputData}
              onChange={(e) => setInputData(e.target.value)}
            />
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className='flex items-center gap-2'>
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
          <button className="rounded-full bg-gray-200 px-4 py-2  hover:bg-gray-400"  onClick={submitForm}>Go!</button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default RedirectModal;
