import { AxiosError } from 'axios';

export interface ApiError {
  message: string;
  status?: number;
  code?: string;
}

export const handleApiError = (error: unknown): ApiError => {
  if (error instanceof AxiosError) {
    const status = error.response?.status;
    const message = error.response?.data?.message || error.message;
    const code = error.response?.data?.code || error.code;

    // Handle specific status codes
    switch (status) {
      case 400:
        return {
          message: message || 'Bad request. Please check your input.',
          status,
          code,
        };
      case 401:
        return {
          message: 'Authentication required. Please log in.',
          status,
          code,
        };
      case 403:
        return {
          message: 'Access denied. You don\'t have permission to perform this action.',
          status,
          code,
        };
      case 404:
        return {
          message: 'Resource not found.',
          status,
          code,
        };
      case 422:
        return {
          message: message || 'Validation error. Please check your input.',
          status,
          code,
        };
      case 429:
        return {
          message: 'Too many requests. Please try again later.',
          status,
          code,
        };
      case 500:
        return {
          message: 'Server error. Please try again later.',
          status,
          code,
        };
      default:
        return {
          message: message || 'An unexpected error occurred.',
          status,
          code,
        };
    }
  }

  // Handle network errors
  if (error instanceof Error) {
    if (error.message.includes('Network Error')) {
      return {
        message: 'Network error. Please check your internet connection.',
      };
    }

    return {
      message: error.message || 'An unexpected error occurred.',
    };
  }

  return {
    message: 'An unexpected error occurred.',
  };
};

export const getErrorMessage = (error: unknown): string => {
  return handleApiError(error).message;
};
