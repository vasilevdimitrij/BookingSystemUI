import React, { useState, useEffect } from "react";
import { Resource, BookingFormData } from "../types";
import { formatDate } from "../utils/dateUtils";

interface BookingFormProps {
  resource: Resource | null;
  onSubmit: (data: BookingFormData) => void;
  onCancel: () => void;
}

const BookingForm: React.FC<BookingFormProps> = ({
  resource,
  onSubmit,
  onCancel,
}) => {
  const [formData, setFormData] = useState<BookingFormData>({
    resourceId: "",
    quantity: 1,
    startTime: formatDate(new Date(), "en-US", true),
    endTime: formatDate(new Date(Date.now() + 86400000), "en-US", true),
  });

  useEffect(() => {
    if (resource) {
      setFormData((prev) => ({
        ...prev,
        resourceId: resource.id,
        quantity: 1,
      }));
    }
  }, [resource]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const newFormData = {
        ...prev,
        [name]: name === "quantity" ? Math.max(1, parseInt(value) || 1) : value,
      };

      if (name === "startTime") {
        const newStartTime = new Date(value);
        const formattedEndTime = formatDate(
          new Date(newStartTime.getTime() + 86400000),
          "en-US",
          true
        );
        newFormData.endTime = formattedEndTime;
      }

      return newFormData;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  if (!resource) return null;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center mb-4">
        <h2 className="text-xl font-semibold">Book {resource.name}</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Quantity (Max: {resource.quantity})
          </label>
          <input
            type="number"
            name="quantity"
            min="1"
            max={resource.quantity}
            value={formData.quantity}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Start Date
          </label>
          <input
            type="date"
            name="startTime"
            value={formData.startTime}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            End Date
          </label>
          <input
            type="date"
            name="endTime"
            value={formData.endTime}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="flex justify-end space-x-2 pt-2">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Book Now
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookingForm;
