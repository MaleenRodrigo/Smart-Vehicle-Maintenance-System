import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { Link } from "react-router-dom";
import axios from "axios";
import CreditCard from "../../components/CreditCard";

const Profile = () => {
  const [cards, setCards] = useState([]);
  const getCards = async () => {
    try {
      const res = await axios.get(
        "/api/cards/user/" + localStorage.getItem("userId")
      );
      setCards(res.data?.cards);
    } catch (err) {
      console.error("Error fetching cards");
    }
  };

  useEffect(() => {
    getCards();
  }, []);

  return (
    <>
      <Navbar />
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <div className="max-w-full px-3 mb-6 lg:mb-0 lg:w-full lg:flex-none">
        <div className="relative flex flex-col min-w-0 mt-6 break-words bg-white border-0 border-transparent border-solid shadow-xl dark:bg-slate-850 dark:shadow-dark-xl rounded-2xl bg-clip-border">
          <div className="p-4 pb-0 mb-0 border-b-0 border-b-solid rounded-t-2xl border-b-transparent">
            <div className="flex flex-wrap -mx-3">
              <div className="flex items-center flex-none w-1/2 max-w-full px-3">
                <h6 className="mb-0 dar:text-white">Payment Method</h6>
              </div>
              <div className="flex-none w-1/2 max-w-full px-3 text-right">
                <a
                  className="inline-block px-5 py-2.5 font-bold leading-normal text-center text-white align-middle transition-all bg-transparent rounded-lg cursor-pointer text-sm ease-in shadow-md bg-150 bg-gradient-to-tl from-zinc-800 to-zinc-700 dark:bg-gradient-to-tl dark:from-slate-750 dark:to-gray-850 hover:shadow-xs active:opacity-85 hover:-translate-y-px tracking-tight-rem bg-x-25"
                  href="javascript:;"
                >
                  {" "}
                  {/* <i className="fas fa-plus"> </i>&nbsp;&nbsp;Add New Card */}
                  <Link to="/profile/card">Add New Card</Link>
                </a>
              </div>
            </div>
          </div>
          <div className="flex-auto p-4">
            <div className="flex flex-wrap -mx-3">
              {cards.map((card) => (
                <CreditCard card={card} key={card?.id} refersher={getCards} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
