export interface AuthState {
  phoneNumber?: string;
  token?: string;
  timeOfLogin?: number;
} 

export interface LoginRequest {
  phone_number: string;
}

export interface LoginResponse {
    user: {
      code: string;
    }
}

export interface CodeVerificationRequest {
  code: string;
  phone_number: string;
}

export interface CodeVerificationResponse {
    token: string
}