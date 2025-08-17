'use client';
import { X } from 'lucide-react';
import { useState } from 'react';
import { Input } from '../ui/input';

interface MultiTextsProps {
  placeholder: string;
  value: string[];
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
}

const MultiTexts: React.FC<MultiTextsProps> = ({
  placeholder,
  value,
  onChange,
  onRemove,
}) => {
  const [inputValue, setInputValue] = useState('');

  // AddItem
  const addItem = (item: string) => {
    onChange(item);
    setInputValue('');
  };

  return (
    <>
      <Input
        type="text"
        placeholder={placeholder}
        value={inputValue}
        onChange={e => setInputValue(e.target.value)}
        onKeyDown={e => {
          if (e.key === 'Enter') {
            e.preventDefault();
            addItem(inputValue);
          }
        }}
        className=" text-gray-700 px-2  py-5 text-base inline-block  mt-1 focus:outline-none focus:border-none border-2 border-gray-300 shadow-none focus:border"
      />
      {value && value.length > 0 && (
        <div className="flex gap-1 flex-wrap mt-1">
          {value.map((item, index) => (
            <span
              key={index}
              className="flex items-center gap-1 bg-gray-500 text-sm rounded-xl px-3 py-1 outline-none text-white"
            >
              {item}
              <span
                onClick={() => onRemove(item)}
                className="cursor-pointer outline-none text-red-500 hover:text-red-600 trasition-all duration-300 ease-in-out"
              >
                <X className="w-4 h-4" />
              </span>
            </span>
          ))}
        </div>
      )}
    </>
  );
};

export default MultiTexts;
