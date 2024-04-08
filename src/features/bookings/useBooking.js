import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { getBooking } from "../../services/apiBookings";

export const useBooking = () => {
  const { bookingId } = useParams();

  const {
    data: booking,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["booking", bookingId],
    queryFn: () => getBooking(+bookingId),
    retry: false,
  });

  return { booking, isLoading, error };
};
