import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllGuests } from "../../services/apiGuests";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

export const useGuests = () => {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  const sortByRaw = searchParams.get("sortBy") || "created_at-asc";

  const [field, direction] = sortByRaw.split("-");

  const sortBy = {
    field,
    direction,
  };

  const page = !searchParams.get("page")
    ? 1
    : parseInt(searchParams.get("page"));

  const {
    data: { data: guests, count } = {},
    error,
    isLoading: isGuestsLoading,
  } = useQuery({
    queryKey: ["guests", page, sortBy],
    queryFn: () => getAllGuests({ page, sortBy }),
  });

  // Prefetching
  const pageCount = Math.ceil(count / PAGE_SIZE);

  if (page < pageCount) {
    queryClient.prefetchQuery({
      queryKey: ["guests", page + 1, sortBy],
      queryFn: () => getAllGuests({ page: page + 1, sortBy }),
    });
  }

  if (page > 1) {
    queryClient.prefetchQuery({
      queryKey: ["guests", page - 1, sortBy],
      queryFn: () => getAllGuests({ page: page - 1, sortBy }),
    });
  }

  return { guests, error, isLoading: isGuestsLoading, count };
};
