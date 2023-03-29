import axios from "axios";

const BASE_API_URL = "http://localhost:8080";

const buildApiUrl = (endpoint) => {
  return `${BASE_API_URL}${endpoint}`;
};

class BookingService {
  async getAllBookings() {
    const resp = await axios.get(buildApiUrl("/booking/"));
    return resp.data;
  }

  async getAllAvailableRooms(params) {
    const resp = await axios.get(buildApiUrl("/room/available"), {
      params: params,
    });
    return resp.data;
  }

  async addRoomsOnExistingBooking(bookingId, selectedRooms = []) {
    const payload = {
      roomIds: selectedRooms.map((room) => room.id),
    };

    const resp = await axios.put(
      buildApiUrl(`/booking/${bookingId}/booked-rooms/add-room`),
      payload
    );
    return resp.data;
  }

  async createBooking(payload) {
    const resp = await axios.post(buildApiUrl("/booking/"), payload);
    return resp.data;
  }

  async getRoomDetails(bookingId) {
    const resp = await axios.get(
      buildApiUrl(`/booking/${bookingId}/room-details`)
    );
    return resp.data;
  }

  async updateEmail(bookingId, payload) {
    const resp = await axios.put(
      buildApiUrl(`/booking/${bookingId}/email`),
      payload
    );
    return resp.data;
  }

  async deleteBooking(bookingId) {
    const resp = await axios.delete(buildApiUrl(`/booking/${bookingId}`));
  }

  async deleteRoomOnExistingBooking(roomId, bookingId) {
    const resp = await axios.put(
      buildApiUrl(`/booking/${bookingId}/booked-rooms/cancel-room/${roomId}`)
      // { room_id: roomId }
    );
    return resp.data;
  }

  async checkOut(bookingId) {
    const response = await axios.put(
      buildApiUrl(`/booking/${bookingId}/checkout`)
    );

    return response.data;
  }
}

export default new BookingService();
