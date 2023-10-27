import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import userRouter from './routers/user.routes';
import specRouter from './routers/spec.routes';
import doctorsExamRouter from './routers/doctorsExaminations.router';
import path from 'path';
import appointmentRouter from './routers/appointment.routes';
import recordRouter from './routers/records.routes';
import notificationRouter from './routers/notification.routes';

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());


mongoose.connect('mongodb://127.0.0.1:27017/hospital');
const connection = mongoose.connection;
connection.once('open', ()=>{
    console.log('db connection ok')
});

const router = express.Router();

app.use('/', router);
router.use('/users', userRouter);
router.use('/specialization', specRouter)
router.use('/doctorsExam', doctorsExamRouter);
router.use('/appointment', appointmentRouter);
router.use('/records', recordRouter);
router.use('/notifications', notificationRouter)


app.use('/userImages', express.static('userImages'));

app.listen(4000, () => console.log(`Express server running on port 4000`));