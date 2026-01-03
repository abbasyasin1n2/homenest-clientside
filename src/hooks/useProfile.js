import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '../api/axios';

export const useUserProfile = (userEmail) => {
  return useQuery({
    queryKey: ['userProfile', userEmail],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/users/${userEmail}`);
      return data;
    },
    enabled: !!userEmail,
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ email, profileData }) => {
      const { data } = await axiosInstance.put(`/users/${email}`, profileData);
      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['userProfile', variables.email] });
    },
  });
};







