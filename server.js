import path from 'path';
import express from 'express';
import webpack from 'webpack';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import api from './src/api/';
import config from './webpack.config';
import dbConfigFile from './config/config';

const dbConfig = dbConfigFile[process.env.NODE_ENV];
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://'+'cc2017'+':'+'12345' + '@104.198.249.209:27017/mydb');

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', ()=>{
    console.log('connected');
});

const port = process.env.PORT || 3000;
const app = express();
const compiler = webpack(config);

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

// app.use(require('webpack-dev-middleware')(compiler, {
//   publicPath: config.output.publicPath,
//   stats: {
//     colors: true,
//   },
// }));
app.use('/api', api);
app.use('/static', express.static('public'));
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'index.html'));
// });

app.listen(port, err => {
  if (err) {
    console.log(err);
    return;
  }
  console.log(`Listening at http://localhost:${port}`);
});