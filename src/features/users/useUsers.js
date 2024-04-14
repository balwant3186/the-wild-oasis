import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../../services/apiUsers";

export const useUsers = () => {
  const {
    data: users,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  return { users, error, isLoading };
};
