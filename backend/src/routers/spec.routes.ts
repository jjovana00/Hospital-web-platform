import express from "express";
import { SpecController } from "../controllers/spec.controller";

const specRouter = express.Router();
export default specRouter;

specRouter.route('/getAllSpecializations').get(
    (req, res) => new SpecController().getAllSpecializations(req, res)
)

specRouter.route('/deleteSpec/:id').delete(
    (req, res) => new SpecController().deleteSpec(req, res)
)

specRouter.route('/addNewSpec').post(
    (req, res) => new SpecController().addNewSpec(req, res)
)

specRouter.route('/addNewExam').post(
    (req, res) => new SpecController().addNewExam(req, res)
)

specRouter.route('/deleteExam').post(
    (req, res) => new SpecController().deleteExam(req, res)
)

specRouter.route('/acceptExam').post(
    (req, res) => new SpecController().acceptExam(req, res)
)

specRouter.route('/getApprovedExams').post(
    (req, res) => new SpecController().getApprovedExams(req, res)
)

specRouter.route('/addReqForExam').post(
    (req, res) => new SpecController().addReqForExam(req, res)
)

specRouter.route('/updateExam').post(
    (req, res) => new SpecController().updateExam(req, res)
)

specRouter.route('/getExam').post(
    (req, res) => new SpecController().getExam(req, res)
)
