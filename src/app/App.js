import "./App.css";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import UpcomingBookings from "./pages/UpcomingBookings";
import EditBooking from "./pages/EditBooking";
import EditOptions from "./pages/EditOptions";
import CreateBooking from "./pages/CreateBooking";
import AvailableRooms from "./pages/AvailableRooms";
import RoomDetails from "./pages/RoomDetails";
import UpdateEmail from "./pages/UpdateEmail";
// import UpcomingBookings from "./components/UpcomingBookings";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/upcomingbookings" element={<UpcomingBookings />} />
        <Route path="/editBooking/:id" element={<EditBooking />} />
        <Route path="/edit-options/:id" element={<EditOptions />} />
        <Route path="/create-booking" element={<CreateBooking />} />
        <Route path="/available-rooms" element={<AvailableRooms />} />
        <Route path="/room-details/:id" element={<RoomDetails />} />
        <Route path="/update-email/:id" element={<UpdateEmail />} />
      </Routes>
    </>
  );
}

export default App;
