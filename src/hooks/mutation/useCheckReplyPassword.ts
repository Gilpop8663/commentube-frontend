import { useMutation } from "@apollo/client";
import { CHECK_REPLY_PASSWORD } from "../../gql/mutation";

interface CheckReplyPasswordResult {
  checkReplyPassword: {
    ok: boolean;
    error: null | string;
  };
}

interface UseCheckReplyPasswordProps {
  replyId: number;
  editInputOpen: () => void;
}

export const useCheckReplyPassword = ({
  replyId,
  editInputOpen,
}: UseCheckReplyPasswordProps) => {
  const [checkReplyPassword, { data, error }] =
    useMutation<CheckReplyPasswordResult>(CHECK_REPLY_PASSWORD);

  const handleCheckReplyPassword = async (password: string) => {
    await checkReplyPassword({
      variables: { password, replyId },
      update: (cache, { data }) => {
        if (!data?.checkReplyPassword.ok) return;

        editInputOpen();
      },
    });
  };

  return { handleCheckReplyPassword, data, error };
};
