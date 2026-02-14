'use client';

import { useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { RiSearchLine } from "react-icons/ri";
import { MdOutlineClose } from 'react-icons/md';
import Link from 'next/link';
import { zodResolver } from '@hookform/resolvers/zod';
import classNames from 'classnames';
import debounce from 'lodash/debounce';
import { z } from 'zod';
import Button from 'components/base/Buttons';
import TextField from 'components/base/TextField';
import { useRouter } from 'next/navigation';

interface SearchFormData {
  search: string;
}

type Product = {
  id: number;
  title: string;
  thumbnail: string;
};

const searchFormSchema = z.object({
  search: z.string().min(1),
});

const SearchFAB = () => {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchedProduct, setSearchedProduct] = useState<Product[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const fabButtonRef = useRef<HTMLButtonElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();

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

  /* ------------------ Debounced Search ------------------ */

  const debouncedSearch = useRef(
    debounce(async (query: string) => {
      try {
        setIsSearching(true);

        const res = await fetch(`/api/search?q=${query}`);
        const data = await res.json();

        setSearchedProduct(data.products || []);
      } catch {
        setSearchedProduct([]);
      } finally {
        setIsSearching(false);
      }
    }, 400),
  ).current;

  /* ------------------ Handlers ------------------ */

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);

    if (!value.trim()) {
      setSearchedProduct([]);
      debouncedSearch.cancel();
      return;
    }

    debouncedSearch(value);
  };

  const toggle = () => setOpen((prev) => !prev);

  const close = () => {
    setOpen(false);
    reset();
    setSearchQuery('');
    setSearchedProduct([]);
    fabButtonRef.current?.focus();
  };

  const onSubmit = (data: SearchFormData) => {
    router.push(`/search?q=${data.search}`)
    close();
  };

  /* ------------------ Effects ------------------ */

  // Auto focus
  useEffect(() => {
    if (!open) return;

    const t = setTimeout(() => {
      reset();
      formRef.current?.querySelector<HTMLInputElement>('input')?.focus();
    }, 150);

    return () => clearTimeout(t);
  }, [open]);

  // ESC close
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };

    if (open) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  // Click outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        open &&
        !formRef.current?.contains(e.target as Node) &&
        !fabButtonRef.current?.contains(e.target as Node)
      ) {
        close();
      }
    };

    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, [open]);

  // Cleanup debounce
  useEffect(() => {
    return () => debouncedSearch.cancel();
  }, []);

  useEffect(() => {
    setSearchedProduct([]);
    setSearchQuery('');
  }, [open])
  /* ------------------ Render ------------------ */

  return (
    <div className="fixed bottom-5 right-5 z-30">
      <div className="relative flex items-center">
        {/* Result Box */}
        <div
          className={classNames(
            `absolute right-17 sm:right-27 bottom-full mb-3 w-64 max-h-80 overflow-y-auto overflow-x-hidden
             bg-neutral-50 border border-neutral-300 rounded-md shadow-lg transition-all duration-300 origin-bottom`,
            {
              'scale-y-100 opacity-100': searchQuery.length >= 1,
              'scale-y-0 opacity-0 pointer-events-none': searchQuery.length === 0,
            },
          )}
        >
          {isSearching && (
            <div className="p-3 text-sm text-primary">Searching…</div>
          )}

          {!isSearching && searchedProduct.length === 0 && (
            <div className="p-3 text-sm text-primary">No results found</div>
          )}

          {searchedProduct.map((product) => (
            <Link
              href={`/search/${product.id}`}
              key={product.id}
              onClick={() => close()}
              className="flex items-center gap-3 p-3 hover:bg-neutral-100 cursor-pointer"
            >
              <img
                src={product.thumbnail}
                alt={product.title}
                className="w-10 h-10 rounded object-cover"
              />
              <span className="text-sm">{product.title}</span>
            </Link>
          ))}
        </div>

        {/* Search Form */}
        <form
          ref={formRef}
          role="search"
          onSubmit={handleSubmit(onSubmit)}
          className={classNames(
            'absolute right-14 flex items-center gap-2 transition-all duration-300 origin-right',
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
                {...field}
                placeholder="Search…"
                className="w-54 sm:w-64 bg-neutral-50"
                error={!!errors.search}
                onChange={(e) => {
                  field.onChange(e);
                  handleSearchChange(e.target.value);
                }}
              />
            )}
          />

          <Button
            type="submit"
            variant="outlined"
            color="neutral"
            shape="circle"
            className="bg-neutral-900 hover:bg-neutral-900"
          >
            <RiSearchLine className="text-xl text-neutral-50" />
          </Button>
        </form>

        {/* FAB */}
        <Button
          ref={fabButtonRef}
          variant="outlined"
          color="neutral"
          shape="circle"
          className="bg-neutral-800 hover:bg-neutral-900 relative z-10"
          onClick={toggle}
          aria-expanded={open}
        >
          {open ? (
            <MdOutlineClose className="text-2xl text-danger-500" />
          ) : (
            <RiSearchLine className="text-xl text-neutral-50" />
          )}
        </Button>
      </div>
    </div>
  );
};

export default SearchFAB;
