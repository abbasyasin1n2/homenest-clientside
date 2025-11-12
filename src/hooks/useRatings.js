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
    },
  });
};

