import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { format } from "date-fns";
import { CommentData } from "../types";

export interface CommentInput {
  name: string;
  message: string;
}

export const useCreateCommentMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (newComment: CommentInput) => {
      return axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/create-comment`,
        newComment
      );
    },
    {
      onMutate: async (newComment: CommentInput) => {
        await queryClient.cancelQueries(["comments"]);

        const previousComments = queryClient.getQueryData<CommentData[]>([
          "comments",
        ]);

        if (previousComments) {
          queryClient.setQueryData<CommentData[]>(
            ["comments"],
            [
              {
                ...newComment,
                created: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
                id: -1,
              },
              ...previousComments,
            ]
          );
        }
      },
    }
  );
};
