# Heygen Video Translation Simulation

This project simulates a video translation platform backend and a client library. The backend processes videos with configurable delays and status updates, while the client library efficiently interacts with it.

## Features
- Configurable delays for simulating video processing.
- Socket.IO integration for real-time status updates.
- Error handling in the client library.
- Integration test to verify end-to-end functionality.

---

## Backend Setup

1. Install dependencies:
   cd backend
   npm install

## Configurations
- Port to run the server
PORT = 8000

- Simulated delay in processing the video translation, in milliseconds.
- This represents the time after which the server will complete video processing
DELAY = 1000

- Time in milliseconds after which an error can be simulated.
- Set to 0 if you do not want the server to throw any errors.
ERROR_TIME = 0

- CORS ORIGIN HOST TO ALLOW
CORS_ORIGIN_ALLOWED_HOST = http://localhost:3000