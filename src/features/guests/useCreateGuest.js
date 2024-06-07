import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createEditGuest } from "../../services/apiGuests";

export const useCreateGuest = () => {
  const queryClient = useQueryClient();

  const { mutate: createGuest, isLoading: isCreating } = useMutation({
    mutationFn: createEditGuest,
    onSuccess: () => {
      toast.success("Guest successfully created");
      queryClient.invalidateQueries({ active: true });
    },
  });

  return { createGuest, isCreating };
};
