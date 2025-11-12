import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '../api/axios';

export const usePropertyRatings = (propertyId) => {
  return useQuery({
    queryKey: ['property-ratings', propertyId],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/ratings/property/${propertyId}`);
      return data;
    },
    enabled: !!propertyId,
  });
};

export const useMyRatings = (email) => {
  return useQuery({
    queryKey: ['my-ratings', email],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/ratings/user/${email}`);
      return data;
    },
    enabled: !!email,
  });
};

export const useSubmitRating = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload) => {
      const { data } = await axiosInstance.post('/ratings', payload);
      return data;
    },
    onSuccess: (_data, variables) => {
      if (variables?.propertyId) {
        queryClient.invalidateQueries({
          queryKey: ['property-ratings', variables.propertyId],
        });
      }
      if (variables?.reviewerEmail) {
        queryClient.invalidateQueries({
          queryKey: ['my-ratings', variables.reviewerEmail],
        });
      }
    },
  });
};

export const useDeleteRating = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id }) => {
      const { data } = await axiosInstance.delete(`/ratings/${id}`);
      return data;
    },
    onSuccess: (_data, variables) => {
      if (variables?.propertyId) {
        queryClient.invalidateQueries({
          queryKey: ['property-ratings', variables.propertyId],
        });
      }
      if (variables?.userEmail) {
        queryClient.invalidateQueries({
          queryKey: ['my-ratings', variables.userEmail],
        });
      }
    },
  });
};

