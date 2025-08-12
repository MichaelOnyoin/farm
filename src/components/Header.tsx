import React from "react";
import Link from "next/link";

const Header = () => {
  return (
    <header className="bg-green-400 p-4 text-white">
     <div className="w-full mx-auto flex items-center justify-between px-6 py-4">
          {/* <h1 className="text-2xl font-bold">🥑 Fresh Avocado Co.</h1> */}
          <Link href="/">
            <img src="jamon-back.png" alt="" className="h-40 w-40 fit" />
          </Link>
          <nav>
            <Link href="#form" className="px-3 hover:underline">Entries</Link>
            <Link href="#view" className="px-3 hover:underline">View</Link>
            <Link href="#contact" className="px-3 hover:underline">Contact</Link>
          </nav>
        </div>
    </header>
  );
};

export default Header;
