'use client';

import { Fragment, type ReactNode } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/24/solid';

interface SelectorProps<T extends ReactNode> {
  label?: string;
  width?: number | string;
  value: T;
  options: { label: string; value: T }[];
  onChange: (value: T) => void;
  disabled?: boolean;
}

function Selector<T extends ReactNode>({
  label,
  width = 'auto',
  value,
  options,
  onChange,
  disabled = false,
}: SelectorProps<T>) {
  const buttonText =
    options.find((_option) => _option.value === value)?.label || value;

  return (
    <Listbox value={value} onChange={onChange} disabled={disabled}>
      {({ open }) => (
        <div className='flex items-center gap-3'>
          {label && (
            <Listbox.Label className='heading-6'>{label}</Listbox.Label>
          )}
          <div className='relative'>
            <Listbox.Button
              className={`${
                disabled ? 'text-gray-600' : 'text-text-primary'
              } flex justify-between items-center rounded-[500px] bg-background px-4 py-[8.5px]`}
              style={{ width }}
            >
              {buttonText}
              <ChevronDownIcon
                className={`w-[12px] ${open && '-rotate-180 c-transition'}`}
              />
            </Listbox.Button>
            <Transition
              as={Fragment}
              leave='transition ease-in duration-100'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
            >
              <Listbox.Options className='absolute z-10 w-[185px] max-h-[475px] overflow-scroll top-10 bg-white border-[1px] border-line rounded-lg py-2 text-text-primary'>
                {options.map((_option) => (
                  <Listbox.Option
                    key={_option.label}
                    value={_option.value}
                    className='px-4 py-2 cursor-pointer hover:bg-hover c-transition'
                  >
                    {_option.label}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </div>
      )}
    </Listbox>
  );
}

export default Selector;