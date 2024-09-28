import { Router } from "express";
import { registerUser, loginUser, logoutUser} from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";
const router = Router()

router.route("/register").post(
    upload.fields([
        {
            name:"avatar",
            maxcount:1
        },
        {
            name:"coverImage",
            maxcount:1
        }
    ]),
    registerUser
    
    
)
// http://localhost:8000/api/v1/users/register

router.route("/login").post(loginUser)

//secured routes
router.route("/logout").post(verifyJwt,logoutUser)


export default  router