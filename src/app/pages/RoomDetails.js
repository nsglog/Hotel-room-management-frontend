import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BookingService from "../services/BookingService";

const RoomDetails = () => {
  const navigate = useNavigate();
  const params = useParams();

  const [booking, setbooking] = useState(null);
  const [roomDetails, setRoomDetails] = useState(null);

  useEffect(() => {
    const currentBooking = localStorage.getItem("current_booking");
    if (!currentBooking) return navigate("/upcomingbookings");
    if (currentBooking.id !== currentBooking.id) {
      clearCurrentBooking();
      return navigate("/upcomingbookings");
    }

    const parsedBooking = JSON.parse(currentBooking);
    setbooking(parsedBooking);
    fetchRoomDetails(parsedBooking);
  }, []);

  const clearCurrentBooking = () => {
    localStorage.removeItem("current_booking");
  };

  const fetchRoomDetails = async (currentBooking) => {
    try {
      console.log("booking: ", currentBooking);

      const response = await BookingService.getRoomDetails(currentBooking.id);
      console.log("resp: ", response);
      setRoomDetails(response);
    } catch (error) {
      console.log(error);
    }
  };

  const onDeleteRoom = async (room, booking) => {
    try {
      const response = await BookingService.deleteRoomOnExistingBooking(
        room.id,
        booking.id
      );
      console.log("resp: ", response);
      setRoomDetails((prevState) => {
        return prevState.filter((prevState) => prevState.id !== room.id);
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="page-room-details">
      <div className="container mx-auto my-8">
        <div className="flex shadow border-b">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left font-medium text-gray-500 uppercase tracking-wider py-3 px-6">
                  Id
                </th>
                <th className="text-left font-medium text-gray-500 uppercase tracking-wider py-3 px-6">
                  Floor Number
                </th>
                <th className="text-left font-medium text-gray-500 uppercase tracking-wider py-3 px-6">
                  Room Type
                </th>
                <th className="text-left font-medium text-gray-500 uppercase tracking-wider py-3 px-6">
                  Actions
                </th>
              </tr>
            </thead>
            {roomDetails && (
              <tbody className="bg-white">
                {roomDetails.map((room, index) => (
                  <tr key={room.id}>
                    <td className="text-left px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{room.id}</div>
                    </td>
                    <td className="text-left px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {room.floor_number}
                      </div>
                    </td>
                    <td className="text-left px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {room.roomType}
                      </div>
                    </td>
                    <td className="text-left px-6 py-4 whitespace-nowrap">
                      <a
                        onClick={(e) => onDeleteRoom(room, booking)}
                        className="text-indigo-600 hover:text-indigo-800 hover:cursor-pointer"
                      >
                        Delete Room
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            )}
          </table>
        </div>
      </div>
    </div>
  );
};

export default RoomDetails;
