import { Order, Canteen } from "@/types";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetMyCanteen = () => {
  const { getAccessTokenSilently } = useAuth0();

  const getMyCanteenRequest = async (): Promise<Canteen> => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/api/my/canteen`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to get canteen");
    }
    return response.json();
  };

  const { data: canteen, isLoading } = useQuery(
    "fetchMyCanteen",
    getMyCanteenRequest
  );

  return { canteen, isLoading };
};

export const useCreateMyCanteen = () => {
  const { getAccessTokenSilently } = useAuth0();

  const createMyCanteenRequest = async (
    canteenFormData: FormData
  ): Promise<Canteen> => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/api/my/canteen`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: canteenFormData,
    });

    if (!response.ok) {
      throw new Error("Failed to create canteen");
    }

    return response.json();
  };

  const {
    mutate: createCanteen,
    isLoading,
    isSuccess,
    error,
  } = useMutation(createMyCanteenRequest);

  if (isSuccess) {
    toast.success("Canteen created!");
  }

  if (error) {
    toast.error("Unable to update canteen");
  }

  return { createCanteen, isLoading };
};

export const useUpdateMyCanteen = () => {
  const { getAccessTokenSilently } = useAuth0();

  const updateCanteenRequest = async (
    canteenFormData: FormData
  ): Promise<Canteen> => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/api/my/canteen`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: canteenFormData,
    });

    if (!response) {
      throw new Error("Failed to update canteen");
    }

    return response.json();
  };

  const {
    mutate: updateCanteen,
    isLoading,
    error,
    isSuccess,
  } = useMutation(updateCanteenRequest);

  if (isSuccess) {
    toast.success("Canteen Updated");
  }

  if (error) {
    toast.error("Unable to update canteen");
  }

  return { updateCanteen, isLoading };
};

export const useGetMyCanteenOrders = () => {
  const { getAccessTokenSilently } = useAuth0();

  const getMyCanteenOrdersRequest = async (): Promise<Order[]> => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/api/my/canteen/order`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch orders");
    }

    return response.json();
  };

  const { data: orders, isLoading } = useQuery(
    "fetchMyCanteenOrders",
    getMyCanteenOrdersRequest
  );

  return { orders, isLoading };
};

type UpdateOrderStatusRequest = {
  orderId: string;
  status: string;
};

export const useUpdateMyCanteenOrder = () => {
  const { getAccessTokenSilently } = useAuth0();

  const updateMyCanteenOrder = async (
    updateStatusOrderRequest: UpdateOrderStatusRequest
  ) => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(
      `${API_BASE_URL}/api/my/canteen/order/${updateStatusOrderRequest.orderId}/status`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: updateStatusOrderRequest.status }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to update status");
    }

    return response.json();
  };

  const {
    mutateAsync: updateCanteenStatus,
    isLoading,
    isError,
    isSuccess,
    reset,
  } = useMutation(updateMyCanteenOrder);

  if (isSuccess) {
    toast.success("Order updated");
  }

  if (isError) {
    toast.error("Unable to update order");
    reset();
  }

  return { updateCanteenStatus, isLoading };
};
