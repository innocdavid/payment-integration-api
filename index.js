import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import colors from 'colors';

const app = express();

dotenv.config();
app.use(cors());
app.use(express.json());
app.use(morgan('tiny'));


app.get('/', async(req, res) => {
    res.status(200).json({ data, message: 'request successful' });
});

const PORT = process.env.PORT || 8080;
const HOST = process.env.HOST || 'localhost';

app.listen(PORT, () => {
    console.log(`server running on http://${HOST}:${PORT}`.bgBlue);
});