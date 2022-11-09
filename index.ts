import express, {Express, Request, Response} from 'express';

const app: Express = express();
const PORT = 8001 || process.env.PORT;

app.use(express.json());

app.get("/", (request: Request, response: Response) => {
    response.json({message: "Index page using TS"});
});

app.listen(PORT, () => {
    console.log(`Application running on http://localhost:${PORT}`);
});