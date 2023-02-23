import { Box, Spinner, Text } from "@chakra-ui/react";
import * as React from "react";
import { uid } from "react-uid";
import { useCommentsQuery } from "../../api";
import { Comment } from "./comment";

export const CommentsList = (): JSX.Element => {
  const { isLoading, data } = useCommentsQuery();

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center">
        <Spinner />
      </Box>
    );
  }

  return (
    <Box display="flex" flexDirection="column" gap="4">
      {!data || data.length === 0 ? (
        <Text textAlign="center">All's quiet here 🍃</Text>
      ) : (
        data.map((comment) => <Comment key={uid(comment)} comment={comment} />)
      )}
    </Box>
  );
};
