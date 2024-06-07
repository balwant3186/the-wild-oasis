import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteGuest as deleteGuestApi } from "../../services/apiGuests";

export const useDeleteGuest = () => {
  const queryClient = useQueryClient();

  const {
    mutate: deleteGuest,
    error,
    isLoading: isDeletingGuest,
  } = useMutation({
    mutationFn: deleteGuestApi,
    onSuccess: () => {
      toast.success("Guest successfully deleted");
      queryClient.invalidateQueries({ active: true });
    },
    onError: (err) => toast.error(err.message),
  });

  return { deleteGuest, error, isDeletingGuest };
};
