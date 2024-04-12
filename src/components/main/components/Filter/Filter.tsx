import {X} from 'lucide-react';
import './filter.scss';

const options = {
  clothes: ['Одежда', 'Обувь'],
  colors: ['Серый', 'Красный'],
  brands: ['Nike', 'Puma', 'Jordan'],
  locations: ['MCK', 'Poizon'],
};

interface FilterSelectProps {
  label: string;
  options: string[];
}

const FilterSelect: React.FC<FilterSelectProps> = ({label, options}) => (
  <div className='filter__options'>
    <label className='grid'>
      {label}
      <select className='filter__options--select'>
        {options.map((option: string, index: number) => (
          <option key={index} value={option.toLowerCase()}>
            {option}
          </option>
        ))}
      </select>
    </label>
  </div>
);

const Filter: React.FC<{closeModal: () => void}> = ({closeModal}) => {
  return (
    <div className='filter'>
      <button type='button' onClick={closeModal}>
        <X className='exit' size={30} />
      </button>

      <form action=''>
        <FilterSelect label='Одежда / Обувь' options={options.clothes} />
        <FilterSelect label='Цвет' options={options.colors} />
        <FilterSelect label='Бренд' options={options.brands} />
        <FilterSelect label='Откуда' options={options.locations} />

        <div className='filter__options_price'>
          <input
            className='filter__options_price--input'
            type='number'
            placeholder='От'
          />
          <input
            className='filter__options_price--input'
            type='number'
            placeholder='До'
          />
        </div>
      </form>
    </div>
  );
};

export default Filter;
