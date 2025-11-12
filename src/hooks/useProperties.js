import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../api/axios';

// Fetch featured properties (6 most recent)
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

