import { useState } from 'react';
import SubredditsList from './SubredditsList';
import { Button } from './ui/button';
import { FaArrowRight } from 'react-icons/fa';

const AsideMenu = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <div
        className={`absolute z-10 left-8 top-12 lg:static ${
          menuOpen ? 'block lg:block' : 'hidden lg:block'
        }`}
      >
        <SubredditsList setMenuOpen={setMenuOpen} />
      </div>
      <Button
        variant="outline"
        size="sm"
        className="lg:hidden"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <FaArrowRight
          className={`transition duration-300 ${
            menuOpen ? 'rotate-180' : 'rotate-0'
          }`}
        />
      </Button>
    </>
  );
};

export default AsideMenu;
