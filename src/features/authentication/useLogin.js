import { useMutation } from "@tanstack/react-query";

import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { login as loginApi } from "../../services/apiAuth";

export const useLogin = () => {
  const navigate = useNavigate();

  const {
    mutate: login,
    error,
    isLoading: isLoggingIn,
  } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: (data) => {
      toast.success(`Logged in as ${data?.user?.email}`);
      navigate("/dashboard");
    },
    onError: () => {
      toast.error("Provided email or password is incorrect");
    },
  });

  return { login, error, isLoggingIn };
};
