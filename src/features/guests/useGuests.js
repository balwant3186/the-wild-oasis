import { useQuery } from "@tanstack/react-query";
import { getAllGuests } from "../../services/apiGuests";

export const useGuests = () => {
  const {
    data: guests,
    error,
    isLoading: isGuestsLoading,
  } = useQuery({
    queryKey: ["guests"],
    queryFn: getAllGuests,
  });

  return { guests, error, isLoading: isGuestsLoading };
};
