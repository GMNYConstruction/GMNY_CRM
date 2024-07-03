import { apiClient } from "../clientsApi";
import { AxiosResponse } from "axios"; 
 
export const getAccidentsPage = async (pageNumber: number | string, pageSize: number | string = 10, search?: string, date?: string ) => {
   
  const { data } = await apiClient.post<any, AxiosResponse<any>>(
    `/api/getAllAccidents`, {page: pageNumber, pageSize: pageSize, search: search, date: date}
  );

  return data as any;
}

 