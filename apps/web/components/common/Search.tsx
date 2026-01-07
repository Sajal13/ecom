import { GoSearch } from 'react-icons/go';
import Button from 'components/base/Buttons';

const Search = () => {
  return (
    <div className="fixed bottom-5 right-5 z-30">
      <Button variant="outlined" color="success" shape="circle" className='bg-neutral-50'>
        <GoSearch className='text-xl' />
      </Button>
    </div>
  );
};

export default Search;
