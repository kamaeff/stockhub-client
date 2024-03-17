import React, {useEffect, useState} from 'react';
import './header.scss';
import {UseTg} from '../../hooks/useTg';
import {AnimatePresence, motion} from 'framer-motion';
import {CircleUser, Loader, PackageOpen} from 'lucide-react';
import Profile from './components/Profile';

const Header = () => {
  const {user, tg} = UseTg();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    tg.ready();
    tg.expand();
  }, [tg, user]);

  return (
    <div className='header'>
      <div className='flex justify-between items-center mx-4 my-4'>
        {user?.first_name ? (
          <button className='flex gap-2 items-center' onClick={openModal}>
            <CircleUser strokeWidth={1} size={32} />
            {user?.first_name}
          </button>
        ) : (
          <div className='flex items-center gap-1 header__bg-item'>
            <Loader className='animate-spin-slow spinner' size={34} />
            <span className='font-medium text-2xl'>💀</span>
          </div>
        )}

        <div className='flex items-center'>
          <PackageOpen size={32} strokeWidth={1} />
          <span className='italic text-xl pt-6'>2</span>
        </div>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{opacity: 0, y: 1000}}
            animate={{opacity: 1, y: 0}}
            exit={{opacity: 0, y: 1000}}
            transition={{duration: 0.5}}
            className='fixed inset-0 modal'
          >
            <Profile closeModal={closeModal} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Header;
