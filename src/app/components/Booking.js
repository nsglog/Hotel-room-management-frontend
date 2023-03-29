import React from "react";
import { useNavigate } from "react-router-dom";
import BookingService from "../services/BookingService";

const Booking = ({ booking, deleteBooking }) => {
  const navigate = useNavigate();

  const editBooking = (e, id) => {
    e.stopPropagation();

    saveCurrentBooking();
    navigate(`/edit-options/${id}`);
  };

  const onClickRoomDetails = (e, id) => {
    e.stopPropagation();

    saveCurrentBooking();
    navigate(`/room-details/${id}`);
  };

  const checkOut = async (e, id) => {
    e.stopPropagation();

    try {
      const response = await BookingService.checkOut(id);
      console.log("resp: ", response);
      window.location.href = window.location.href;
    } catch (error) {
      console.log(error);
    }
  };

  const saveCurrentBooking = () => {
    localStorage.setItem("current_booking", JSON.stringify(booking));
  };

  return (
    <tr key={booking.id}>
      <td className="text-left px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-500">{booking.guest_email}</div>
      </td>
      <td className="text-left px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-500">{booking.start_time}</div>
      </td>
      <td className="text-left px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-500">{booking.end_time}</div>
      </td>
      <td className="text-left px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-500">{booking.bookingStatus}</div>
      </td>
      <td className="text-left px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-500">
          {booking.price || "Available After Booking is Complete"}
        </div>
      </td>
      <td className="text-right px-6 py-4 whitespace-nowrap font-medium text-sm">
        <a
          onClick={(e) => onClickRoomDetails(e, booking.id)}
          className="text-indigo-600 hover:text-indigo-800 px-2 hover:cursor-pointer"
        >
          Room Details
        </a>
        <a
          onClick={(e) => editBooking(e, booking.id)}
          className="text-indigo-600 hover:text-indigo-800 px-2 hover:cursor-pointer"
        >
          Edit Booking
        </a>
        <a
          onClick={(e) => deleteBooking(e, booking.id)}
          className="text-indigo-600 hover:text-indigo-800 px-2 hover:cursor-pointer"
        >
          Delete Booking
        </a>
        <a
          onClick={(e) => checkOut(e, booking.id)}
          className="text-indigo-600 hover:text-indigo-800 px-2 hover:cursor-pointer"
        >
          Checkout
        </a>
      </td>
    </tr>
  );
};

export default Booking;
