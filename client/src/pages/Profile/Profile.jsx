import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import CreditCard from "../../components/CreditCard";
import { deleteInquiry, getAllInquiry } from "../../api/inquiry";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const token = localStorage.getItem("token");
// console.log("profileToken=> ", token);
const Profile = () => {
  const navigate = useNavigate();

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

  const handleDeleteInquiries = async (id) => {
    // e.preventDefault();
    // console.log("e=>", e);
    try {
      await deleteInquiry(id, token);
      setInquiries((currentInquiries) =>
        currentInquiries.filter((inquiry) => inquiry.id !== id)
      );
      // navigate("/profile");
      // console.log(response.data);
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
        <div className="relative flex flex-col min-w-0 mt-6 break-words bg-white border-0 border-transparent border-solid shadow-xl :bg-slate-850 :shadow--xl rounded-2xl bg-clip-border">
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
              Browse a list of Flowbite products designed to help you work and
              play, stay organized, get answers, keep in touch, grow your
              business, and more.
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
                  <td className="px-6 py-4">{inquiry.inquiryType}</td>
                  <td className="px-6 py-4">
                    <span className="bg-yellow-100 text-yellow-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded :bg-yellow-900 :text-yellow-300">
                      {inquiry.status}
                    </span>
                  </td>
                  <td className="px-2 py-4 text-right">
                    <a
                      // href="#"
                      className="font-medium text-blue-600 :text-blue-500 hover:underline"
                      onClick={() => handleDeleteInquiries()}
                    >
                    <EditIcon /> 
                    </a>
                  </td>
                  <td className="px-2 py-4 text-right">
                    <a
                      // href="#"
                      onClick={() => handleDeleteInquiries(inquiry._id)}
                      className="font-medium text-red-600 :text-blue-500 hover:underline"
                    >
                     <DeleteIcon /> 
                    </a>
                  </td>
                </tr>
              ))
            ) : (
              <div className="w-full text-lg text-red-600 font-semibold m-10 text-center">
                You dont have any tickets!
              </div>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Profile;
