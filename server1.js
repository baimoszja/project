const express = require('express');
const { MongoClient } = require('mongodb');
const app = express();
const port = 4000;

// MongoDB Atlas Connection
const uri = 'mongodb+srv://soxy118855:0810145706@cluster0.jvzgx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const client = new MongoClient(uri);

let database;

// เชื่อมต่อ MongoDB
async function connectToDatabase() {
    try {
        await client.connect();
        database = client.db('ProjectSathu'); // ชื่อฐานข้อมูล
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
}
connectToDatabase();

app.use(express.json());

// Route สำหรับ Root URL
app.get('/', (req, res) => {
    res.send('Welcome to the API!');
});

// Route สำหรับดึงข้อมูลจาก MongoDB
app.get('/data', async (req, res) => {
    try {
        const collection = database.collection('Buddha'); // ชื่อ Collection
        const data = await collection.find({}).toArray();
        console.log(data)
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching data');
    }
});

// Route สำหรับเพิ่มข้อมูลใน MongoDB
app.post('/data', async (req, res) => {
    try {
        const collection = database.collection('Buddha'); // ชื่อ Collection
        const result = await collection.insertOne(req.body);
        res.status(201).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error adding data');
    }
});

app.listen(port, '0.0.0.0', () => {
    console.log(`Server running on http://192.168.1.103:${port}`);
});

