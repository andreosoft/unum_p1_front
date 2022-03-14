/** @format */

const api = {
  patient_registration: 'signup/registration/patient', // post
  confirm_login: 'signup/login_exists', // get
  get_token: 'signup/get_token', // post
  get_profile: 'patient/profile',
  update_profile: 'patient/profile', //post
  all_doctors: 'patient/doctor', // get
  my_doctors: 'patient/my_doctors',
  single_doctor: 'patient/doctor/', // + id get
  doctor_schedule: 'patient/schedule/doctor/', // + id get
  set_event: 'patient/schedule',
  get_events: 'patient/schedule',
  delete_event: 'patient/schedule/',
  get_clinical_record: 'patient/clinical_record',
  get_photo: 'http://api.neomedy.com/api/image/download',
  submit_access: 'patient/submit-access/', // /:token
  get_file: 'file/download',
  getFile: '/api/file/download', // '/file/download/:file',
  postFile: 'file/upload',
  postImage: 'image/upload',

  getLangItems: '/translations', // /translations/:lang/:item

  createNewChat: 'messegner/new_private_chat', // { to_id: '123'}
  getUserChats: 'messegner/chats',
  getUserMessages: 'messegner/messages', // /:chat_id?pager={ count: 0, limit: 25, page: 0 }
  postMessage: 'messegner/messages', // /:chat_id { message: "message", attachments: "{}" }

  addUserToChat: 'messegner/add_user_to_chat', // { "chat_id": 13, to_id: 123 }
  newConsiliumChat: 'messegner/new_group_chat', // { type: "3", name: "Новый консилиум чат", info: "{}" }
  newGroupChat: 'messegner/new_group_chat', // { type: "2", name: "Новый групповой чат", info: "{}"}

  delete_chat: 'messegner/chat',
  clear_chat_history: 'messegner/clear_chat_history',
};

export default api;
