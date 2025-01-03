import express from 'express';

const router = express.Router();

const allTimeSlots = [
	'00:00',
	'01:00',
	'02:00',
	'03:00',
	'04:00',
	'05:00',
	'06:00',
	'07:00',
	'08:00',
	'09:00',
	'10:00',
	'11:00',
	'12:00',
	'13:00',
	'14:00',
	'15:00',
	'16:00',
	'17:00',
	'18:00',
	'19:00',
	'20:00',
	'21:00',
	'22:00',
	'23:00',
];

const bookings = [];

router.get('/', (req, res) => {
	const { date } = req.query;

	if (!date) {
		return res.status(400).json({ message: 'Date is required' });
	}

	const bookedSlots = bookings
		.filter((booking) => booking.date === date)
		.map((booking) => booking.time);

	const availableSlots = allTimeSlots.filter(
		(slot) => !bookedSlots.includes(slot)
	);

	res.json({ availableSlots });
});

export default router;
