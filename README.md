# Booking System

Booking system built with React.

## Overview

This project is built using React, Vite, and TypeScript, with TailwindCSS for styling. The UI allows users to:

- View available resources.
- Make bookings for resources.
- Manage resources and bookings.

## Features

- **React for the user interface.**
- **TypeScript for type safety.**
- **TailwindCSS for utility-first styling.**
- **Vite for fast builds and development.**
- **API Integration with the backend to handle resources and bookings.**

## Getting Started

### Requirements

- Node.js 16.x or later
- npm 7.x or later

### Installation

1. Clone the repository:
```bash
git clone https://github.com/vasilevdimitrij/BookingSystemUI.git
cd react-booking-system
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## API Integration
This project interacts with the Simple Booking System API. Ensure that the backend is running on http://localhost:5157 or change the API endpoint in the code to match your setup.

The frontend communicates with the following endpoints:
- **GET `/api/resources`: Retrieve available resources.**
- **POST `/api/bookings`: Create a new booking.**
- **GET `/api/bookings`: Retrieve all bookings.**
- **POST `/api/resources`: Add a new resource.**
- **PUT `/api/resources/{id}`: Update an existing resource.**
- **DELETE `/api/resources/{id}`: Delete a resource.**



