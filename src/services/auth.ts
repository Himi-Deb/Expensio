// src/services/auth.ts
// Production Firebase Authentication layer
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  updateProfile,
  User as FirebaseUser
} from 'firebase/auth';
import { auth, USE_MOCK_AUTH } from './firebaseConfig';

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
  try {
    // 1. Production validation
    if (!payload.fullName || !payload.username || !payload.email || !payload.password) {
      return { success: false, message: 'Missing required registration parameters.' };
    }

    // 2. Firebase Registration or Mock
    let userCredential: any;

    if (USE_MOCK_AUTH) {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 800));
      userCredential = {
        user: {
          uid: 'mock-user-id-' + Math.random().toString(36).substr(2, 9),
          displayName: payload.fullName,
          email: payload.email
        }
      };
    } else {
      userCredential = await createUserWithEmailAndPassword(
        auth, 
        payload.email, 
        payload.password
      );

      // 3. Update Profile with full name
      await updateProfile(userCredential.user, {
        displayName: payload.fullName
      });
    }

    return {
      success: true,
      message: 'User registered successfully.',
      user: {
        id: userCredential.user.uid,
        name: userCredential.user.displayName,
        email: userCredential.user.email,
      }
    };
  } catch (error: any) {
    let errorMessage = 'Registration failed. Please try again.';
    if (error.code === 'auth/email-already-in-use') {
      errorMessage = 'This email is already in use.';
    } else if (error.code === 'auth/weak-password') {
      errorMessage = 'The password is too weak.';
    }
    return { success: false, message: errorMessage };
  }
}

/**
 * Mocks an asynchronous login endpoint allowing us to hook up React logic.
 * Cleanly swappable for Supabase `supabase.auth.signInWithPassword()` later.
 */
export async function loginUser(payload: LoginPayload): Promise<AuthResponse> {
  try {
    // 1. Firebase Sign In or Mock
    let userCredential: any;

    if (USE_MOCK_AUTH) {
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Allow specific test credentials
      if (payload.identifier === 'test@expensio.app' && payload.password === 'password123') {
        userCredential = {
          user: {
            uid: 'expensio-test-vault-id',
            displayName: 'TestUser',
            email: 'test@expensio.app'
          }
        };
      } else {
        throw { code: 'auth/wrong-password' };
      }
    } else {
      userCredential = await signInWithEmailAndPassword(
        auth, 
        payload.identifier, 
        payload.password
      );
    }

    return {
      success: true,
      message: 'User signed in successfully.',
      user: {
        id: userCredential.user.uid,
        name: userCredential.user.displayName,
        email: userCredential.user.email,
      }
    };
  } catch (error: any) {
    let errorMessage = 'Invalid email or password.';
    if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
      errorMessage = 'Incorrect email or password.';
    }
    return { success: false, message: errorMessage };
  }
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
