'use client';

import { useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { GoSearch } from 'react-icons/go';
import { MdOutlineClose } from 'react-icons/md';
import { zodResolver } from '@hookform/resolvers/zod';
import classNames from 'classnames';
import { z } from 'zod';
import Button from 'components/base/Buttons';
import TextField from 'components/base/TextField';

interface SearchFormData {
  search: string;
}

const searchFormSchema = z.object({
  search: z.string().min(3, 'Search must contain at least 3 characters.'),
});

const SearchFAB = () => {
  const [open, setOpen] = useState(false);

  const fabButtonRef = useRef<HTMLButtonElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SearchFormData>({
    resolver: zodResolver(searchFormSchema),
    defaultValues: {
      search: '',
    },
  });

  /* ------------------ Handlers ------------------ */

  const toggle = () => setOpen((prev) => !prev);

  const close = () => {
    setOpen(false);
    fabButtonRef.current?.focus();
  };

  const onSubmit = (data: SearchFormData) => {
    console.log('Search:', data.search);
    reset();
    close();
  };

  /* ------------------ Effects ------------------ */

  // Auto focus input on open
  useEffect(() => {
    if (!open) return;

    const timer = setTimeout(() => {
      formRef.current?.querySelector<HTMLInputElement>('input')?.focus();
    }, 150);

    return () => clearTimeout(timer);
  }, [open]);

  // Close on ESC
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };

    if (open) {
      window.addEventListener('keydown', onKeyDown);
    }

    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open]);

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        open &&
        formRef.current &&
        !formRef.current.contains(e.target as Node) &&
        !fabButtonRef.current?.contains(e.target as Node)
      ) {
        close();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  // Focus trap inside form
  useEffect(() => {
    if (!open || !formRef.current) return;

    const focusable =
      formRef.current.querySelectorAll<HTMLElement>('input, button');

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    const trap = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', trap);
    return () => document.removeEventListener('keydown', trap);
  }, [open]);

  /* ------------------ Render ------------------ */

  return (
    <div className="fixed bottom-5 right-5 z-40">
      <div className="relative flex items-center">
        {/* Search Form */}
        <form
          ref={formRef}
          role="search"
          aria-hidden={!open}
          aria-labelledby="floating-search"
          onSubmit={handleSubmit(onSubmit)}
          className={classNames(
            'absolute right-14 flex items-center gap-2 overflow-hidden transition-all duration-300 ease-in-out origin-right',
            {
              'scale-x-100 opacity-100': open,
              'scale-x-0 opacity-0 pointer-events-none': !open,
            },
          )}
        >
          <Controller
            name="search"
            control={control}
            render={({ field }) => (
              <TextField
                id="floating-search"
                placeholder="Search…"
                value={field.value}
                onChange={field.onChange}
                className="w-54 sm:w-64 bg-neutral-50"
                error={!!errors.search}
              />
            )}
          />

          <Button
            type="submit"
            variant="outlined"
            color="neutral"
            shape="circle"
            className="bg-neutral-50"
          >
            <GoSearch className="text-xl" />
          </Button>
        </form>

        {/* Floating Action Button */}
        <Button
          ref={fabButtonRef}
          variant="outlined"
          color="neutral"
          shape="circle"
          className="bg-neutral-50 relative z-10"
          onClick={toggle}
          aria-expanded={open}
          aria-controls="floating-search"
          aria-label={open ? 'Close search' : 'Open search'}
        >
          {open ? (
            <MdOutlineClose className="text-2xl text-danger-500" />
          ) : (
            <GoSearch className="text-xl" />
          )}
        </Button>
      </div>
    </div>
  );
};

export default SearchFAB;
