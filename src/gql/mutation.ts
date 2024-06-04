import { gql } from "@apollo/client";

export const CREATE_VIDEO = gql`
  mutation CreateVideo($input: CreateVideoInput!) {
    createVideo(input: $input) {
      ok
      error
      videoId
    }
  }
`;

export const CREATE_COMMENT = gql`
  mutation CreateVideo($input: CreateCommentInput!, $videoId: Float!) {
    createComment(input: $input, videoId: $videoId) {
      ok
      error
      commentId
    }
  }
`;
