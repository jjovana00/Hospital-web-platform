import express from "express";
import { NotificationController } from "../controllers/notification.controller";

const notificationRouter = express.Router();
export default notificationRouter;

notificationRouter.route('/makeNotification').post(
    (req, res) => new NotificationController().makeNotification(req, res)
)

notificationRouter.route('/getUsersNotifications').post(
    (req, res) => new NotificationController().getUsersNotifications(req, res)
)

notificationRouter.route('/markAsRead').post(
    (req, res) => new NotificationController().markAsRead(req, res)
)
