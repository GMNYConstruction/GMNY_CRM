import { apiClient } from "../clientsApi";
import { DefaultError, useMutation } from "@tanstack/react-query";
import { AxiosResponse } from "axios";  

interface DeleteReq {
    id: number | string,
    userid: number | string,
}

interface DeleteRes {
    id: number | string,
    message: string,
}

interface CreateReq { 
    caseid: number,
    comment: string,
    userid: number,
    dateCreated: string,
}
 
export const useDeleteCommentMutation = ({
  onSuccess,
  onError,
}: {
  onSuccess?: (data: any, variables: DeleteReq, context: any) => void;
  onError?: (data: any, variables: DeleteReq, context: any) => void;
}) =>
  useMutation<any, DefaultError, any>({
    mutationFn: async (form) => {
        const { data } = await apiClient.post<
          DeleteRes,
          AxiosResponse<DeleteRes>,
          DeleteReq
        >(`/api/deleteComment`, {id: Number(form?.id), userid: Number(form?.userid)})

        return data;
    },
    onSuccess,
    onError,
  });

export const useCreateCommentMutation = ({
  onSuccess,
  onError,
}: {
  onSuccess?: (data: any, variables: CreateReq, context: any) => void;
  onError?: (data: any, variables: CreateReq, context: any) => void;
}) =>
  useMutation<any, DefaultError, any>({
    mutationFn: async (form) => {
        const { data } = await apiClient.post<
          any,
          AxiosResponse<any>,
          CreateReq
        >(`/api/createNewComment`, form)

        return data;
    },
    onSuccess,
    onError,
  });