import './main.scss';

import {Search, SlidersHorizontal} from 'lucide-react';

const Main = () => {
  return (
    <div className='main'>
      <div className='main__search flex gap-2 justify-center items-center'>
        <div className='main__search--input flex gap-1.5 p-3.5'>
          <Search size={28} />
          <input
            className='main__search--input_text italic w-62 text-xl outline-none'
            placeholder='Поиск'
          ></input>
        </div>
        {/* TODO: Скорее всего будет button */}
        <button className='main__search--filter p-3.5'>
          <SlidersHorizontal size={28} />
        </button>
      </div>
    </div>
  );
};

export default Main;
