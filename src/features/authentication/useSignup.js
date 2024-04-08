import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { signup as signupApi } from "../../services/apiAuth";

export const useSignup = () => {
  const { mutate: signup, isLoading: isSigningUp } = useMutation({
    mutationFn: signupApi,
    onSuccess: () => {
      toast.success("User successfully created");
    },
    onError: (err) => toast.error(err.message),
  });

  return { signup, isSigningUp };
};
