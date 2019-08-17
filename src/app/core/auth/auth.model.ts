export interface ICredential {
  username: string;
  password: string;
}

export interface AuthState {
  isLoading: boolean;
  isAuthenticated: boolean;
  error: any;
}
