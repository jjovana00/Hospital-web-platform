import * as express from 'express';
import Notification from '../models/notifications'
import mongoose from 'mongoose';


export class NotificationController {
    makeNotification = (req: express.Request, res : express.Response)=>{
        let not = new Notification(
            {
                reciever : req.body.reciever,
                notification : req.body.notification,
                isRead : req.body.isRead,
                dateTime : req.body.dateTime,
            }
        )

        not.save().then(spec=>{
            res.status(200).json({'message' : 'ok'})
        }).catch(err=>{
            res.status(400).json({'message' : 'error'})
        })
    }

    getUsersNotifications = (req: express.Request, res : express.Response)=>{
        Notification.find({'reciever' : req.body.user}, (err, nots)=>{
            if (err) console.log(err)
            else res.json(nots)
        })
    }

    markAsRead = (req: express.Request, res : express.Response)=>{
        const ObjectId = mongoose.Types.ObjectId;
        Notification.collection.updateOne({$and: [{"reciever" : req.body.reciever}, 
        {"notification" : req.body.notification}]}, {$set: {'isRead' : true}}, (err)=>{
            if (err) console.log(err)
            else res.json({"message" : 'ok'})
        })

       
    }
}      