import express from "express";
import { AppointmentController } from "../controllers/appointment.controller";

const appointmentRouter = express.Router();
export default appointmentRouter;

appointmentRouter.route('/makeAppointment').post(
    (req, res) => new AppointmentController().makeAppointment(req, res)
)

appointmentRouter.route('/getPatientsAppointments').post(
    (req, res) => new AppointmentController().getPatientsAppointments(req, res)
)

appointmentRouter.route('/deleteApp/:id').delete(
    (req, res) => new AppointmentController().deleteApp(req, res)
)

appointmentRouter.route('/getDoctorsPastAppointments').post(
    (req, res) => new AppointmentController().getDoctorsPastAppointments(req, res)
)

appointmentRouter.route('/getDoctorsFutureAppointments').post(
    (req, res) => new AppointmentController().getDoctorsFutureAppointments(req, res)
)

appointmentRouter.route('/setHasReview').post(
    (req, res) => new AppointmentController().setHasReview(req, res)
)