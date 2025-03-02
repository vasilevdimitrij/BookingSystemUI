import { useState, useEffect } from "react";
import { Resource, BookingFormData, Booking } from "./types";
import ResourceList from "./components/ResourceList";
import BookingForm from "./components/BookingForm";
import Notification from "./components/Notification";
import BookingList from "./components/BookingList";
import {
  getResources,
  createBooking,
  getBookings,
} from "./services/bookingService";

function App() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [selectedResource, setSelectedResource] = useState<Resource | null>(
    null
  );
  const [notification, setNotification] = useState<{
    show: boolean;
    type: "success" | "error";
    message: string;
  }>({
    show: false,
    type: "success",
    message: "",
  });
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [loadingBookings, setLoadingBookings] = useState(true);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        setLoading(true);
        const resourceData = await getResources();
        setResources(resourceData);
        setError(null);
      } catch {
        setError("Failed to load resources. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchResources();
  }, []);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoadingBookings(true);
        const bookingData = await getBookings();
        setBookings(bookingData);
      } catch {
        return [];
      } finally {
        setLoadingBookings(false);
      }
    };

    fetchBookings();
  }, []);

  const handleSelectResource = (resourceId: string) => {
    const resource = resources.find((r) => r.id === resourceId) || null;
    setSelectedResource(resource);
    setShowBookingForm(true);
  };

  const handleBookingSubmit = async (data: BookingFormData) => {
    try {
      const result = await createBooking(data);

      if (result.success) {
        setNotification({
          show: true,
          type: "success",
          message: "Booking created successfully!",
        });
        setShowBookingForm(false);
        setSelectedResource(null);

        const updatedBookings = await getBookings();
        const updatedResources = await getResources();
        setBookings(updatedBookings);
        setResources(updatedResources);
      } else {
        setNotification({
          show: true,
          type: "error",
          message: result.message || "Failed to create booking.",
        });
      }
    } catch {
      setNotification({
        show: true,
        type: "error",
        message: "An unexpected error occurred. Please try again.",
      });
    }
  };

  const handleCloseNotification = () => {
    setNotification((prev) => ({ ...prev, show: false }));
  };

  const handleCancelBooking = () => {
    setShowBookingForm(false);
    setSelectedResource(null);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-gray-900">Booking System</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-800 rounded-md p-4 mb-6">
            <p>{error}</p>
          </div>
        )}

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <ResourceList
                resources={resources}
                onSelectResource={handleSelectResource}
              />
            </div>

            <div>
              {showBookingForm && (
                <BookingForm
                  resource={selectedResource}
                  onSubmit={handleBookingSubmit}
                  onCancel={handleCancelBooking}
                />
              )}
            </div>
          </div>
        )}

        {loadingBookings ? (
          <div className="flex justify-center items-center py-6">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <BookingList bookings={bookings} />
        )}
      </main>

      {notification.show && (
        <Notification
          type={notification.type}
          message={notification.message}
          onClose={handleCloseNotification}
        />
      )}
    </div>
  );
}

export default App;
