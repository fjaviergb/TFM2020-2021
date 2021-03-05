import axios from "axios";
const HOSTS = require('./cors.js');

export default axios.create({
    baseURL: `${HOSTS.frontend}`,
    headers: {
      "Content-type": "application/json"
    }
  });