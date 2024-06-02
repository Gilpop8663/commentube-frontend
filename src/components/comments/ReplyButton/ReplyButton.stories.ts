import type { Meta, StoryObj } from "@storybook/react";
import ReplyButton from ".";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Comment/ReplyButton",
  component: ReplyButton,
  parameters: {},
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {},
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: {},
} satisfies Meta<typeof ReplyButton>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Active: Story = {
  args: {
    replyCount: 45,
    isActive: true,
  },
};

export const Disabled: Story = {
  args: {
    replyCount: 45,
    isActive: false,
  },
};
