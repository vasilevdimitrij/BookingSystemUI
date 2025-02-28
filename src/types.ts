export interface Resource {
  id: string;
  name: string;
  totalQuantity: number;
}

export interface Booking {
  id: string;
  resourceId: string;
  quantity: number;
  startTime: Date;
  endTime: Date;
}

export interface BookingFormData {
  resourceId: string;
  quantity: number;
  startTime: string;
  endTime: string;
}
