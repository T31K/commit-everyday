'use client';
import axios from 'axios';
import Card from '@/components/card/Card';
import TopNav from '@/components/navs/TopNav';
import { useState, useEffect } from 'react';
function HomePage() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(process.env.NEXT_PUBLIC_GET_ALL_USERS_URL, {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_AUTH_TOKEN}`,
          },
        });

        setUserData(res.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div
      id="home"
      className="container mx-auto px-4 sm:px-6 lg:px-8 py-12"
    >
      <TopNav />
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {userData
          ?.sort((a, b) => a.id - b.id)
          ?.map((user, userIndex) => (
            <Card
              key={userIndex}
              userData={user}
            />
          ))}
      </div>
    </div>
  );
}

export default HomePage;
