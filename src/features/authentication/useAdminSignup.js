import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { adminSignup as adminSignupApi } from "../../services/apiAuth";

export const useAdminSignup = () => {
  const { mutate: adminSignup, error } = useMutation({
    mutationFn: (data) => adminSignupApi(data),
    onSuccess: () => {
      toast.success("User successfully created");
    },
    onError: (err) => toast.error(err.message),
  });

  return { adminSignup, error };
};
