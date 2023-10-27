import * as express from 'express';
import User from '../models/user'
import multer from 'multer'


export class UserController{

    validatePassword(password) {
        if (password.length < 8) {
          return false;
        }
      
        if (password.length > 14) {
          return false;
        }
      
        if (!/^[a-zA-Z]/.test(password)) {
          return false;
        }
      
        if (!/[A-Z]/.test(password)) {
          return false;
        }
      
        if (!/\d/.test(password)) {
          return false;
        }
      
        if (!/[!@#$%^&*]/.test(password)) {
          return false;
        }
      
        for (let i = 0; i < password.length - 1; i++) {
          if (password[i] === password[i + 1]) {
            return false;
          }
        }
      
        return true;
    }

    private storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'userImages/');
        },
        filename: (req, file, cb) => {
          cb(null, Date.now() + '-' + file.originalname);
        }
      });
      
    private upload = multer({ storage: this.storage });

    register = async (req: any, res : express.Response)=>{
        let imagePath;
        this.upload.single('file')(req, res, async (err: any) => {
            if (err) {
                return res.status(400).json({ message: 'File upload failed 1' });
            }
            imagePath = "default.jpg"
            if (req.file) {
                imagePath = req.file.filename
            }

            const emailUser = await User.findOne({'email' : req.body.email}).exec()
            if (emailUser){
                return res.json({message : 'Acount with choosen email alredy exists!'})
            }
            
            const existigUser = await User.findOne({'username' : req.body.username}).exec();
            if (existigUser){
                return res.json({message : 'User with choosen username alredy exists!'})
            }


            if (req.body.password != req.body.passwordCon){
                return res.json({message : 'Password confirmation does not match with the password!'})
            
            }
        

            if (!this.validatePassword(req.body.password)) {
                return res.json({ message: 'Password must have at least 1 upper, 1 lower case, 1 numeric character and must be between 8 and 14 characters long!' });
            }

            let user = new User(
                {
                    firstname : req.body.firstname,
                    lastname : req.body.lastname,
                    username : req.body.username,
                    password : req.body.password,
                    passwordCon : req.body.passwordCon,
                    adress : req.body.adress,
                    telephone : req.body.telephone,
                    email : req.body.email,
                    type : req.body.type,
                    approved : req.body.approved,
                    licenceNum : req.body.licenceNum,
                    specialization : req.body.specialization,
                    department : req.body.department,
                    img : imagePath
                }
            )
            
            
            await user.save().then(user=>{
                res.status(200).json({'message' : 'user added'})
            }).catch(err=>{
                res.status(400).json({'message' : 'error'})
            })

            
        });

        

        
    }

    login = (req: express.Request, res : express.Response)=>{
        let username = req.body.username;
        let password = req.body.password;

        User.findOne({$and: [{'username' : username, 'password' : password}, {'type' : {$ne: 2}}]}, (err, user)=>{
            if (err) console.log(err)
            else res.json(user)
        })
    }

    loginAdmin = (req: express.Request, res : express.Response)=>{
        let username = req.body.username;
        let password = req.body.password;

        User.findOne({$and: [{'username' : username, 'password' : password}, {'type' : 2}]}, (err, user)=>{
            if (err) console.log(err)
            else res.json(user)
        })
    }

    getAllDoctors = (req : express.Request, res : express.Response) => {
        User.find({'type' : 1}, (err, users)=>{
            if (err) console.log(err);
            else res.json(users);
        })
    }

    getAllPatients = (req : express.Request, res : express.Response) => {
        User.find({
            $and: [
                {'type' : 0},
                { 'approved' : 1 }
            ]
            }, (err, users)=>{
            if (err) console.log(err);
            else res.json(users);
        })
    }

    getSignUpRequests = (req : express.Request, res : express.Response) => {
        User.find({'approved' : 0}, (err, users) =>{
            if (err) console.log(err);
            else res.json(users)
        })
    }

    acceptPatient = (req : express.Request, res : express.Response) => {
        User.updateOne({username : req.body.username}, {$set: {approved : 1}}, (err)=>{
            if (err) console.log(err);
            else res.json({'message' : 'Request is accepted!'})
        })
    }

    rejectPatient = (req : express.Request, res : express.Response) => {
        User.updateOne({username : req.body.username}, {$set: {approved : -1}}, (err)=>{
            if (err) console.log(err);
            else res.json({'message' : 'Request is rejected!'})
        })
    }

    deleteUser = (req : express.Request, res : express.Response) => {
        const id = req.params.id;
        User.findByIdAndRemove(id, (err, result) => {
            if (err) {
              console.log(err)
            }
            return res.json({ message: 'User deleted successfully' });
        });
    }

    getUser = (req : express.Request, res : express.Response) => {
        let param = req.query.param;
        User.findOne({"username" : {$regex : param}}, (err, user)=>{
            if (err) console.log(err);
            else res.json(user);
            
        })
    }

    updateUser = async (req : express.Request, res : express.Response) => {
        User.findOne({"username" : req.body.username}, async (err, user) => {
            if (err) console.log(err)
            else {
                if (req.body.firstname != "") user.firstname = req.body.firstname;
                if (req.body.lastname != "") user.lastname = req.body.lastname;
                if (req.body.telephone != "") user.telephone = req.body.telephone;
                if (req.body.adress != "") user.adress = req.body.adress;
                if (req.body.licenceNum != "") user.licenceNum = parseInt(req.body.licenceNum);
                if (req.body.department != "") user.department = req.body.department;
                await user.save().then(user=>{
                    res.status(200).json({'message' : 'User updated!'})
                }).catch(err=>{
                    res.status(400).json({'message' : 'error'})
                })
            }

        })
    }

    updatePhoto = (req : any, res : express.Response) => {
        let imagePath;
        this.upload.single('file')(req, res, async (err: any) => {
            if (err) {
                return res.status(400).json({ message: 'File upload failed 1' });
            }
            imagePath = req.file.filename
            await User.collection.updateOne({'username' : req.body.username}, {$set : {'img' : imagePath}}, (err) =>{
                if (err) console.log(err)
                else res.json({'message' : 'User updated!'})
            })
        })
    }

    changePassword = (req : express.Request, res : express.Response) => {
        let username = req.body.username;
        let oldP = req.body.oldP;
        let newP = req.body.newP;
        if (this.validatePassword(newP)){
            User.findOne({'username' : username, 'password' : oldP}, (err, user)=>{
                if (err) console.log(err)
                else {
                    if (!user) return res.json({"message" : "Old password is not valid!"})
                    User.collection.updateOne({'username' : username}, {$set : {'password' : newP}}, (err) => {
                        if (err) console.log(err)
                        else res.json({'message' : 'ok'})
                    })
                }
            })
        }
        else return res.json({ message: 'Password must have at least 1 upper, 1 lower case, 1 numeric character and must be between 8 and 14 characters long!' });
    }
}