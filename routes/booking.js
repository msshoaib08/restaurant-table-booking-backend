import express from 'express';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

const bookings = [];

router.post('/', (req, res) => {
	try {
		const { name, date, time } = req.body;

		if (!name || !date || !time) {
			return res
				.status(400)
				.json({ message: 'Name, date, and time are required' });
		}

		const isAlreadyBooked = bookings.some(
			(booking) => booking.date === date && booking.time === time
		);

		if (isAlreadyBooked) {
			return res.status(400).json({ message: 'Time slot already taken' });
		}

		const booking = { id: uuidv4(), name, date, time };
		bookings.push(booking);
		res.status(201).json({ message: 'Booking created successfully', booking });
	} catch (error) {
		console.error('Error creating booking:', error);
		res
			.status(500)
			.json({ message: 'Failed to book. Please try again later.' });
	}
});

router.get('/', (req, res) => {
	const { date } = req.query;

	if (date) {
		const filteredBookings = bookings.filter(
			(booking) => booking.date === date
		);
		return res.json(filteredBookings);
	}

	res.json(bookings);
});

router.delete('/:id', (req, res) => {
	const id = req.params.id;
	const index = bookings.findIndex((booking) => booking.id === id);
	if (index !== -1) {
		bookings.splice(index, 1);
		res.status(200).json({ message: 'Booking deleted successfully' });
	} else {
		res.status(404).json({ message: 'Booking not found' });
	}
});

export default router;
