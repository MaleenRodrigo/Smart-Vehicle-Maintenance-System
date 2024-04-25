// import React from "react";
// import Navbar from "../../components/Navbar";

// const Card = () => {
//   return (
//     <div>
//       <Navbar />
//       <br></br>
//       <br></br>
//       <br></br>
//       <br></br>

//       <form className="max-w-sm mx-auto">
//         <div className="mb-5">
//           <label
//             for="cardNumber"
//             className="block mb-2 text-sm font-medium text-gray-900 :text-white"
//           >
//             Card Number
//           </label>
//           <input
//             type="text"
//             id="nameOnCard"
//             className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500"
//             required
//             maxLength="16"
//             minLength="16"
//           />
//         </div>
//         <div className="mb-5">
//           <label
//             for="nameOnCard"
//             className="block mb-2 text-sm font-medium text-gray-900 :text-white"
//           >
//             Name on Card
//           </label>
//           <input
//             type="text"
//             id="nameOnCard"
//             className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500"
//             required
//           />
//         </div>
//         <div className="mb-5">
//           <label
//             for="expiration"
//             className="block mb-2 text-sm font-medium text-gray-900 :text-white"
//           >
//             Expiration
//           </label>
//           <input
//             type="date"
//             id="expiration"
//             className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500"
//             required
//           />
//         </div>

//         <div className="mb-5">
//           <label
//             for="ccv"
//             className="block mb-2 text-sm font-medium text-gray-900 :text-white"
//           >
//             CCV
//           </label>
//           <input
//             type="text"
//             maxLength="3"
//             minLength="3"
//             id="ccv"
//             className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500"
//             required
//           />
//         </div>
//         <button
//           type="submit"
//           className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center :bg-blue-600 :hover:bg-blue-700 :focus:ring-blue-800"
//         >
//           Save
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Card;
import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import axios from "axios";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Card = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [formData, setFormData] = useState({
    cardNumber: "",
    nameOnCard: "",
    expiration: "",
    ccv: "",
  });

  const { cardNumber, nameOnCard, expiration, ccv } = formData;

  const onChange = (e) =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const body = JSON.stringify({
        ...formData,
        userId: localStorage.getItem("userId"),
      });

      if (params.cardId) {
        const res = await axios.put(
          "/api/cards/" + params.cardId,
          body,
          config
        );
      } else {
        const res = await axios.post("/api/cards", body, config);
      }

      toast.success("Card saved successfully!");
      setFormData({
        cardNumber: "",
        nameOnCard: "",
        expiration: "",
        ccv: "",
      });
      navigate("/profile");
    } catch (err) {
      console.error("Card save failed:", err);
      toast.error("Failed to save card. Please try again.");
    }
  };

  useEffect(() => {
    const cardId = params.cardId;
    if (cardId) {
      axios
        .get("/api/cards/" + cardId)
        .then((res) => {
          setFormData(res.data?.card);
        })
        .catch((err) => {});
    }
  }, []);

  return (
    <div>
      <Navbar />
      <br />
      <br />
      <br />
      <br />
      <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
        <div className="mb-5">
          <label
            htmlFor="cardNumber"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Card Number
          </label>
          <input
            type="text"
            id="cardNumber"
            name="cardNumber"
            value={cardNumber}
            onChange={onChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            maxLength="16"
            minLength="16"
            required
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="nameOnCard"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Name on Card
          </label>
          <input
            type="text"
            id="nameOnCard"
            name="nameOnCard"
            value={nameOnCard}
            onChange={onChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="expiration"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Expiration
          </label>
          <input
            type="date"
            id="expiration"
            name="expiration"
            value={expiration}
            onChange={onChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="ccv"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            CCV
          </label>
          <input
            type="text"
            id="ccv"
            name="ccv"
            value={ccv}
            onChange={onChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            maxLength="3"
            minLength="3"
            required
          />
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default Card;
