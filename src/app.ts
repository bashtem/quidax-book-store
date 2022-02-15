import * as express from 'express';
import { okSuccess } from './utils/response';
import {router} from './routes/index.routes'
import * as dotEnv from 'dotenv'
import * as path from 'path'

const app =  express();

app.use(express.json());

app.use('/api/v1', express.static(path.join(__dirname, 'public')))

dotEnv.config({path: '../.env'});

app.use('/api/v1', router);

app.get('/api/v1', (req: express.Request, res: express.Response) => {

    return okSuccess(res, {}, "Welcome to Book Store API");
})

export default app;