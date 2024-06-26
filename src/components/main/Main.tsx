import React, {useCallback, useEffect, useState} from 'react';
import {AnimatePresence, motion} from 'framer-motion';
import {Swiper, SwiperSlide} from 'swiper/react';
import {A11y, Autoplay, Navigation} from 'swiper/modules';

import {
  ArrowBigUpDash,
  Footprints,
  Loader,
  Search,
  Shirt,
  SlidersHorizontal,
  X,
} from 'lucide-react';

import './main.scss';
import 'swiper/swiper-bundle.css';

import 'react-responsive-carousel/lib/styles/carousel.min.css';

import {images} from '../../assets/imagesAssets';
import ProductComponent from './components/ProductComponent/Product';

import Filter from './components/Filter/Filter';
import {Filters, Product, ProductReceive} from '../../types/types';
import {FetchFilters} from '../../hooks/fetchFilters';

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};

const Main = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedButton, setSelectedButton] = useState<string | null>('shoe');

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState<Filters | null>(null);
  const [selectedFilters, setSelectedFilters] = useState<Filters>({
    var: selectedButton ?? '',
    color: '',
    brand: '',
    size: '',
    material: '',
    locations: '',
    priceRange: {from: '', to: ''},
  });
  const [filteredProductData, setFilteredProductData] = useState<Product[]>([]);

  const [productData, setProductData] = useState<ProductReceive | []>([]);
  const [isLoading, setIsLoading] = useState(true);

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
    document.body.classList.toggle('modal-open', !isFilterOpen);
  };

  const applyFilters = (filters: Filters) => {
    setAppliedFilters(filters);
    setSelectedFilters(filters);
    setSelectedButton(
      filters.var === 'cloth' ? 'cloth' : filters.var === 'shoe' ? 'shoe' : null
    );
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

  const fetchData = useCallback(() => {
    setIsLoading(true);
    console.log(appliedFilters);
    FetchFilters(selectedButton, appliedFilters ?? {}, data => {
      setProductData(data);
      console.log(data);
      setIsLoading(false);
    });
  }, [selectedButton, appliedFilters]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredProductData(productData);
    } else {
      const filteredData = productData.filter(product =>
        product.brand.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProductData(filteredData);
    }
  }, [searchQuery, productData]);

  const handleSearchInputChange = (e: any) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className='main'>
      <section className='main__search'>
        <div className='main__search_container'>
          <div className='main__search_container--input'>
            <Search size={28} />
            <input
              className='main__search_container--input_text'
              placeholder='Поиск по бренду...'
              value={searchQuery}
              onChange={handleSearchInputChange}
            ></input>
          </div>
          <button
            className='main__search_container--filter'
            onClick={toggleFilter}
          >
            <SlidersHorizontal size={28} />
          </button>
        </div>

        {appliedFilters && (
          <div className='main__search_filters'>
            {Object.entries(appliedFilters).map(([key, value]) => {
              if (value !== undefined && value !== '') {
                return (
                  <div key={key} className='main__search_filters--item'>
                    <span>
                      {key === 'priceRange' &&
                      typeof value === 'object' &&
                      'from' in value &&
                      'to' in value
                        ? `Цена: от ${value.from} до ${value.to}`
                        : String(
                            value === 'cloth'
                              ? 'Одежда'
                              : value === 'shoe'
                              ? 'Обувь'
                              : value
                          )}
                    </span>
                    <button onClick={() => removeFilter(key as keyof Filters)}>
                      <X size={20} />
                    </button>
                  </div>
                );
              }
              return null;
            })}
          </div>
        )}
      </section>

      <div className='main__btn'>
        <button
          className={`main__btn-item ${
            selectedButton === 'cloth' ? 'active' : ''
          }`}
          onClick={() => handleCategoryChange('cloth')}
        >
          <Shirt size={30} />
          Одежда
        </button>

        <button
          className={`main__btn-item ${
            selectedButton === 'shoe' ? 'active' : ''
          }`}
          onClick={() => handleCategoryChange('shoe')}
        >
          <Footprints />
          Обувь
        </button>
      </div>

      <div className='main__carousel'>
        <Swiper
          modules={[Navigation, A11y, Autoplay]}
          slidesPerView={1}
          navigation
          autoplay={{
            delay: 5000,
            pauseOnMouseEnter: true,
            disableOnInteraction: false,
          }}
          loop
          style={{
            '--swiper-navigation-size': '30px',
          }}
        >
          <SwiperSlide>
            <img src={images.nike} alt='product1' />
          </SwiperSlide>

          <SwiperSlide>
            <img src={images.nike} alt='product1' />
          </SwiperSlide>

          <SwiperSlide>
            <img src={images.nike} alt='product1' />
          </SwiperSlide>
        </Swiper>
      </div>

      {filteredProductData.length > 0 && !isLoading && selectedButton ? (
        <ProductComponent productData={filteredProductData} />
      ) : isLoading ? (
        <div className={'load'}>
          <Loader className='animate-spin-slow spinner' size={30} />
        </div>
      ) : (
        <div style={{textAlign: 'center'}}>Ничего не найдено</div>
      )}

      <button>
        <ArrowBigUpDash
          className='arrow_up'
          size={35}
          strokeWidth={1}
          onClick={scrollToTop}
        />
      </button>

      <AnimatePresence>
        {isFilterOpen && (
          <motion.div
            initial={{opacity: 0, x: 1000}}
            animate={{opacity: 1, x: 0}}
            exit={{opacity: 0, x: 1000}}
            transition={{duration: 0.5}}
            className='modal-right'
          >
            <Filter
              closeModal={toggleFilter}
              applyFilters={applyFilters}
              FilterSelected={selectedFilters}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Main;
