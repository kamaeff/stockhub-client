import React, {useEffect} from 'react';
import './main.scss';
import {UseTg} from '../../hooks/useTg';
import {Loader, Search, SlidersHorizontal} from 'lucide-react';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';
import {setUser} from '../../store/user/user.slice';
import {RootState} from '../../store/store';

const Main = () => {
  const {tg, chat_id} = UseTg();
  const dispatch = useDispatch();
  const userData = useSelector((state: RootState) => state.user.user);

  useEffect(() => {
    tg.ready();
    tg.expand();
    const userReq = async (chat_id: string) => {
      if (chat_id !== undefined) {
        try {
          const userFetch = await axios.post(
            `http://94.228.124.88:4200/api/user/get`,
            {chat_id},
            {
              headers: {'Content-Type': 'application/json'},
            }
          );
          // console.log('userFetch data:', userFetch.data);
          dispatch(setUser(userFetch.data));
        } catch (err) {
          console.log(err);
        }
      } else {
        console.log('skip');
      }
    };
    userReq(chat_id?.toString());
  }, [tg, dispatch, chat_id]);

  return (
    <div className='main'>
      <div className='main__search flex gap-2 justify-center items-center'>
        <div className='main__search--input flex gap-1.5 p-3.5'>
          <Search size={28} />
          <input
            className='main__search--input_text w-62 text-xl outline-none'
            placeholder='Поиск'
          ></input>
        </div>
        {/* TODO: Скорее всего будет button */}
        <a href='none' className='main__search--filter p-3.5'>
          <SlidersHorizontal size={28} />
        </a>
      </div>

      <div className='gap-2 ps-4 pt-3'>
        <h2 className='text-xl font-medium'>User stats:</h2>
        <p className='flex items-center gap-2'>
          user:{' '}
          {chat_id !== undefined ? (
            chat_id
          ) : (
            <>
              <Loader className='animate-spin-slow spinner' size={20} />
            </>
          )}
        </p>
        {userData ? (
          Object.entries(userData).map(([key, value]) => (
            <p key={key}>
              {key.charAt(0).toUpperCase() + key.slice(1)}:{' '}
              {value === 'none' ? 'Данные не заполнены' : value}
            </p>
          ))
        ) : (
          <div className='flex items-center'>
            <Loader className='animate-spin-slow spinner' size={32} />
            <span className='text-lg'>Loading</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Main;
