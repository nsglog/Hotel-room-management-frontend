import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BookingService from "../services/BookingService";

const UpdateEmail = () => {
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);
  const [formError, setFormError] = useState(null);

  useEffect(() => {
    const currentBooking = localStorage.getItem("current_booking");
    if (!currentBooking) return navigate("/upcomingbookings");
    if (currentBooking.id !== currentBooking.id) {
      clearCurrentBooking();
      return navigate("/upcomingbookings");
    }

    const parsedBooking = JSON.parse(currentBooking);
    setBooking(parsedBooking);
  }, []);

  const clearCurrentBooking = () => {
    localStorage.removeItem("current_booking");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError(null);

    const formData = new FormData(e.target);
    const formValues = {};
    formData.forEach((value, key) => (formValues[key] = value));

    try {
      const response = await BookingService.updateEmail(booking.id, formValues);
      console.log("resp: ", response);
      navigate(`/edit-options/${booking.id}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email-address" className="sr-only">
                New Email
              </label>
              <input
                id="new-email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="relative block w-full rounded-md border-0 p-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                placeholder="New Email"
              />
            </div>

            {formError && <p className="text-red-600">{formError}</p>}

            <div>
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateEmail;
