import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BookingService from "../services/BookingService";

const CreateBooking = () => {
  const navigate = useNavigate();
  const [formError, setFormError] = useState(null);

  const validateForm = (formValues) => {
    const { start_time, end_time } = formValues;

    const startTimeDate = new Date(start_time);
    const endTimeDate = new Date(end_time);
    if (startTimeDate >= endTimeDate || startTimeDate < new Date()) {
      setFormError("Invalid Date");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError(null);

    const formData = new FormData(e.target);
    const formValues = {};
    formData.forEach((value, key) => (formValues[key] = value));

    if (!validateForm(formValues)) return;

    localStorage.setItem(
      "create-booking-form-data",
      JSON.stringify(formValues)
    );
    navigate("/available-rooms");
  };

  return (
    <div>
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email
              </label>
              <input
                id="guest-email"
                name="guest_email"
                type="email"
                autoComplete="email"
                required
                className="relative block w-full rounded-md border-0 p-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                placeholder="Guest Email"
              />
            </div>
            <div>
              <label htmlFor="email-address" className="sr-only">
                Start Time
              </label>
              <input
                id="start-time"
                name="start_time"
                type="text"
                required
                className="relative block w-full rounded-md border-0 p-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                placeholder="YYYY-MM-DD HH:mm:ss"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                End Time
              </label>
              <input
                id="end-time"
                name="end_time"
                type="text"
                required
                className="relative block w-full rounded-md border-0 p-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                placeholder="YYYY-MM-DD HH:mm:ss"
              />
            </div>

            {formError && <p className="text-red-600">{formError}</p>}

            <div>
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateBooking;
