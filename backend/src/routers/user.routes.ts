import express from "express";
import { UserController } from "../controllers/user.controller";

const userRouter = express.Router();
export default userRouter;

userRouter.route('/login').post(
    (req, res) => new UserController().login(req,res)
)

userRouter.route('/register').post(
        (req, res) => {
            return new UserController().register(req, res)
        }
)

userRouter.route('/getAllDoctors').get(
    (req, res) => new UserController().getAllDoctors(req,res)
)

userRouter.route('/getAllPatients').get(
    (req, res) => new UserController().getAllPatients(req,res)
)

userRouter.route('/getSignUpRequests').get(
    (req, res) => new UserController().getSignUpRequests(req, res)
)

userRouter.route('/acceptPatient').post(
    (req, res) => new UserController().acceptPatient(req, res)
)

userRouter.route('/rejectPatient').post(
    (req, res) => new UserController().rejectPatient(req, res)
)

userRouter.route('/deleteUser/:id').delete(
    (req, res) => new UserController().deleteUser(req, res)
)

userRouter.route('/getUser').get(
    (req, res) => new UserController().getUser(req, res)
)

userRouter.route('/updateUser').post(
    (req, res) => new UserController().updateUser(req, res)
)

userRouter.route('/updatePhoto').post(
    (req, res) => new UserController().updatePhoto(req, res)
)

userRouter.route('/changePassword').post(
    (req, res) => new UserController().changePassword(req, res)
)

userRouter.route('/loginAdmin').post(
    (req, res) => new UserController().loginAdmin(req, res)
)
