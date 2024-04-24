import React from "react";
import Navbar from "../../components/Navbar";
import mc from "../../assets/mastercard.png";
import visa from "../../assets/visa.png";
import { Link } from "react-router-dom";

const Profile = () => {
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
              <div className="max-w-full px-3 mb-6 md:mb-0 md:w-1/2 md:flex-none">
                <div className="relative flex flex-row items-center flex-auto min-w-0 p-6 break-words bg-transparent border border-solid shadow-none md-max:overflow-auto rounded-xl border-slate-100 dark:border-slate-700 bg-clip-border">
                  <img className="mb-0 mr-4 w-1/10 h-10" src={mc} alt="logo" />
                  <h6 className="mb-0 dark:text-[#c6c6c6]">
                    ****&nbsp;&nbsp;&nbsp;****&nbsp;&nbsp;&nbsp;****&nbsp;&nbsp;&nbsp;7852
                  </h6>
                  <i
                    className="ml-auto cursor-pointer fas fa-pencil-alt text-slate-700"
                    data-target="tooltip_trigger"
                    data-placement="top"
                  ></i>
                  <div
                    data-target="tooltip"
                    className="hidden px-2 py-1 text-sm text-white bg-black rounded-lg"
                  >
                    Edit Card
                    <div
                      className="invisible absolute h-2 w-2 bg-inherit before:visible before:absolute before:h-2 before:w-2 before:rotate-45 before:bg-inherit before:content-['']"
                      data-popper-arrow
                    ></div>
                  </div>
                </div>
              </div>
              <div className="max-w-full px-3 md:w-1/2 md:flex-none">
                <div className="relative flex flex-row items-center flex-auto min-w-0 p-6 break-words bg-transparent border border-solid shadow-none md-max:overflow-auto rounded-xl border-slate-100 dark:border-slate-700 bg-clip-border">
                  <img
                    className="mb-0 mr-4 w-1/10 h-10"
                    src={visa}
                    alt="logo"
                  />
                  <h6 className="mb-0 dak:text-white">
                    ****&nbsp;&nbsp;&nbsp;****&nbsp;&nbsp;&nbsp;****&nbsp;&nbsp;&nbsp;5248
                  </h6>
                  <i
                    className="ml-auto cursor-pointer fas fa-pencil-alt text-slate-700"
                    data-target="tooltip_trigger"
                    data-placement="top"
                  ></i>
                  <div
                    data-target="tooltip"
                    className="hidden px-2 py-1 text-sm text-white bg-black rounded-lg"
                  >
                    Edit Card
                    <div
                      className="invisible absolute h-2 w-2 bg-inherit before:visible before:absolute before:h-2 before:w-2 before:rotate-45 before:bg-inherit before:content-['']"
                      data-popper-arrow
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
