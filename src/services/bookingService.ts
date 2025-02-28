import { Booking, BookingFormData, Resource } from "../types";

export const getResources = async (): Promise<Resource[]> => {
  try {
    const response = await fetch("http://localhost:5157/api/resources");
    if (!response.ok) {
      throw new Error("Failed to fetch resources");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching resources:", error);
    return [];
  }
};

export const getBookings = async (): Promise<Booking[]> => {
  try {
    const response = await fetch("http://localhost:5157/api/bookings");
    if (!response.ok) {
      throw new Error("Failed to fetch bookings");
    }
    const bookings = await response.json();

    return bookings.map((booking: Booking) => ({
      ...booking,
      startTime: new Date(booking.startTime),
      endTime: new Date(booking.endTime),
      quantity: Number(booking.quantity),
    }));
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return [];
  }
};

export const createBooking = async (
  bookingData: BookingFormData
): Promise<{ success: boolean; booking?: Booking; message?: string }> => {
  const { resourceId, quantity, startTime, endTime } = bookingData;

  try {
    const response = await fetch(
      `http://localhost:5157/api/bookings?resourceId=${resourceId}&quantity=${quantity}&startTime=${startTime}&endTime=${endTime}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      return {
        success: false,
        message:
          errorData?.message ||
          `Error: ${response.status} ${response.statusText}`,
      };
    }

    const newBooking = await response.json();

    return {
      success: true,
      booking: {
        ...newBooking,
        startTime: new Date(newBooking.startTime),
        endTime: new Date(newBooking.endTime),
        quantity: Number(newBooking.quantity),
      },
    };
  } catch (error) {
    console.error("Error creating booking:", error);
    return { success: false, message: "Error creating booking" };
  }
};
