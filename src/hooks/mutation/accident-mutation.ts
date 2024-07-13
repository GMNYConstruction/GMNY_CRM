import { Accidents } from "@/types";
import { apiClient } from "../clientsApi";
import { DefaultError, useMutation } from "@tanstack/react-query";
import { AxiosResponse } from "axios";  

interface AccidentResponse {
  message?: string,
  accident: Accidents,
}

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
          AccidentResponse,
          AxiosResponse<AccidentResponse>,
          any
        >(`/api/updateSelectedAccident`, form)

        return data;
    },
    onSuccess,
    onError,
  });

export const useCreateAccidentMutation = ({
  onSuccess,
  onError,
}: {
  onSuccess?: (data: any, variables: any, context: any) => void;
  onError?: (data: any, variables: any, context: any) => void;
}) =>
  useMutation<any, DefaultError, any>({
    mutationFn: async (form) => {
        const { data } = await apiClient.post<
          AccidentResponse,
          AxiosResponse<AccidentResponse>,
          any
        >(`/api/createAccident`, form)

        return data;
    },
    onSuccess,
    onError,
  });



 