import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import CreditCard from "../../components/CreditCard";
import { deleteInquiry, getAllInquiry } from "../../api/inquiry";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Button, Modal } from "flowbite-react";
import { InquiryModal } from "./InquiryModal";

const token = localStorage.getItem("token");
// console.log("profileToken=> ", token);
const Profile = () => {
  const navigate = useNavigate();
  const [isModalOpen, setModalOpen] = useState(false);
  const [inquiryModal, setInquiryModal] = useState(false);
  const [currentInquiryId, setCurrentInquiryId] = useState(null);
  const [inquiry, setInquiry] = useState({});

  function getStatusClassName(status) {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "completed":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return ""; // Default case if status doesn't match any case
    }
  }

  const toggleInquiryModal = (inquiry) => {
    // console.log("toglleInqModal");
    setInquiry(inquiry);
    setInquiryModal(!inquiryModal);
  };

  const toggleModal = (id) => {
    setCurrentInquiryId(id);
    setModalOpen(!isModalOpen);
  };

  const [inquiries, setInquiries] = useState([]);

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

  const handleEditClick = (inquiry) => {
    navigate("/inquiry/update", { state: { inquiry } });
  };

  const handleDeleteInquiries = async (id) => {
    try {
      await deleteInquiry(id, token);
      setInquiries((currentInquiries) =>
        currentInquiries.filter((inquiry) => inquiry._id !== id)
      );
    } catch (error) {
      console.log("error deleting inquiry => ", error);
    }
  };

  useEffect(() => {
    const getInquiries = async () => {
      try {
        const res = await getAllInquiry(token);
        // console.log("res=>", res);
        setInquiries(res);
      } catch (error) {
        console.error("Error fetching inquiries: ", error.message);
      }
    };

    getInquiries();
    // getCards();
  }, [token]);

  return (
    <>
      <Navbar />
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <div className="flex w-full justify-end px-3 mb-6 lg:mb-0">
        <div className=" flex flex-col min-w-0 mt-6 break-words bg-white border-0 border-transparent border-solid shadow-xl :bg-slate-850 :shadow--xl rounded-2xl bg-clip-border">
          <div className="p-4 pb-0 mb-0 border-b-0 border-b-solid rounded-t-2xl border-b-transparent">
            <div className="flex flex-wrap -mx-3">
              <div className="flex items-center flex-none w-1/2 max-w-full px-3">
                <h6 className="mb-0 dar:text-white">Payment Method</h6>
              </div>
              <div className="flex-none w-1/2 max-w-full px-3 text-right">
                <a
                  className="inline-block px-5 py-2.5 font-bold leading-normal text-center text-white align-middle transition-all bg-transparent rounded-lg cursor-pointer text-sm ease-in shadow-md bg-150 bg-gradient-to-tl from-zinc-800 to-zinc-700 :bg-gradient-to-tl :from-slate-750 :to-gray-850 hover:shadow-xs active:opacity-85 hover:-translate-y-px tracking-tight-rem bg-x-25"
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
      <br />
      <br />
      <br />

      <div className="mx-56 mb-28 shadow-md rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 :text-gray-400">
          <caption className="p-5 text-lg font-semibold text-left rtl:text-right text-gray-900 bg-white :text-white :bg-gray-800">
            My Tickets
            <p className="mt-1 text-sm font-normal text-gray-500 :text-gray-400">
              Browse a list of tickets designed to help you work and play, stay
              organized, get answers, keep in touch, grow your business, and
              more.
            </p>
          </caption>
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 :bg-gray-700 :text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Title
              </th>
              <th scope="col" className="px-6 py-3">
                Description
              </th>
              <th scope="col" className="px-6 py-3">
                Type
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                <span className="sr-only"></span>
              </th>
              <th scope="col" className="px-6 py-3">
                <span className="sr-only"></span>
              </th>
            </tr>
          </thead>
          <tbody>
            {inquiries.length > 0 ? (
              inquiries.map((inquiry) => (
                <tr className="bg-white border-b :bg-gray-800 :border-gray-700">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap :text-white"
                  >
                    {inquiry.title}
                  </th>
                  <td className="px-6 py-4">{inquiry.description}</td>
                  <td className="px-6 py-4 capitalize">
                    {inquiry.inquiryType}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`uppercase font-medium px-2.5 py-0.5 rounded ${getStatusClassName(
                        inquiry.status
                      )}`}
                    >
                      {inquiry.status}
                    </span>
                  </td>
                  <td className="px-1 py-4 text-right">
                    <a
                      onClick={() => toggleInquiryModal(inquiry)}
                      className="font-medium text-gray-400 :text-blue-500 cursor-pointer"
                    >
                      <VisibilityIcon />
                    </a>
                  </td>
                  <td className="px-1 py-4 text-right">
                    <a
                      onClick={() => handleEditClick(inquiry)}
                      className="font-medium text-gray-400 :text-blue-500 cursor-pointer"
                    >
                      <EditIcon />
                    </a>
                  </td>
                  <td className="px-2 py-4 text-right">
                    <a
                      onClick={() => toggleModal(inquiry._id)}
                      className="font-medium text-red-600 :text-blue-500 cursor-pointer"
                    >
                      <DeleteIcon />
                    </a>
                  </td>
                </tr>
              ))
            ) : (
              <div className="w-full text-md text-gray-600 font-semibold m-10 text-center">
                You dont have any tickets!
              </div>
            )}
          </tbody>
        </table>
      </div>
      <br />
      <br />
      <br />
      <br />

      {isModalOpen && (
        <div
          id="popup-modal"
          tabIndex="-1"
          className="fixed inset-0 z-50 overflow-y-auto overflow-x-hidden flex justify-start items-end w-full h-[calc(100%-1rem)]"
        >
          <div className="relative p-4 w-full max-w-md">
            <div className="relative bg-gray-100 rounded-lg shadow-lg :bg-gray-700">
              <button
                onClick={toggleModal}
                type="button"
                className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex items-center justify-center :hover:bg-gray-600 :hover:text-white"
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
              <div className="p-4 md:p-5 text-center">
                <svg
                  className="mx-auto mb-4 text-gray-400 w-12 h-12 :text-gray-200"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 11V6m0 8h.01M19 10a9 9 0 11-18 0 9 9 0 0118 0Z"
                  />
                </svg>
                <h3 className="mb-5 text-lg font-normal text-gray-500 :text-gray-400">
                  Are you sure you want to delete this inquiry?
                </h3>
                <button
                  onClick={() => {
                    handleDeleteInquiries(currentInquiryId);
                    toggleModal(false);
                  }}
                  className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 :focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                >
                  Yes, I'm sure
                </button>
                <button
                  onClick={toggleModal}
                  className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 :focus:ring-gray-700 :bg-gray-800 :text-gray-400 :border-gray-600 :hover:text-white :hover:bg-gray-700"
                >
                  No, cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {inquiryModal && (
        <InquiryModal
          inquiry={inquiry}
          toggleInquiryModal={toggleInquiryModal}
        />
      )}
    </>
  );
};

export default Profile;
