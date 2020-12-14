import express from 'express';
import env from './env';
import { cors } from "./middlewares/cors";

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());


app.get('/', async (req, res) => {
  res.send('Ahoj');
});

app.listen(env.port, () => {
  console.log(`server started at http://localhost:${env.port}`);
});
