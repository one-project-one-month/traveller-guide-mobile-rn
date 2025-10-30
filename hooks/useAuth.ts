import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useAuthStore } from '@/stores/authStore';
import { authService, LoginRequest, RegisterRequest } from '@/services/authService';

export const useAuth = () => {
  const { user, token, isAuthenticated, isLoading, login, logout, setLoading } = useAuthStore();
  const queryClient = useQueryClient();

  const loginMutation = useMutation({
    mutationFn: authService.login,
    onMutate: () => {
      setLoading(true);
    },
    onSuccess: (data) => {
      login(data.user, data.token);
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
    onError: (error) => {
      console.error('Login error:', error);
      setLoading(false);
    },
  });

  const registerMutation = useMutation({
    mutationFn: authService.register,
    onMutate: () => {
      setLoading(true);
    },
    onSuccess: (data) => {
      login(data.user, data.token);
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
    onError: (error) => {
      console.error('Register error:', error);
      setLoading(false);
    },
  });

  const logoutMutation = useMutation({
    mutationFn: authService.logout,
    onSuccess: () => {
      logout();
      queryClient.clear();
    },
    onError: () => {
      // Even if the API call fails, we should still logout locally
      logout();
      queryClient.clear();
    },
  });

  const forgotPasswordMutation = useMutation({
    mutationFn: authService.forgotPassword,
  });

  const resetPasswordMutation = useMutation({
    mutationFn: ({ token, password }: { token: string; password: string }) =>
      authService.resetPassword(token, password),
  });

  const updateProfileMutation = useMutation({
    mutationFn: authService.updateProfile,
    onSuccess: (updatedUser) => {
      useAuthStore.getState().setUser(updatedUser);
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
  });

  // Query for getting user profile
  const profileQuery = useQuery({
    queryKey: ['profile'],
    queryFn: authService.getProfile,
    enabled: isAuthenticated && !!token,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  return {
    // State
    user,
    token,
    isAuthenticated,
    isLoading: isLoading || loginMutation.isPending || registerMutation.isPending,

    // Mutations
    login: loginMutation.mutate,
    register: registerMutation.mutate,
    logout: logoutMutation.mutate,
    forgotPassword: forgotPasswordMutation.mutate,
    resetPassword: resetPasswordMutation.mutate,
    updateProfile: updateProfileMutation.mutate,

    // Mutation states
    loginError: loginMutation.error,
    registerError: registerMutation.error,
    forgotPasswordError: forgotPasswordMutation.error,
    resetPasswordError: resetPasswordMutation.error,
    updateProfileError: updateProfileMutation.error,

    loginSuccess: loginMutation.isSuccess,
    registerSuccess: registerMutation.isSuccess,
    forgotPasswordSuccess: forgotPasswordMutation.isSuccess,
    resetPasswordSuccess: resetPasswordMutation.isSuccess,

    // Profile query
    profileData: profileQuery.data,
    profileError: profileQuery.error,
    isProfileLoading: profileQuery.isLoading,
  };
};
