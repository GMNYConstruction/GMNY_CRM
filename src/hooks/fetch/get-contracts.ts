import { Accidents, ContractsType } from "@/types";
import { apiClient } from "../clientsApi";
import { AxiosResponse } from "axios"; 

export interface ContractSelect { 
  contracts: ContractsType[],
  pages: number,
}
 
export const getContractsPage = async (pageNumber: number | string, pageSize: number | string = 10, search?: string, from_date?: string, to_date?: string ) => {
   
  const { data } = await apiClient.post<ContractSelect, AxiosResponse<ContractSelect>>(
    `/api/getAllContracts`, {page: pageNumber, pageSize: pageSize, search: search, from_date: from_date?.toString(), to_date: to_date?.toString()}
  );

  return data as ContractSelect;
}
 
 