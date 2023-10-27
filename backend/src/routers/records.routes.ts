import express from "express";
import { RecordController } from "../controllers/records.controller";

const recordRouter = express.Router();
export default recordRouter;

recordRouter.route('/makeReview').post(
    (req, res) => new RecordController().makeReview(req, res)
)

recordRouter.route('/getAllRecordsForPatient').post(
    (req, res) => new RecordController().getAllRecordsForPatient(req, res)
)

recordRouter.route('/getRecordById').post(
    (req, res) => new RecordController().getRecordById(req, res)
)
