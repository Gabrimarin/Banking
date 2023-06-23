import axios from "axios";

export const api = axios.create({
  baseURL: "https://us-central1-banking-390713.cloudfunctions.net",
});
