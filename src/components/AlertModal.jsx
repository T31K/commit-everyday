import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

function AlertModal({ openModal, setOpenModal }) {
  const [inputData, setInputData] = useState('');

  const submitForm = () => {
    window.location.href = `/${inputData}`;
  };

  return (
    <AlertDialog
      open={openModal}
      onOpenChange={setOpenModal}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Enter username</AlertDialogTitle>
          <AlertDialogDescription>
            <Input
              type="text"
              value={inputData} // Connect the value prop to the state
              onChange={(e) => setInputData(e.target.value)}
            />
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Button onClick={submitForm}>Go</Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default AlertModal;
