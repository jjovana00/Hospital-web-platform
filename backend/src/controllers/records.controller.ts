import * as express from 'express';
import Record from '../models/records'


export class RecordController {
    makeReview = (req: express.Request, res : express.Response)=>{
        let review = new Record(
            {
                appointmentId : req.body.appointmentId,
                doctor : req.body.doctor,
                specialization : req.body.specialization,
                patient : req.body.patient,
                dateTime : req.body.dateTime,
                reasonForVisit : req.body.reasonForVisit,
                diagnosis : req.body.diagnosis,
                prescribedTherapy : req.body.prescribedTherapy,
                nextControl : req.body.nextControl
            }
        )

        review.save().then(spec=>{
            res.status(200).json({'message' : 'ok'})
        }).catch(err=>{
            res.status(400).json({'message' : 'error'})
        })
    }

    getAllRecordsForPatient = (req: express.Request, res : express.Response)=>{
        Record.find({'patient' : req.body.patient}, (err, data) => {
            if (err) console.log(err)
            else{
                if (data.length == 0) res.json([])
                else res.json(data)
            }
        })
    }

    getRecordById = (req: express.Request, res : express.Response)=>{
        Record.findOne({'appointmentId' : req.body.appointmentId}, (err, data) => {
            if (err) console.log(err)
            else res.json(data)
        })
    }
}