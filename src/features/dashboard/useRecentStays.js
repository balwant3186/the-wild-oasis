import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { subDays } from "date-fns";
import { getStaysAfterDate } from "../../services/apiBookings";

export const useRecentStays = () => {
  const [searchParams] = useSearchParams();

  const numDays = searchParams.get("last")
    ? Number(searchParams.get("last"))
    : 7;

  const queryDate = subDays(new Date(), numDays).toISOString();

  const { data: confirmedStays, isLoading: isLoadingStays } = useQuery({
    queryKey: ["stays", `last-${numDays}`],
    queryFn: () => getStaysAfterDate(queryDate),
  });

  return { isLoadingStays, confirmedStays, numDays };
};
