import React, {useEffect, useState} from 'react';
import './header.scss';
import {UseTg} from '../../hooks/useTg';
import {AnimatePresence, motion} from 'framer-motion';
import {CircleUser, Loader, ShoppingCart} from 'lucide-react';
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
  }, [tg]);

  return (
    <div className='header'>
      <div className='flex justify-between items-center mx-4 my-4'>
        <button className='flex gap-2 items-center' onClick={openModal}>
          {/* {user?.first_name ? ( */}
          <>
            <CircleUser size={32} />
            <p className='font-medium italic text-lg'>Anton</p>
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
          </>
          {/* ) : (
            <div className='flex items-center gap-1'>
              <Loader className='animate-spin-slow spinner' size={34} />
              <span className='font-medium text-2xl'>💀</span>
            </div>
          )} */}
        </button>

        <div className='flex items-center gap-1'>
          <ShoppingCart size={32} />
          <span className='italic text-xl pt-6'>2</span>
        </div>
      </div>
    </div>
  );
};

export default Header;
