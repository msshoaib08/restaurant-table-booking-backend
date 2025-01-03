import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bookingRoutes from './routes/booking.js';
import timeSlotRoutes from './routes/timeSlot.js';

dotenv.config();

const server = express();
const PORT = process.env.PORT || 5001;

const allowedOrigins = [
	'http://localhost:3000',
	'https://restaurant-table-booking-frontend-ashy.vercel.app',
];

const corsOptions = {
	origin: function (origin, callback) {
		if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
			callback(null, true);
		} else {
			callback(new Error('Not allowed by CORS'));
		}
	},
};

server.use(express.json());
server.use(cors(corsOptions));

server.use('/api/bookings', bookingRoutes);
server.use('/api/available-times', timeSlotRoutes);

server.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
