import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { compareDesc, parseISO } from "date-fns";
import { CommentData } from "../types";

export const fetchComments = async () => {
  const response = await axios.get<CommentData[]>(
    `${process.env.NEXT_PUBLIC_API_URL}/get-comments`
  );
  return response.data.sort((a, b) =>
    compareDesc(parseISO(a.created), parseISO(b.created))
  );
};

export const useCommentsQuery = () =>
  useQuery<CommentData[]>(["comments"], fetchComments, {
    refetchInterval: 5000,
  });
