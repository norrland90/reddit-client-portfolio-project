import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setFilterTerm } from '@/state/reddits/redditsSlice';

const Filter = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();

  const handleInput = (e) => {
    setSearchTerm(e.target.value);
    dispatch(setFilterTerm(e.target.value));
  };

  return (
    <Input
      placeholder="Filter by term"
      className="md:max-w-[20rem] lg:max-w-[25rem]"
      onChange={handleInput}
      value={searchTerm}
    />
  );
};

export default Filter;
