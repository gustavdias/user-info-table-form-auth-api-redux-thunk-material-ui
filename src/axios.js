import axios from "axios";
//!
const axios = axios.create({
  baseURL:
    "https://user-info-table-form-auth-default-rtdb.europe-west1.firebasedatabase.app/",
});

export default axios;
