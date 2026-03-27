// src/services/auth.ts
// Simulated backend authentication layer for Registration Phase 2

export type RegisterPayload = {
  fullName: string;
  username: string;
  email: string;       // or phone
  password: string;
  hasConsented: boolean;
};

export type LoginPayload = {
  identifier: string;  // Email or Phone
  password: string;
};

export type AuthResponse = {
  success: boolean;
  message?: string;
  user?: any;
};

/**
 * Mocks an asynchronous registration endpoint allowing us to fully hook up our React logic.
 * Can be cleanly swapped later for Supabase `supabase.auth.signUp()`, Firebase, or a custom REST API.
 */
export async function registerUser(payload: RegisterPayload): Promise<AuthResponse> {
  // 1. Simulate server network delay
  await new Promise(resolve => setTimeout(resolve, 1500));

  // 2. Server-side validation mapping
  if (!payload.fullName || !payload.username || !payload.email || !payload.password) {
    return { success: false, message: 'Missing required registration parameters.' };
  }

  if (payload.password.length < 8) {
    return { success: false, message: 'Password must be at least 8 characters long.' };
  }

  if (!payload.hasConsented) {
    return { success: false, message: 'You must agree to the Terms of Service.' };
  }

  if (payload.email.includes('taken')) {
    return { success: false, message: 'This email is already taken. Please try another.' };
  }

  // 3. Simulated success return
  return {
    success: true,
    message: 'User registered successfully.',
    user: {
      id: Math.random().toString(36).substr(2, 9),
      name: payload.fullName,
      email: payload.email,
    }
  };
}

/**
 * Mocks an asynchronous login endpoint allowing us to hook up React logic.
 * Cleanly swappable for Supabase `supabase.auth.signInWithPassword()` later.
 */
export async function loginUser(payload: LoginPayload): Promise<AuthResponse> {
  // 1. Simulate server network delay
  await new Promise(resolve => setTimeout(resolve, 1500));

  // 2. Server-side validation mapping
  if (!payload.identifier || !payload.password) {
    return { success: false, message: 'Please provide both an identifier and a password.' };
  }

  // Generic simulation check (simulate WRONG password)
  if (payload.password === 'wrong') {
    return { success: false, message: 'Invalid email or password combination.' };
  }

  // 3. Simulated success return
  return {
    success: true,
    message: 'User signed in successfully.',
    user: {
      id: Math.random().toString(36).substr(2, 9),
      name: 'Existing User',
      email: payload.identifier.includes('@') ? payload.identifier : 'user@domain.com',
    }
  };
}

/**
 * Mocks an OAuth verification handler.
 * Expects an idToken or accessToken depending on the provider structure.
 */
export async function handleOAuthLogin(provider: 'google' | 'facebook', token?: string): Promise<AuthResponse> {
  // 1. Simulate server verification delay
  await new Promise(resolve => setTimeout(resolve, 1500));

  if (!token) {
    return { success: false, message: `${provider === 'google' ? 'Google' : 'Facebook'} authentication was cancelled or failed.` };
  }

  // 2. Simulated success return parsing mock token
  return {
    success: true,
    message: `Successfully authenticated via ${provider === 'google' ? 'Google' : 'Facebook'}!`,
    user: {
      id: Math.random().toString(36).substr(2, 9),
      name: `${provider === 'google' ? 'Google' : 'Facebook'} Social User`,
      email: `social_${provider}@mock.com`,
    }
  };
}
