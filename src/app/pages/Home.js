import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  function navigateToBookings() {
    navigate("/upcomingbookings");
  }

  return (
    <div className="page-home">
      <div className="h-screen flex items-center justify-center space-x-5">
        <button
          className="rounded text-white font-semibold bg-gray-600 hover:bg-black py-2 px-6"
          onClick={navigateToBookings}
        >
          Upcoming Bookings
        </button>
        <button
          className="rounded text-white font-semibold bg-gray-600 hover:bg-black py-2 px-6"
          onClick={() => {
            navigate("/create-booking");
          }}
        >
          Create New Booking
        </button>
      </div>
    </div>
  );
};

export default Home;
