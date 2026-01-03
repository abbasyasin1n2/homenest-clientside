import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '../api/axios';

export const useOwnerInquiries = (userEmail) => {
  return useQuery({
    queryKey: ['inquiries', 'owner', userEmail],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/inquiries/owner/${userEmail}`);
      return data;
    },
    enabled: !!userEmail,
  });
};

export const useUserInquiries = (userEmail) => {
  return useQuery({
    queryKey: ['inquiries', 'user', userEmail],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/inquiries/user/${userEmail}`);
      return data;
    },
    enabled: !!userEmail,
  });
};

export const useSendInquiry = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (inquiryData) => {
      const { data } = await axiosInstance.post('/inquiries', inquiryData);
      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['inquiries', 'user', variables.senderEmail] });
    },
  });
};

export const useUpdateInquiryStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, status }) => {
      const { data } = await axiosInstance.patch(`/inquiries/${id}`, { status });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['inquiries'] });
    },
  });
};







