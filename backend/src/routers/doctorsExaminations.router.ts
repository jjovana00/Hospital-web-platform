import express from "express";
import { DoctorsExaminationsController } from "../controllers/doctorsExaminations.controller";

const doctorsExamRouter = express.Router();
export default doctorsExamRouter;

doctorsExamRouter.route('/getAllExaminations').post(
    (req, res) => new DoctorsExaminationsController().getDoctorsExaminations(req, res)
)

doctorsExamRouter.route('/addNewExamForDoctor').post(
    (req, res) => new DoctorsExaminationsController().addNewExamForDoctor(req, res)
)
doctorsExamRouter.route('/removeExamForDoctor').post(
    (req, res) => new DoctorsExaminationsController().removeExamForDoctor(req, res)
)
doctorsExamRouter.route('/deleteExamForDoctors').post(
    (req, res) => new DoctorsExaminationsController().deleteExamForDoctors(req, res)
)

