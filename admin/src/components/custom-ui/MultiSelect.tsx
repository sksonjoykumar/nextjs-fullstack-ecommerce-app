'use client';

import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import { X } from 'lucide-react';
import { useState } from 'react';
import { Badge } from '../ui/badge';

interface MultiSelectProps {
  placeholder: string;
  collections: CollectionType[];
  value: string[];
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
}

const MultiSelect: React.FC<MultiSelectProps> = ({
  placeholder,
  collections,
  value,
  onChange,
  onRemove,
}) => {
  const [inputValue, setInputValue] = useState('');
  const [open, setOpen] = useState(false);

  // Map value ids to collections, filtering out any undefined
  const selected = value
    .map(id => collections.find(collection => collection._id === id))
    .filter((c): c is CollectionType => c !== undefined);

  // Filter out already selected collections to show as options
  const selectables = collections.filter(
    collection => !selected.some(sel => sel._id === collection._id)
  );

  return (
    <Command className="overflow-visible bg-white">
      <div className="flex gap-1 flex-wrap border rounded-md">
        {selected.map(collection => (
          <Badge key={collection._id}>
            {collection.title}
            <button
              type="button"
              className="ml-1 hover:text-red-1"
              onClick={() => onRemove(collection._id)}
            >
              <X className="h-3 w-3" />
            </button>
          </Badge>
        ))}

        <CommandInput
          placeholder={placeholder}
          value={inputValue}
          onValueChange={setInputValue}
          onBlur={() => setOpen(false)}
          onFocus={() => setOpen(true)}
        />
      </div>

      <div className="relative mt-2">
        {open && (
          <CommandGroup className="absolute w-full z-30 top-0 overflow-auto border rounded-md shadow-md max-h-48">
            {selectables.map(collection => (
              <CommandItem
                key={collection._id}
                onMouseDown={e => e.preventDefault()}
                onSelect={() => {
                  onChange(collection._id);
                  setInputValue('');
                }}
                className="hover:bg-grey-2 cursor-pointer"
              >
                {collection.title}
              </CommandItem>
            ))}

            {selectables.length === 0 && (
              <div className="p-2 text-center text-gray-500">
                No collections found
              </div>
            )}
          </CommandGroup>
        )}
      </div>
    </Command>
  );
};

export default MultiSelect;
