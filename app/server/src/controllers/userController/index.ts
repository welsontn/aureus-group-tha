import userRegister from "./userRegister";
import userLogin from "./userLogin";
import userProfile from "./userProfile";
import userAppliedJobs from "./userAppliedJobs";

const userController = {
  register: userRegister,
  login: userLogin,
  profile: userProfile,
  appliedJobs: userAppliedJobs,
}


export default userController;