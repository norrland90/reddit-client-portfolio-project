import Filter from './Filter';

const Header = () => {
  return (
    <div className="flex gap-4 flex-col md:flex-row justify-between md:items-center">
      <div className="flex gap-4 items-center">
        <img
          src="/images/Octocat.png"
          alt="Reddit Octocat logo"
          className="w-14"
        />
        <h1 className="text-2xl">Minimal Reddit Client</h1>
      </div>
      <Filter />
    </div>
  );
};

export default Header;
