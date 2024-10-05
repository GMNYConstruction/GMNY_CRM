import axios from "axios";

export const apiClient = axios.create({
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export const apiClientFormData = axios.create({
  headers: {
    "Content-Type": "multipart/form-data",
  },
});