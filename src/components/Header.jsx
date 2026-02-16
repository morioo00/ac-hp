import { siteConfig } from "../data/siteConfig";

const Header = () => {
  return (
    <header className="w-full border-b border-yellow-700/20 leading-none">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <img
          src="/Logo1.png"
          alt="UPDRAFT"
          className="block w-[380px] sm:w-[500px]"
        />
      </div>
    </header>
  );
};

export default Header;
