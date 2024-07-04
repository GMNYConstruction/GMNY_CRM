import { apiClient } from "../clientsApi";
import { DefaultError, useMutation } from "@tanstack/react-query";
import { AxiosResponse } from "axios";  

 
export const useUpdateAccidentMutation = ({
  onSuccess,
  onError,
}: {
  onSuccess?: (data: any, variables: any, context: any) => void;
  onError?: (data: any, variables: any, context: any) => void;
}) =>
  useMutation<any, DefaultError, any>({
    mutationFn: async (form) => {
        const { data } = await apiClient.post<
          any,
          AxiosResponse<any>,
          any
        >(`/api/updateSelectedAccident`, form)

        return data;
    },
    onSuccess,
    onError,
  });
 