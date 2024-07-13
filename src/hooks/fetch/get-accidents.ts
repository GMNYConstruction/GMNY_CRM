import { Accidents } from "@/types";
import { apiClient } from "../clientsApi";
import { AxiosResponse } from "axios"; 

export interface AccidentSelect { 
  accidents: Accidents[],
  pages: number,
}
 
export const getAccidentsPage = async (pageNumber: number | string, pageSize: number | string = 10, search?: string, date?: string ) => {
   
  const { data } = await apiClient.post<AccidentSelect, AxiosResponse<AccidentSelect>>(
    `/api/getAllAccidents`, {page: pageNumber, pageSize: pageSize, search: search, date: date?.toString()}
  );

  return data as AccidentSelect;
}

export const getCurrentAccident = async (id: number | string) => {
   
  const { data } = await apiClient.post<Accidents, AxiosResponse<Accidents>>(
    `/api/getCurrentAccident`, {id: id}
  );

  return data as Accidents;
}

 