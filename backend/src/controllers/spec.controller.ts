import * as express from 'express';
import Spec from '../models/specialization'
import { networkInterfaces } from 'os';
import { json } from 'stream/consumers';

export class SpecController {
    getAllSpecializations =(req : express.Request, res : express.Response) => {
        Spec.find({}, (err, specs)=> {
            if (err) console.log(err);
            else res.json(specs)
        })
    }

    deleteSpec = (req : express.Request, res : express.Response) => {
        const id = req.params.id;
        Spec.findByIdAndRemove(id, (err, result) => {
            if (err) {
              console.log(err)
            }
            return res.json({ message: 'Spec deleted successfully' });
        });
    }

    addNewSpec = (req : express.Request, res : express.Response) => {
        let spec = new Spec(
            {
                name : req.body.name,
                examination : []
            }
        )

        spec.save().then(spec=>{
            res.status(200).json({'message' : 'Specialization added successfully'})
        }).catch(err=>{
            res.status(400).json({'message' : 'error'})
        })

    }

    addNewExam = (req : express.Request, res : express.Response) => {
        Spec.findOne({"name" : req.body.specialization}, async (err, spec) =>{
            if (err) console.log(err);
            else{
                const newExam = {
                    name : req.body.name,
                    cost : req.body.cost,
                    duration : req.body.duration,
                    approved : true
                }

                spec.examination.push(newExam);
                await spec.save().then(spec => {
                    res.status(200).json({'message' : 'Examination added successfully'})
                }).catch(err=>{
                    res.status(400).json({'message' : 'error'})
                })
                
            }
        })
    }

    deleteExam = (req : express.Request, res : express.Response) => {
        let specName = req.body.specName;
        let examName = req.body.examName;
        Spec.findOne({"name" : specName}, async (err, spec) => {
            let list = spec.examination;
            for (let i = 0; i < list.length; i++){
                if(list[i].name == examName){
                    list.splice(i, 1)
                    break;
                }
            }
            await Spec.collection.updateOne({'name' : specName}, {$set: {'examination' : list}}, (err)=>{
                if (err) console.log(err);
                else res.json({"message" : "Examination deleted successfully"})
            })
        })
    }

    acceptExam = (req : express.Request, res : express.Response) => {
        let specName = req.body.specName;
        let examName = req.body.examName;
        Spec.findOne({"name" : specName}, async (err, spec) => {
            let list = spec.examination;
            for (let i = 0; i < list.length; i++){
                if(list[i].name == examName){
                    list[i].approved = true
                    break;
                }
            }
            await Spec.collection.updateOne({'name' : specName}, {$set: {'examination' : list}}, (err)=>{
                if (err) console.log(err);
                else res.json({"message" : "Examination accepted"})
            })
        })
    }

    getApprovedExams = (req : express.Request, res : express.Response) => {
        Spec.findOne({"name" : req.body.name}, (err, spec) => {
            if (err) console.log(err)
            else if (spec.examination){
                let approvedExams = []
                spec.examination.forEach(e => {
                    if (e.approved == true) approvedExams.push(e)
                });
                res.json(approvedExams)
            }
        })
    }

    addReqForExam = (req : express.Request, res : express.Response) => {
        Spec.findOne({"name" : req.body.spec}, async (err, spec) =>{
            if (err) console.log(err);
            else{
                const newExam = {
                    name : req.body.name,
                    cost : req.body.cost,
                    duration : req.body.duration,
                    approved : false
                }

                spec.examination.push(newExam);
                await spec.save().then(spec => {
                    res.status(200).json({'message' : 'Request sent successfully'})
                }).catch(err=>{
                    res.status(400).json({'message' : 'error'})
                })
                
            }
        })
    }

    updateExam = (req : express.Request, res : express.Response) => {
        Spec.findOne({"name" : req.body.spec}, async (err, spec) =>{
            if (err) console.log(err);
            else{
                let list = spec.examination;
                list.forEach(e => {
                    if (e.name == req.body.exam){
                        e.cost = parseInt(req.body.cost);
                        e.duration = parseInt(req.body.duration);
                    }
                });
                await Spec.collection.updateOne({'name' : req.body.spec}, {$set: {'examination' : list}}, (err)=>{
                    if (err) console.log(err);
                    else res.json({"message" : "Examination has been updated successfully!"})
                })
            }
        })
    }

    getExam = (req : express.Request, res : express.Response) => {
        Spec.findOne({"name" : req.body.spec}, async (err, spec) =>{
            if (err) console.log(err);
            else{
                spec.examination.forEach(e => {
                    if (e.name == req.body.exam){
                       return res.json(e)
                    }
                });
            }
        })
    }
}