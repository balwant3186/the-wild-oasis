import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { updateUser as updateUserApi } from "../../services/apiAuth";

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  const { mutate: updateUser, isUpdating } = useMutation({
    mutationFn: updateUserApi,
    onSuccess: () => {
      toast.success("User successfully updated");
      queryClient.invalidateQueries({
        active: true,
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { updateUser, isUpdating };
};
