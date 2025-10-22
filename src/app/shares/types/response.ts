type ApiResponse<T> = {
  status: number;
  message?: string;
  data?: T;
};

export type { ApiResponse };
