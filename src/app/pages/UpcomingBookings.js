import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import BookingService from "../services/BookingService";
import Booking from "../components/Booking";

const UpcomingBookings = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await BookingService.getAllBookings();
        console.log("resp: ", response);
        setBookings(response);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const deleteBooking = (e, id) => {
    e.preventDefault();

    BookingService.deleteBooking(id).then((res) => {
      setBookings((prevElement) => {
        return prevElement.map((booking) => {
          if (booking.id === id) {
            return { ...booking, bookingStatus: "CANCELLED" };
          }
          return booking;
        });
      });
    });
  };

  return (
    <div className="container mx-auto my-8">
      {/* <div className="h-12">
        <button
        //   onClick={() => navigate("/addEmployee")}
          className="rounded bg-slate-600 text-white px-6 py-2 font-semibold"
        >
          Add Employee
        </button>
      </div> */}
      <div className="flex shadow border-b">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left font-medium text-gray-500 uppercase tracking-wider py-3 px-6">
                Guest Email
              </th>
              <th className="text-left font-medium text-gray-500 uppercase tracking-wider py-3 px-6">
                Start Date and Time
              </th>
              <th className="text-left font-medium text-gray-500 uppercase tracking-wider py-3 px-6">
                End Date and Time
              </th>
              <th className="text-left font-medium text-gray-500 uppercase tracking-wider py-3 px-6">
                Booking Status
              </th>
              <th className="text-left font-medium text-gray-500 uppercase tracking-wider py-3 px-6">
                Total Amount
              </th>
              <th className="text-right font-medium text-gray-500 uppercase tracking-wider py-3 px-6">
                Actions
              </th>
            </tr>
          </thead>
          {!loading && (
            <tbody className="bg-white">
              {bookings.map((booking) => (
                <Booking
                  booking={booking}
                  deleteBooking={deleteBooking}
                  key={booking.id}
                ></Booking>
              ))}
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
};

export default UpcomingBookings;
