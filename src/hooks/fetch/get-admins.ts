import { Accidents } from "@/types";
import { apiClient } from "../clientsApi";
import { AxiosResponse } from "axios"; 
 
export const getAdmins = async (id: number | string ) => {
   
  const { data } = await apiClient.post<any, AxiosResponse<any>>(
    `/api/getAllUsers`, {id: id}
  );

  return data as any;
}
 
 