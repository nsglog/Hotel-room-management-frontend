import React from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditOptions = () => {
  const navigate = useNavigate();
  const params = useParams();

  const handleAddRoom = () => {
    navigate(`/editBooking/${params.id}`);
  };

  return (
    <div className="page-edit-options">
      <div className="h-screen flex items-center justify-center space-x-5">
        <button
          className="rounded text-white font-semibold bg-gray-600 hover:bg-black py-2 px-6"
          onClick={() => {
            navigate(`/update-email/${params.id}`);
          }}
        >
          Update guest email
        </button>
        <button
          className="rounded text-white font-semibold bg-gray-600 hover:bg-black py-2 px-6"
          onClick={handleAddRoom}
        >
          Add Room
        </button>
      </div>
    </div>
  );
};

export default EditOptions;
