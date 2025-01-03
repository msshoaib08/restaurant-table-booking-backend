import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bookingRoutes from './routes/booking.js';
import timeSlotRoutes from './routes/timeSlot.js';

dotenv.config();

const server = express();
const PORT = process.env.PORT || 5001;

server.use(express.json());
server.use(cors({ origin: 'http://localhost:3000' }));

server.use('/api/bookings', bookingRoutes);
server.use('/api/available-times', timeSlotRoutes);

server.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
