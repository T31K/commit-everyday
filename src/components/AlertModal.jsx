import axios from 'axios'
import { toast } from 'sonner';


import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import Share from './slides/Share';
import {
  IconCircleX
} from '@tabler/icons-react';

function AlertModal({ openModal, setOpenModal, stats, pathname, levelData }) {
  const [inputData, setInputData] = useState('');
  const [enableGlow, setEnableGlow] = useState(false);

const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(process.env.NEXT_PUBLIC_ADD_USER_URL, {
        premium: false,
        name: pathname?.slice(1),
        total: stats?.total,
        streak: stats?.streak,
        mostActiveDay: stats?.mostActiveDay,
        rank: stats.rank,
        median: stats.median,
        missedDays: stats.missedDays,
        image:levelData?.image
      });
      if (res.status === 200) {
        toast("User added, redirecting..");
        setTimeout(() => {
          window.location.href ="/"
        }, 2000);
      } else if (res.status == 204) {
        toast("User already added!");
      }
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  return (
    <AlertDialog
      open={openModal}
      onOpenChange={setOpenModal}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className='flex justify-between'>Add your card to the wall of fame?
            <IconCircleX size={24} color="black" onClick={() => setOpenModal(false)} />
          </AlertDialogTitle>
          <div className="w-80 mx-auto py-6">
          <Share
            stats={stats}
            username={pathname}
            levelData={levelData}
            origin='modal'
            enableGlow={enableGlow}
          />
          </div>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Button onClick={handleSubmit} className='rounded-xl bg-rainbow'>Add Card To Hall of Fame</Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default AlertModal;
