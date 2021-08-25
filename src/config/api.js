const api = {
  patient_registration: "/signup/registration/patient", // post
  confirm_login: "/signup/login_exists", // get
  get_token: "/signup/get_token", // post
  get_profile: "signup/get_profile",
  all_doctors: "/patient/doctor", // get
  single_doctor: "/patient/doctor/", // + id get
  doctor_schedule: "/patient/schedule/doctor/", // + id get
  set_event: "/patient/schedule",
  get_events: "/patient/schedule",
  delete_event: "/patient/schedule/",
  get_clinical_record: "/patient/clinical_record",
  get_photo: "http://api.neomedy.com/api/image/download",
  submit_access: "/patient/submit-access/", // /:token
  get_file: "/file/download",
};

export default api;
