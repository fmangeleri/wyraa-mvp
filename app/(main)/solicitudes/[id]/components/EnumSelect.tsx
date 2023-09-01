import React, { useState, SetStateAction } from 'react';
import { cn } from '@/lib/utils';
import { Check, ChevronsUpDown } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button, buttonVariants } from '@/components/ui/button';
import { Command, CommandGroup, CommandItem } from '@/components/ui/command';

interface EnumSelectProps<T extends Record<string, string>> {
  enumValues: T;
  selectedValue: string;
  setSelectedValue: (value: string) => void;
}

export function EnumSelect<T extends Record<string, string>>({
  enumValues,
  selectedValue,
  setSelectedValue,
}: EnumSelectProps<T>) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Popover
        open={open}
        onOpenChange={setOpen}
      >
        <PopoverTrigger asChild>
          <span
            className={`w-full justify-between ${buttonVariants({
              variant: 'outline',
            })}`}
            // role='combobox'
            aria-expanded={open}
          >
            {selectedValue
              ? enumValues[selectedValue as keyof T]
              : 'Seleccionar...'}
            <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
          </span>
        </PopoverTrigger>
        <PopoverContent className='w-full p-0'>
          <Command>
            <CommandGroup>
              {Object.keys(enumValues).map((key) => {
                const value = enumValues[key as keyof T];
                return (
                  <CommandItem
                    key={value}
                    onSelect={(currentValue: SetStateAction<string>) => {
                      if (currentValue != selectedValue) {
                        setSelectedValue(value);
                      }
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        'mr-2 h-4 w-4',
                        selectedValue === value ? 'opacity-100' : 'opacity-0'
                      )}
                    />
                    {value}
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </>
  );
}
