import Axios from "axios";

// ----------------------------------------------------------------
// Base URL Server
const baseURL = import.meta.env.VITE_API_URL;
// ----------------------------------------------------------------

// ====================== Authentication Apis ======================
// Variables path
const signup = "/userLoginApis/registerUser";
const resendOTPForEmailVerification = "/userLoginApis/emailVerificationUser";
const emailVerificationCompletion = "/userLoginApis/emailVerificationCompletion";
const login = "/userLoginApis/loginUser";
const loggedInUpdateUser = "/userLoginApis/loggedInUpdateUser";
const changePasswordUser = "/userLoginApis/changePasswordUser";
const ViewUserProfile = "/userLoginApis/ViewUserProfile";
const logoutUser = "/userLoginApis/logoutUser";
const forgetPasswordUser = "/userLoginApis/forgetPasswordUser";
const forgetPasswordUserChanged = "/userLoginApis/forgetPasswordUserChanged";

// Export Function 
export const signupAPI = () => `${baseURL}${signup}`;
export const resendOTPForEmailVerificationAPI = () => `${baseURL}${resendOTPForEmailVerification}`;
export const emailVerificationCompletionAPI = () => `${baseURL}${emailVerificationCompletion}`;
export const loginAPI = () => `${baseURL}${login}`;
export const loggedInUpdateUserAPI = () => `${baseURL}${loggedInUpdateUser}`;
export const changePasswordUserAPI = () => `${baseURL}${changePasswordUser}`;
export const UserEditProfileAPI = () => `${baseURL}${UserEditProfile}`;
export const ViewUserProfileAPI = () => `${baseURL}${ViewUserProfile}`;
export const logoutUserAPI = () => `${baseURL}${logoutUser}`;
export const forgetPasswordUserAPI = () => `${baseURL}${forgetPasswordUser}`;
export const forgetPasswordUserChangedAPI = () => `${baseURL}${forgetPasswordUserChanged}`;


// ====================== Job Position Apis ======================
// Variables path
const jobPositionGet = "/databaseApis/jobPositionGet";

// Export Function 
export const jobPositionGetAPI = () => `${baseURL}${jobPositionGet}`;


// ====================== Job Level Apis ======================
// Variables path
const jobLevelGet = "/databaseApis/jobLevelGet";

// Export Function 
export const jobLevelGetAPI = () => `${baseURL}${jobLevelGet}`;


// ====================== Job Description Apis ======================
// Variables path
const jobDescriptionRegister = "/recruiterAPIs/jobDescriptionRegister";
const jobDescriptionGetAll = "/recruiterAPIs/jobDescriptionGet";
const jobDescriptionGetOne = "/recruiterAPIs/jobDescriptionGetOne";
const jobDescriptionGetUser = "/recruiterAPIs/jobDescriptionGetUser";
const jobDescriptionUpdate = "/recruiterAPIs/jobDescriptionUpdate";
const jobDescriptionDelete = "/recruiterAPIs/jobDescriptionDelete";

// Export Function 
export const jobDescriptionRegisterAPI = () => `${baseURL}${jobDescriptionRegister}`;
export const jobDescriptionGetAllAPI = () => `${baseURL}${jobDescriptionGetAll}`;
export const jobDescriptionGetOneAPI = () => `${baseURL}${jobDescriptionGetOne}`;
export const jobDescriptionGetUserAPI = () => `${baseURL}${jobDescriptionGetUser}`;
export const jobDescriptionUpdateAPI = () => `${baseURL}${jobDescriptionUpdate}`;
export const jobDescriptionDeleteAPI = () => `${baseURL}${jobDescriptionDelete}`;


// ====================== Bulk resume Apis ======================
// Variables path
const bulkResumeAnalysis = "/recruiterAPIs/RecruiterBulkResumeAnalysis";

// Export Function 
export const bulkResumeAnalysisAPI = () => `${baseURL}${bulkResumeAnalysis}`;


// ----------------------------------------------------------------

// FetchAPI function

export const FetchAPI = async (apiLink, fetchType, sentData) => {
  const res = await Axios({
    url: apiLink,
    method: fetchType,
    data: sentData,
  })
    .then((response) => response)
    .catch((err) => err.response);

  const data = await res?.data;

  return { res, data };
};
