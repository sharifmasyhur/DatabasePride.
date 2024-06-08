import { SearchState } from "@/pages/SearchPage";
import { Canteen, CanteenSearchResponse } from "@/types";
import { useQuery } from "react-query";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetCanteen = (canteenId?: string) => {
  const getCanteenByIdRequest = async (): Promise<Canteen> => {
    const response = await fetch(
      `${API_BASE_URL}/api/canteen/${canteenId}`
    );

    if (!response.ok) {
      throw new Error("Failed to get canteen");
    }

    return response.json();
  };

  const { data: canteen, isLoading } = useQuery(
    "fetchCanteen",
    getCanteenByIdRequest,
    {
      enabled: !!canteenId,
    }
  );

  return { canteen, isLoading };
};

export const useSearchCanteens = (
  searchState: SearchState,
  faculty?: string
) => {
  const createSearchRequest = async (): Promise<CanteenSearchResponse> => {
    const params = new URLSearchParams();
    params.set("searchQuery", searchState.searchQuery);
    params.set("page", searchState.page.toString());
    params.set("selectedCuisines", searchState.selectedCuisines.join(","));
    params.set("sortOption", searchState.sortOption);

    const response = await fetch(
      `${API_BASE_URL}/api/canteen/search/${faculty}?${params.toString()}`
    );

    if (!response.ok) {
      throw new Error("Failed to get canteen");
    }

    return response.json();
  };

  const { data: results, isLoading } = useQuery(
    ["searchCanteens", searchState],
    createSearchRequest,
    { enabled: !!faculty }
  );

  return {
    results,
    isLoading,
  };
};
