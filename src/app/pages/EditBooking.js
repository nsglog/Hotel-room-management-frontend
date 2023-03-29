import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BookingService from "../services/BookingService";

const EditBooking = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(false);
  const [rooms, setRooms] = useState(null);

  useEffect(() => {
    const currentBooking = localStorage.getItem("current_booking");
    if (!currentBooking) return navigate("/upcomingbookings");
    if (currentBooking.id !== currentBooking.id) {
      clearCurrentBooking();
      return navigate("/upcomingbookings");
    }

    const parsedBooking = JSON.parse(currentBooking);
    setBooking(parsedBooking);
    fetchRooms(parsedBooking);
  }, []);

  const clearCurrentBooking = () => {
    localStorage.removeItem("current_booking");
  };

  const fetchRooms = async (currentBooking) => {
    setLoading(true);
    try {
      console.log("booking: ", currentBooking);
      const params = {
        start_time: currentBooking.start_time,
        end_time: currentBooking.end_time,
      };
      const response = await BookingService.getAllAvailableRooms(params);
      console.log("resp: ", response);
      setRooms(response);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddRoom = (index) => {
    if (!rooms[index]) return;

    const updatedRooms = [...rooms];
    updatedRooms[index] = {
      ...updatedRooms[index],
      added: true,
    };

    setRooms(updatedRooms);
  };

  const handleRemoveRoom = (index) => {
    if (!rooms[index]) return;
    const updatedRooms = [...rooms];
    updatedRooms[index] = {
      ...updatedRooms[index],
      added: false,
    };

    setRooms(updatedRooms);
  };

  const handleConfirm = async () => {
    if (!rooms) return;
    const selectedRooms = rooms.filter((room) => room.added);
    if (selectedRooms.length === 0) {
      return alert("No rooms selected");
    }

    console.log("selected rooms: ", selectedRooms);
    try {
      const resp = await BookingService.addRoomsOnExistingBooking(
        booking.id,
        selectedRooms
      );
      navigate("/upcomingbookings");
    } catch (err) {
      console.error(err);
    }
  };

  if (!booking) return <></>;

  return (
    <div className="page-edit-booking">
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
                <th className="text-right font-medium text-gray-500 uppercase tracking-wider py-3 px-6">
                  Actions
                </th>
              </tr>
            </thead>
            {rooms && (
              <tbody className="bg-white">
                {rooms.map((room, index) => (
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
                    <td className="text-right px-6 py-4 whitespace-nowrap font-medium text-sm">
                      {room.added ? (
                        <button
                          onClick={() => handleRemoveRoom(index)}
                          className="text-indigo-600 hover:text-indigo-800 px-4 hover:cursor-pointer"
                        >
                          Remove
                        </button>
                      ) : (
                        <button
                          onClick={() => handleAddRoom(index)}
                          className="text-indigo-600 hover:text-indigo-800 px-4 hover:cursor-pointer"
                        >
                          Add
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            )}
          </table>
        </div>

        <div className="text-center mt-10">
          <button
            type="button"
            className="rounded text-white font-semibold bg-gray-600 hover:bg-black py-2 px-4"
            onClick={handleConfirm}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditBooking;
