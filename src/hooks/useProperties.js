import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '../api/axios';

// Fetch featured properties
export const useFeaturedProperties = () => {
  return useQuery({
    queryKey: ['featured-properties'],
    queryFn: async () => {
      const { data } = await axiosInstance.get('/properties/featured');
      return data;
    },
  });
};

// Fetch all properties
export const useAllProperties = (search, sortBy, sortOrder) => {
  return useQuery({
    queryKey: ['all-properties', search, sortBy, sortOrder],
    queryFn: async () => {
      const params = {};
      if (search) params.search = search;
      if (sortBy) params.sortBy = sortBy;
      if (sortOrder) params.sortOrder = sortOrder;
      
      const { data } = await axiosInstance.get('/properties', { params });
      return data;
    },
  });
};

// Fetch single property by ID
export const useProperty = (id) => {
  return useQuery({
    queryKey: ['property', id],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/properties/${id}`);
      return data;
    },
    enabled: !!id,
  });
};

export const useAddProperty = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload) => {
      const { data } = await axiosInstance.post('/properties', payload);
      return data;
    },
    onSuccess: (_data, variables) => {
      if (variables?.userEmail) {
        queryClient.invalidateQueries({
          queryKey: ['my-properties', variables.userEmail],
        });
      }
      queryClient.invalidateQueries({ queryKey: ['featured-properties'] });
      queryClient.invalidateQueries({ queryKey: ['all-properties'] });
    },
  });
};

export const useMyProperties = (email) => {
  return useQuery({
    queryKey: ['my-properties', email],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/properties/user/${email}`);
      return data;
    },
    enabled: !!email,
  });
};

export const useUpdateProperty = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, payload }) => {
      const { data } = await axiosInstance.put(`/properties/${id}`, payload);
      return data;
    },
    onSuccess: (_data, variables) => {
      if (variables?.payload?.userEmail) {
        queryClient.invalidateQueries({
          queryKey: ['my-properties', variables.payload.userEmail],
        });
      }
      queryClient.invalidateQueries({ queryKey: ['featured-properties'] });
      queryClient.invalidateQueries({ queryKey: ['all-properties'] });
      queryClient.invalidateQueries({ queryKey: ['property', variables.id] });
    },
  });
};

export const useDeleteProperty = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id }) => {
      const { data } = await axiosInstance.delete(`/properties/${id}`);
      return data;
    },
    onSuccess: (_data, variables) => {
      if (variables?.userEmail) {
        queryClient.invalidateQueries({
          queryKey: ['my-properties', variables.userEmail],
        });
      }
      queryClient.invalidateQueries({ queryKey: ['featured-properties'] });
      queryClient.invalidateQueries({ queryKey: ['all-properties'] });
    },
  });
};

