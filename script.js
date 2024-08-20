const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected successfully');
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

module.exports = connectDB;

const mongoose = require('mongoose');

const ServiceSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Service', ServiceSchema);

const mongoose = require('mongoose');

const TestimonialSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    feedback: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Testimonial', TestimonialSchema);

const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
    name: {a
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Contact', ContactSchema);

const express = require('express');
const router = express.Router();
const Service = require('../models/Service');

// Get all services
router.get('/', async (req, res) => {
    try {
        const services = await Service.find();
        res.json(services);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// Add a new service
router.post('/', async (req, res) => {
    const { title, description, price } = req.body;
    try {
        const newService = new Service({ title, description, price });
        const service = await newService.save();
        res.json(service);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const Testimonial = require('../models/Testimonial');

// Get all testimonials
router.get('/', async (req, res) => {
    try {
        const testimonials = await Testimonial.find();
        res.json(testimonials);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// Add a new testimonial
router.post('/', async (req, res) => {
    const { name, feedback } = req.body;
    try {
        const newTestimonial = new Testimonial({ name, feedback });
        const testimonial = await newTestimonial.save();
        res.json(testimonial);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

// Get all contact messages (optional, for admin view)
router.get('/', async (req, res) => {
    try {
        const contacts = await Contact.find();
        res.json(contacts);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// Add a new contact message
router.post('/', async (req, res) => {
    const { name, email, message } = req.body;
    try {
        const newContact = new Contact({ name, email, message });
        const contact = await newContact.save();
        res.json(contact);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

module.exports = router;

const express = require('express');
const connectDB = require('./config/db');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/services', require('./routes/services'));
app.use('/api/testimonials', require('./routes/testimonials'));
app.use('/api/contact', require('./routes/contact'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));