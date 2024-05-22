import {Footprints, Loader, Search, Shirt, SlidersHorizontal, X} from 'lucide-react';
import {Carousel} from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

import React, {useEffect, useState} from 'react';
import {AnimatePresence, motion} from 'framer-motion';

import './main.scss';

import {images} from '../../assets/imagesAssets';
import Filter from './components/Filter/Filter';
import {Filters, ProductReceive} from '../../types/types';
import {FetchFilters} from '../../hooks/fetchFilters';
import Cloth from './components/ClothComponent/Cloth';
import Shoes from './components/ShooesComponent/Shoes';

const Main = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // NOTE: DEFAULT OPEN STATE
  const [selectedButton, setSelectedButton] = useState<string | null>('shoe');

  // NOTE: FILTERS_DATA
  const [appliedFilters, setAppliedFilters] = useState<Filters | null>(null);
  const [data, setData] = useState<ProductReceive | []>([]);

  // NOTE: PRODUCT_DATA
  const [productData, setProductData] = useState<ProductReceive | []>([]);
  const [isLoading, setIsLoading] = useState(true);

  const openFilter = () => {
    setIsFilterOpen(true);
    document.body.classList.add('modal-open');
  };

  const closeClose = () => {
    setIsFilterOpen(false);
    document.body.classList.remove('modal-open');
  };

  const applyFilters = (filters: Filters) => {
    setAppliedFilters(filters);
    if (filters.var === 'cloth') {
      setSelectedButton('cloth');
    } else if (filters.var === 'shoe') {
      setSelectedButton('shoe');
    } else {
      setSelectedButton(null);
    }
  };

  const removeFilter = (keyToRemove: keyof Filters) => {
    if (!appliedFilters) return;
    const updatedFilters = {...appliedFilters};
    delete updatedFilters[keyToRemove];
    setAppliedFilters(updatedFilters);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedButton(category);
    setAppliedFilters(null);
  };

  useEffect(() => {
    setIsLoading(true);
    if (appliedFilters !== null) {
      FetchFilters(selectedButton, appliedFilters, (data) => {
        setProductData(data);
        setIsLoading(false);
      });
      console.log(productData);
    } else {
      FetchFilters(selectedButton, {}, (data) => {
        setProductData(data);
        setIsLoading(false);
      });
      console.log(productData);
    }


  }, [selectedButton, appliedFilters, setProductData]);

  const items = Array.from({length: 3}).map((_, index) => (
    <div key={index}>
      <img className="main__carousel--item" src={images.slide} alt="product" />
    </div>
  ));

  return (
    <div className="main">
      <section className="main__search">
        <div className="main__search_container">
          <div className="main__search_container--input">
            <Search size={28} />
            <input
              className="main__search_container--input_text"
              placeholder="Поиск"
            ></input>
          </div>
          <button
            className="main__search_container--filter"
            onClick={openFilter}
          >
            <SlidersHorizontal size={28} />
          </button>
        </div>

        <div className="">
          {appliedFilters && (
            <div className="main__search_filters">
              {Object.entries(appliedFilters).map(
                ([key, value]) =>
                  key !== 'priceRange' &&
                  value !== undefined &&
                  value !== '' && (
                    <div key={key} className="main__search_filters--item">
                      <span>{String(value === 'cloth' ? 'Одежда' : (value === 'shoe' ? 'Обувь' : value))} </span>
                      <button
                        onClick={() => removeFilter(key as keyof Filters)}
                      >
                        <X size={20} />
                      </button>
                    </div>
                  )
              )}
            </div>
          )}
        </div>
      </section>

      <div className="main__btn">
        <button
          className={`main__btn-item ${selectedButton === 'cloth' ? 'active' : ''
          }`}
          onClick={() => handleCategoryChange('cloth')}
        >
          <Shirt size={30} />
          Одежда
        </button>

        <button
          className={`main__btn-item ${selectedButton === 'shoe' ? 'active' : ''
          }`}
          onClick={() => handleCategoryChange('shoe')}
        >
          <Footprints />
          Обувь
        </button>
      </div>

      {/*TODO: Добавить еще по 2 слайда*/}
      <section className="main__sections">
        <div className="main__carousel">
          <Carousel
            infiniteLoop={true}
            autoPlay={true}
            interval={3000}
            showThumbs={false}
          >
            {items}
          </Carousel>
        </div>
      </section>


      {/*TODO: Правильно настроить применение фильтров*/}
      {/*NOTE: Правильно передавать данные: 1) По дефолту передаются все данные с productData, елси применены фильтры, то возвращается все по филььтрам*/}

      {
        (productData.length > 0 && !isLoading) ? (
          <>
            {(selectedButton === 'cloth' || (appliedFilters && appliedFilters.var === 'cloth')) &&
              <Cloth />}
            {(selectedButton === 'shoe') && <Shoes productData={productData} />}
          </>
        ) : (
          <div className="load">
            <Loader className="animate-spin-slow spinner" size={30} />
          </div>
        )
      }


      <AnimatePresence>
        {isFilterOpen && (
          <motion.div
            initial={{opacity: 0, x: 1000}}
            animate={{opacity: 1, x: 0}}
            exit={{opacity: 0, x: 1000}}
            transition={{duration: 0.5}}
            className="modal-right"
          >
            <Filter closeModal={closeClose} applyFilters={applyFilters} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Main;
