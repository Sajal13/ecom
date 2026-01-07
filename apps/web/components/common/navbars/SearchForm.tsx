import { GoSearch } from 'react-icons/go';
import TextField from 'components/base/TextField';

const SearchForm = () => {
  return (
    <div className="relative w-full lg:w-48 xl:w-64">
      <TextField placeholder="What are you looking for?" className="w-full" />
      <div className='absolute right-2 top-1/2 -translate-y-1/2'>
        <GoSearch className="text-xl" />
      </div>
    </div>
  );
};

export default SearchForm;
