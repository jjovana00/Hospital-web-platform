import * as express from 'express';
import DoctorsExaminations from '../models/doctorsexaminations'


export class DoctorsExaminationsController {

    getDoctorsExaminations = (req : express.Request, res : express.Response) =>{
        DoctorsExaminations.findOne({'doctor' : req.body.doctor}, (err, data) => {
            if (err) console.log(err)
            else if (data) res.json(data.examination)
            else res.json([])
        })
    }

    addNewExamForDoctor = (req : express.Request, res : express.Response) =>{
        DoctorsExaminations.findOne({'doctor' : req.body.doctor}, async (err, data) => {
            if (err) console.log(err)
            else{
                const newExam = {
                    name : req.body.name,
                    cost : req.body.cost,
                    duration : req.body.duration,
                    approved : req.body.approved
                }
                if (data){
                    data.examination.push(newExam);
                    await data.save().then(spec => {
                        res.status(200).json({'message' : 'Examination added successfully'})
                    }).catch(err=>{
                        res.status(400).json({'message' : 'error'})
                    })
                }
                else{
                    const newElement = new DoctorsExaminations({
                        doctor : req.body.doctor,
                        examination : newExam
                    })
                    await newElement.save().then(spec => {
                        res.status(200).json({'message' : 'Examination added successfully'})
                    }).catch(err=>{
                        res.status(400).json({'message' : 'error'})
                    })
                }
            }
        })
    }

    removeExamForDoctor = (req : express.Request, res : express.Response) =>{
        DoctorsExaminations.findOne({'doctor' : req.body.doctor}, async (err, data) => {
            if (err) console.log(err)
            else{
                data.examination.forEach(e => {
                    if (e.name == req.body.name){
                        data.examination.splice(data.examination.indexOf(e), 1)
                    }
                });
                await data.save().then(spec => {
                    res.status(200).json({'message' : 'Examination removed successfully'})
                }).catch(err=>{
                    res.status(400).json({'message' : 'error'})
                })
            }
        })
    }

    deleteExamForDoctors = (req : express.Request, res : express.Response) =>{
        DoctorsExaminations.find((err, data) =>{
            if (err) console.log(err)
            else {
                data.forEach(element => {
                    let flag = false;
                    element.examination.forEach(exam => {
                        if (exam.name == req.body.examName) {
                            element.examination.splice(element.examination.indexOf(exam), 1)
                            flag = true
                        }
                    });
                    if (flag) {
                        element.save().then(el => {
                        }).catch(err=>{
                            res.status(400).json({'message' : 'error'})
                        })
                    }
                });

                res.json({"message" : "ok"})
            }
        })
    }
}