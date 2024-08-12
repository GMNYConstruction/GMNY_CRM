import { ContractsType } from "@/types";
import { apiClient } from "../clientsApi";
import { DefaultError, useMutation } from "@tanstack/react-query";
import { AxiosResponse } from "axios";  

interface ContRes {
    contract: ContractsType,
    message: string,
}
 
export const useDeleteContractMutation = ({
  onSuccess,
  onError,
}: {
  onSuccess?: (data: any, variables: ContractsType, context: any) => void;
  onError?: (data: any, variables: ContractsType, context: any) => void;
}) =>
  useMutation<any, DefaultError, any>({
    mutationFn: async (form) => {
        const { data } = await apiClient.post<
          ContRes,
          AxiosResponse<ContRes>,
          ContractsType
        >(`/api/createContract`, form)

        return data;
    },
    onSuccess,
    onError,
  });

export const useCreateContractMutation = ({
  onSuccess,
  onError,
}: {
  onSuccess?: (data: any, variables: ContractsType, context: any) => void;
  onError?: (data: any, variables: ContractsType, context: any) => void;
}) =>
  useMutation<any, DefaultError, any>({
    mutationFn: async (form) => {
        const { data } = await apiClient.post<
          ContRes,
          AxiosResponse<ContRes>,
          ContractsType
        >(`/api/createContract`, form)

        return data;
    },
    onSuccess,
    onError,
  });

export const useUpdateContractMutation = ({
  onSuccess,
  onError,
}: {
  onSuccess?: (data: any, variables: ContractsType, context: any) => void;
  onError?: (data: any, variables: ContractsType, context: any) => void;
}) =>
  useMutation<any, DefaultError, any>({
    mutationFn: async (form) => {
        const { data } = await apiClient.post<
          ContRes,
          AxiosResponse<ContRes>,
          ContractsType
        >(`/api/updateSelectedContract`, form)

        return data;
    },
    onSuccess,
    onError,
  });