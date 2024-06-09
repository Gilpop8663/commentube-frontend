import type { Meta, StoryObj } from "@storybook/react";
import CommentBase from ".";
import { MOCK_COMMENT_LIST } from "../../../mock/comment";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Comment/CommentBase",
  component: CommentBase,
  parameters: {},
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {},
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: {},
} satisfies Meta<typeof CommentBase>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    id: 0,
    commentId: 1,
    replyType: "comment",
    nickname: MOCK_COMMENT_LIST[0].nickname,
    likes: MOCK_COMMENT_LIST[0].likes,
    dislikes: MOCK_COMMENT_LIST[0].dislikes,
    updatedAt: MOCK_COMMENT_LIST[0].createdAt,
    createdAt: MOCK_COMMENT_LIST[0].createdAt,
    content: MOCK_COMMENT_LIST[0].content,
  },
};

export const Modified: Story = {
  args: {
    id: 0,
    commentId: 1,
    replyType: "comment",
    nickname: MOCK_COMMENT_LIST[0].nickname,
    likes: MOCK_COMMENT_LIST[0].likes,
    dislikes: MOCK_COMMENT_LIST[0].dislikes,
    updatedAt: MOCK_COMMENT_LIST[0].updatedAt,
    createdAt: MOCK_COMMENT_LIST[0].createdAt,
    content: MOCK_COMMENT_LIST[0].content,
  },
};
