import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, fullname, password } = req.body;

  console.log("\nreq.body",req.body);

  if (
    [fullname, email, username, password].some((field) => field?.trim() == "")
  ) {
    throw new ApiError(400, "All fields are required");
  }

  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });


  if (existedUser) throw new ApiError(409, "Username or Email already exists");

  console.table(req.files)
  console.log("Req.files: ", req.files);
  console.log("Req.files.avatar: ", req.files.avatar);
  console.log("Req.files.avatar: ", req.files.avatar[0]);
  const avatarLocalPath = req.files?.avatar[0]?.path;

  // const coverImageLocalPath = req.files?.coverImage[0]?.path;
   
  let coverImageLocalPath;
  if(req.files && Array.isArray(req.files.coverImageLocalPath) && req.files.coverImageLocalPath.length() > 0){
    coverImageLocalPath = req.files?.coverImage[0]?.path;
  }

  if (!avatarLocalPath) throw new ApiError(400, "Avatar file is required");

  const avatar = await uploadOnCloudinary(avatarLocalPath)
   
  const coverImage = await uploadOnCloudinary(coverImageLocalPath)

  if (!avatar) throw new ApiError(400, "Avatar file is required");

  const user = await User.create({
    fullname,
    avatar:avatar.url,
    coverImage:coverImage?.url || "",
    email,
    password,
    username:username
  })

  const createdUser = await User.findById(user._id).select("-password -refershToken") // rmove password and refreshToken from createdUser object
  
   if(!createdUser)
 {
  throw new ApiError(500, "Something went wrong")
 }

return res.status(201).json(
  new ApiResponse(200, createdUser, "User regisetered successfully")
)
 
});

export { registerUser };

// 1.  get user detail from frontend .
// 2.  check all require things are present.
// 3.  check email and username is unique.
// 4.  check for images, check for avatar
// 5.  upload on cloudinary, check avatarr
// 6.  password hash.
// 7.  create user object - create entdry in db.
// 8.  remove password and refresh token from response.
// 9.  chck for user creation
// 10. return res
