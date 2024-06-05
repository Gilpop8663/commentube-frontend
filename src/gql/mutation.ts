import { gql } from "@apollo/client";

export const CREATE_VIDEO = gql`
  mutation ($input: CreateVideoInput!) {
    createVideo(input: $input) {
      ok
      error
      videoId
    }
  }
`;

export const CREATE_COMMENT = gql`
  mutation ($input: CreateCommentInput!, $videoId: Float!) {
    createComment(input: $input, videoId: $videoId) {
      ok
      error
      commentId
    }
  }
`;

export const CREATE_REPLY = gql`
  mutation ($input: CreateReplyInput!, $commentId: Float!) {
    createReply(input: $input, commentId: $commentId) {
      ok
      error
      replyId
    }
  }
`;

export const DELETE_COMMENT = gql`
  mutation ($input: DeleteCommentInput!, $commentId: Float!) {
    deleteComment(commentId: $commentId, input: $input) {
      ok
      error
    }
  }
`;

export const DELETE_REPLY = gql`
  mutation ($input: DeleteReplyInput!, $replyId: Float!) {
    deleteReply(input: $input, replyId: $replyId) {
      ok
      error
    }
  }
`;

export const EDIT_COMMENT = gql`
  mutation ($input: EditCommentInput!, $commentId: Float!) {
    editComment(input: $input, commentId: $commentId) {
      ok
      error
    }
  }
`;

export const EDIT_REPLY = gql`
  mutation ($input: EditReplyInput!, $replyId: Float!) {
    editReply(input: $input, replyId: $replyId) {
      ok
      error
    }
  }
`;

export const LIKE_VIDEO = gql`
  mutation ($videoId: Float!, $isIncrement: Boolean!) {
    likeVideo(videoId: $videoId, isIncrement: $isIncrement) {
      ok
      error
    }
  }
`;

export const DISLIKE_VIDEO = gql`
  mutation ($videoId: Float!, $isIncrement: Boolean!) {
    dislikeVideo(videoId: $videoId, isIncrement: $isIncrement) {
      ok
      error
    }
  }
`;

export const LIKE_COMMENT = gql`
  mutation ($commentId: Float!, $isIncrement: Boolean!) {
    likeComment(commentId: $commentId, isIncrement: $isIncrement) {
      ok
      error
    }
  }
`;

export const DISLIKE_COMMENT = gql`
  mutation ($commentId: Float!, $isIncrement: Boolean!) {
    dislikeComment(commentId: $commentId, isIncrement: $isIncrement) {
      ok
      error
    }
  }
`;

export const LIKE_REPLY = gql`
  mutation ($reply: Float!, $isIncrement: Boolean!) {
    likeReply(reply: $reply, isIncrement: $isIncrement) {
      ok
      error
    }
  }
`;

export const DISLIKE_REPLY = gql`
  mutation ($reply: Float!, $isIncrement: Boolean!) {
    dislikeReply(reply: $reply, isIncrement: $isIncrement) {
      ok
      error
    }
  }
`;

export const CHECK_COMMENT_PASSWORD = gql`
  mutation ($commentId: Float!, $password: String!) {
    checkCommentPassword(commentId: $commentId, password: $password) {
      ok
      error
    }
  }
`;
