import { Box, Text } from "@chakra-ui/react";
import { format, parseISO } from "date-fns";
import * as React from "react";
import type { CommentData } from "../../types";

export interface CommentProps {
  comment: CommentData;
}

export const Comment = ({ comment }: CommentProps): JSX.Element => {
  const commentDate = parseISO(comment.created);
  return (
    <Box
      borderWidth="thin"
      borderStyle="solid"
      borderColor="gray.200"
      borderRadius="base"
      padding="8"
    >
      <Text marginBottom="4">{comment.message}</Text>
      <Text fontSize="sm">{`${comment.name} on  ${format(
        commentDate,
        "MMMM do"
      )} at ${format(commentDate, "ha")}`}</Text>
    </Box>
  );
};
