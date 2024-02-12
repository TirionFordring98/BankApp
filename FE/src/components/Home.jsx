import React from "react";
import { ReactTyped } from "react-typed";
import { playClickSound } from "../../sfx.js";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="max-w-screen-md mx-auto text-center mt-[-150px]">
        <p className="text-[#b07c3b] text-3xl font-bold mb-2">
          Welcome to{" "}
          <ReactTyped
            className="text-3xl font-bold p-2"
            strings={["Big", "Pig"]}
            typeSpeed={80}
            backSpeed={20}
            loop
          />
          Man Bank
        </p>
        <div className=" text-[#8f878f] mb-2 max-w-[400px] overflow-hidden overflow-ellipsis">
          Step into The Capitalist Bank Utopia, where pigs in suits oversee the
          feast while the working class pigs wallow in debt and despair, their
          dreams drowned out by the squeals of corporate greed echoing through
          the halls of this dystopian financial colosseum.
        </div>

        <div className="text-[#b07c3b] mb-4">
          <ReactTyped
            className="text-xl font-bold p-2"
            strings={["Big-Man, Pig-Man", "Haha, Charade You Are"]}
            typeSpeed={40}
            backSpeed={20}
            loop
          />
        </div>
        <div className="flex space-x-4">
          <button
            onClick={playClickSound}
            className="bg-[#b07c3b] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Apply for a Loan
          </button>
          <Link to="/transactions">
            <button
              onClick={playClickSound}
              className="bg-[#b07c3b] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Transaction History
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
