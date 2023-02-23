import * as React from "react";
import { Box, Button, Input, Text, Textarea, useToast } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { CommentInput, useCreateCommentMutation } from "../../api";

export const CommentForm = (): JSX.Element => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CommentInput>();

  const mutation = useCreateCommentMutation();

  const toast = useToast();

  const nameId = React.useId();
  const nameErrorId = React.useId();
  const messageId = React.useId();
  const messageErrorId = React.useId();

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data, {
      onSuccess: () => reset(),
      onError: (error) => {
        if (error instanceof Error) {
          toast({
            title: error.name,
            description: error.message,
            status: "error",
            duration: 9000,
            isClosable: true,
          });
        }
      },
    });
  });

  return (
    <form onSubmit={onSubmit}>
      <Box marginBottom="4">
        <Text as="label" htmlFor={nameId}>
          Name:
        </Text>
        <Input
          id={nameId}
          isInvalid={Boolean(errors.name)}
          aria-describedby={errors.name ? nameErrorId : undefined}
          {...register("name", { required: "Your name is required." })}
        />
        {errors.name && (
          <Text
            fontSize="sm"
            marginTop="2"
            color="red"
            id={nameErrorId}
            role="alert"
          >
            {errors.name.message}
          </Text>
        )}
      </Box>
      <Box marginBottom="4">
        <Text as="label" htmlFor={messageId}>
          Message:
        </Text>
        <Textarea
          id={messageId}
          isInvalid={Boolean(errors.message)}
          aria-describedby={errors.message ? messageErrorId : undefined}
          {...register("message", {
            required: "Please enter a message to post.",
          })}
        />
        {errors.message && (
          <Text
            fontSize="sm"
            marginTop="2"
            color="red"
            id={messageErrorId}
            role="alert"
          >
            {errors.message.message}
          </Text>
        )}
      </Box>
      <Button colorScheme="green" type="submit" disabled={mutation.isLoading}>
        Submit Comment
      </Button>
    </form>
  );
};
