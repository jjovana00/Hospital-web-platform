import * as express from 'express';
import Appointment from '../models/appointment'


export class AppointmentController {

    makeAppointment = (req : express.Request, res : express.Response) =>{
        const newAppStart = new Date(req.body.dateTime).getTime();
        const newAppEnd =  new Date(newAppStart + parseInt(req.body.duration) * 60 * 1000)
        let id = 1
        Appointment.find({'doctor' : req.body.doctor}, (err, appointments) => {
            if (err) console.log(err)
            else if (appointments.length != 0) {
                let flag = false
                appointments.forEach((app) => {
                    const appointmentStart = new Date(app.dateTime).getTime();
                    const appointmentEnd = new Date(appointmentStart + parseInt(app.duration) * 60 * 1000);
                    if (newAppStart < appointmentEnd.getTime() && newAppEnd.getTime() > appointmentStart) {
                        flag = true
                    }
                })
                if (flag) return res.json({'message' : "The appointment is alredy taken!"})
                id = appointments[appointments.length - 1].id + 1;
            }

            let app = new Appointment(
                {
                    id : id,
                    doctor : req.body.doctor,
                    patient : req.body.patient,
                    examName : req.body.examName,
                    dateTime : req.body.dateTime,
                    duration : req.body.duration,
                    department : req.body.department,
                    hasReview : false
                }
            )

            app.save().then(spec=>{
                res.status(200).json({'message' : 'ok'})
            }).catch(err=>{
                res.status(400).json({'message' : 'error'})
            })
        })
    }

    getPatientsAppointments = (req : express.Request, res : express.Response) =>{
        Appointment.find({'patient' : req.body.patient}, (err, data) => {
            if (err) console.log(err)
            else res.json(data)
            
        })
    }

    deleteApp = (req : express.Request, res : express.Response) => {
        const id = req.params.id;
        Appointment.findByIdAndRemove(id, (err, result) => {
            if (err) {
              console.log(err)
            }
            return res.json({ message: 'Appointment canceled successfully' });
        });
    }

    getDoctorsPastAppointments = (req : express.Request, res : express.Response) =>{
        const now = new Date().getTime()
        Appointment.find({$and : [{'doctor' : req.body.doctor}, {'hasReview' : false}]}, (err, appointments) => {
            if (err) console.log(err)
            else if (appointments.length != 0) {
                let pastApp = []
                appointments.forEach((app) => {
                    const appointmentStart = new Date(app.dateTime).getTime();
                    if (now > appointmentStart) pastApp.push(app)
                })
                res.json(pastApp)
            }
            else res.json([])
        })
    }

    getDoctorsFutureAppointments = (req : express.Request, res : express.Response) => {
        const now = new Date().getTime()
        Appointment.find({$and : [{'doctor' : req.body.doctor}, {'hasReview' : false}]}, (err, appointments) => {
            if (err) console.log(err)
            else if (appointments.length != 0) {
                let futureApp = []
                appointments.forEach((app) => {
                    const appointmentStart = new Date(app.dateTime).getTime();
                    if (now < appointmentStart) futureApp.push(app)
                })
                res.json(futureApp)
            }
            else res.json([])
        })
    }

    setHasReview = (req : express.Request, res : express.Response) => {
        Appointment.updateOne({id : req.body.id}, {$set: {hasReview : true}}, (err)=>{
            if (err) console.log(err);
            else res.json({'message' : 'ok'})
        })
    }

}