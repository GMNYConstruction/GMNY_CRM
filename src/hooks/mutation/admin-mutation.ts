import { Accidents, AdminCreate, AuthUser, UsersType } from "@/types";
import { apiClient } from "../clientsApi";
import { DefaultError, useMutation } from "@tanstack/react-query";
import { AxiosResponse } from "axios";  
import { User } from "next-auth";

export interface StatusReq {
    id: number,
    status: boolean,
}
export interface StatusRes {
    message: string,
    admin: AuthUser,
}

export const useUpdateAdminStatus = ({
  onSuccess,
  onError,
}: {
  onSuccess?: (data: any, variables: any, context: any) => void;
  onError?: (data: any, variables: any, context: any) => void;
}) =>
  useMutation<any, DefaultError, any>({
    mutationFn: async (form) => {
        const { data } = await apiClient.post<
          StatusRes,
          AxiosResponse<StatusRes>,
          StatusReq
        >(`/api/updateUserStatus`, form)

        return data;
    },
    onSuccess,
    onError,
  }); 

export const useUpdateAdmin = ({
  onSuccess,
  onError,
}: {
  onSuccess?: (data: any, variables: any, context: any) => void;
  onError?: (data: any, variables: any, context: any) => void;
}) =>
  useMutation<any, DefaultError, any>({
    mutationFn: async (form) => {
        const { data } = await apiClient.post<
          StatusRes,
          AxiosResponse<StatusRes>,
          UsersType
        >(`/api/updateSelectedUser`, form)

        return data;
    },
    onSuccess,
    onError,
  }); 

export const useCreateAdmin = ({
  onSuccess,
  onError,
}: {
  onSuccess?: (data: any, variables: any, context: any) => void;
  onError?: (data: any, variables: any, context: any) => void;
}) =>
  useMutation<any, DefaultError, any>({
    mutationFn: async (form) => {
        const { data } = await apiClient.post<
          StatusRes,
          AxiosResponse<StatusRes>,
          AdminCreate
        >(`/api/createAdmin`, form)

        return data;
    },
    onSuccess,
    onError,
  }); 


 