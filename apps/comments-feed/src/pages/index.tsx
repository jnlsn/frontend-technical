import * as React from "react";
import { Box, Divider } from "@chakra-ui/react";
import type { NextPage } from "next";
import { CommentForm } from "../components/comment-form";
import { CommentsList } from "../components/comments-list";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import { fetchComments } from "../api";

const Home: NextPage = () => {
  return (
    <Box maxWidth="45rem" margin="0 auto" padding={8}>
      <CommentForm />
      <Divider marginY="12" />
      <CommentsList />
    </Box>
  );
};

export default Home;

export async function getServerSideProps() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(["comments"], fetchComments);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}
