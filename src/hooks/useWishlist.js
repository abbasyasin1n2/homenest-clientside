import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '../api/axios';

export const useWishlist = (userEmail) => {
  return useQuery({
    queryKey: ['wishlist', userEmail],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/wishlist/${userEmail}`);
      return data;
    },
    enabled: !!userEmail,
  });
};

export const useAddToWishlist = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ userEmail, propertyId }) => {
      const { data } = await axiosInstance.post('/wishlist', { userEmail, propertyId });
      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['wishlist', variables.userEmail] });
    },
  });
};

export const useRemoveFromWishlist = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ userEmail, propertyId }) => {
      const { data } = await axiosInstance.delete(`/wishlist/${propertyId}`);
      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['wishlist', variables.userEmail] });
    },
  });
};







