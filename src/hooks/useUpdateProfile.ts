import axiosClient from "@/lib/axiosClient";
import { showToast } from "@/lib/toast";
import { ApiResponse, User, UserProfile } from "@/types";
import { useMutation } from "@tanstack/react-query";

const updateProfile = async (data: Partial<UserProfile> & { profileImage?: File | string }): Promise<ApiResponse<User>> => {
    const formData = new FormData();
  
    // Append fields to formData
    Object.entries(data).forEach(([key, value]) => {
      // Only append profileImage if it's a File, not a URL string
      if (key === 'profileImage') {
        formData.append('profileImage', value);
      } else if (value !== undefined && key !== 'profileImage') {
        formData.append(key, value as string);
      }
    });
  
    const res = await axiosClient.patch('/api/user', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  
    return res.data;
  };

  export const useUpdateProfile = () => {
    return useMutation({
      mutationFn: updateProfile,
      onSuccess: (data) => {
        showToast(data.message, { variant: 'success' });
      }
    });
  };
  