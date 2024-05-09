import { useDispatch } from 'react-redux';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { selectSubReddit } from '@/state/reddits/redditsSlice';

const SubRedditButton = ({ name, iconUrl, setMenuOpen }) => {
  const dispatch = useDispatch();

  const handleButtonClick = () => {
    dispatch(selectSubReddit(name));
    setMenuOpen(false);
  };

  return (
    <Button
      variant="ghost"
      className="flex gap-2 justify-start w-full px-2"
      onClick={handleButtonClick}
    >
      <Avatar className="h-6 w-6">
        <AvatarImage src={iconUrl} />
        <AvatarFallback></AvatarFallback>
      </Avatar>
      {name}
    </Button>
  );
};

export default SubRedditButton;
