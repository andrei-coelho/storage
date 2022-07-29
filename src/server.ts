import express, { Express } from 'express';
import Config from './config';
import routes from './routes';

const config = Config.instance().json()
const app:Express = express()

app.use('/public',express.static(__dirname+'/public'));
app.use(express.json());
app.use(routes())

app.listen(config.port, () => {
    console.log(`App working at address ${config.address +":"+config.port}`)
})