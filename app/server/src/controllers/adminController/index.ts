import adminLogin from "./adminLogin";
import adminCreateJob from "./adminCreateJob";
import adminGetJobs from "./adminGetJobs";
import adminDeleteJob from "./adminDeleteJob";

const adminController = {
  login: adminLogin,
  createJob: adminCreateJob,
  deleteJob: adminDeleteJob,
  getJobs: adminGetJobs,
}


export default adminController;