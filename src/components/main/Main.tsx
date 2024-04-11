import {Footprints, Search, Shirt, SlidersHorizontal} from 'lucide-react';
import {Carousel} from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

import {useState} from 'react';
import {AnimatePresence, motion} from 'framer-motion';

import './main.scss';

import {images} from '../../assets/imagesAssets';
import Filter from './components/Filter/Filter';
import Shooes from './components/ShooesComponent/Shoes';
import Cloth from './components/ClothComponent/Cloth';
import {UseTg} from '../../hooks/useTg';

const Main = () => {
  const {user} = UseTg();
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const [selectedButton, setSelectedButton] = useState<string | null>('shoes');

  const openFilter = () => {
    setIsFilterOpen(true);
    document.body.classList.add('modal-open');
  };

  const closeClose = () => {
    setIsFilterOpen(false);
    document.body.classList.remove('modal-open');
  };

  const items = Array.from({length: 3}).map((_, index) => (
    <div key={index}>
      <img className='main__carousel--item' src={images.slide} alt='product' />
    </div>
  ));

  return (
    <div className='main'>
      {/* {user?.id ? (
        <> */}
      <section className='main__search'>
        <div className='main__search--input'>
          <Search size={28} />
          <input
            className='main__search--input_text'
            placeholder='Поиск'
          ></input>
        </div>
        <button className='main__search--filter' onClick={openFilter}>
          <SlidersHorizontal size={28} />
        </button>
      </section>

      <div className='main__btn'>
        <button
          className={`main__btn-item ${
            selectedButton === 'clothing' ? 'active' : ''
          }`}
          onClick={() => setSelectedButton('clothing')}
        >
          <Shirt size={30} />
          Одежда
        </button>

        <button
          className={`main__btn-item ${
            selectedButton === 'shoes' ? 'active' : ''
          }`}
          onClick={() => setSelectedButton('shoes')}
        >
          <Footprints />
          Обувь
        </button>
      </div>

      <section className='main__sections'>
        <div className='main__carousel'>
          <Carousel
            infiniteLoop={true}
            autoPlay={true}
            interval={5000}
            showThumbs={false}
          >
            {items}
          </Carousel>
        </div>
      </section>

      {selectedButton === 'clothing' && <Cloth />}

      {selectedButton === 'shoes' && <Shooes />}

      <AnimatePresence>
        {isFilterOpen && (
          <motion.div
            initial={{opacity: 0, y: 1000}}
            animate={{opacity: 1, y: 0}}
            exit={{opacity: 0, y: 1000}}
            transition={{duration: 0.5}}
            className='modal'
          >
            <Filter closeModal={closeClose} />
          </motion.div>
        )}
      </AnimatePresence>
      {/* </>
      ) : (
        <>
          <div className='main__load'>
            <a
              className='main__load--link'
              href='https://t.me/yokross_bot'
              target='_blank'
              rel='noopener noreferrer'
            >
              <img src={images.qr} alt='qr' width={560} height={560} />
            </a>
            <p>💀 Данная версия доступна только в телеграме</p>
          </div>
        </>
      )} */}
    </div>
  );
};

export default Main;
