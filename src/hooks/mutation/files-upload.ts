import { ContractsType, FilesStandart } from "@/types";
import { apiClient, apiClientFormData } from "../clientsApi";
import { DefaultError, useMutation } from "@tanstack/react-query";
import { AxiosResponse } from "axios";  
 
interface UploadReq {
    files: FilesStandart[];
    directory: string;
}



export const useUploadFiles = ({
  onSuccess,
  onError,
}: {
  onSuccess?: (data: any, variables: any, context: any) => void;
  onError?: (data: any, variables: any, context: any) => void;

}) =>
  useMutation<any, DefaultError, any>({
    mutationFn: async (form) => {
        const { data } = await apiClientFormData.post<
          any,
          AxiosResponse<any>,
          any
        >(`/api/uploadFiles`, form)
        return data;
    },
    onSuccess,
    onError,
  });