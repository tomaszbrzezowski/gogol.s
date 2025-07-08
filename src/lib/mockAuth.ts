// Mock authentication data for testing
// In production, this would be handled by Supabase Auth

export const MOCK_ADMIN_CREDENTIALS = {
  admin: {
    email: 'admin@gogols.pl',
    password: 'admin123',
    id: '550e8400-e29b-41d4-a716-446655440000',
    role: 'admin',
    full_name: 'Administrator Gogols'
  },
  superadmin: {
    email: 'superadmin@gogols.pl', 
    password: 'superadmin123',
    id: '550e8400-e29b-41d4-a716-446655440001',
    role: 'super_admin',
    full_name: 'Super Administrator'
  }
};

// Mock user for testing (simplified)
export const createMockUser = (email: string) => {
  const creds = Object.values(MOCK_ADMIN_CREDENTIALS).find(c => c.email === email);
  
  if (!creds) {
    throw new Error('Invalid credentials');
  }
  
  return {
    id: creds.id,
    email: creds.email,
    user_metadata: {
      full_name: creds.full_name,
      role: creds.role
    },
    app_metadata: {},
    aud: 'authenticated',
    created_at: '2024-01-01T00:00:00.000Z',
    updated_at: '2024-01-01T00:00:00.000Z'
  };
};

// Check if credentials are valid
export const validateMockCredentials = (email: string, password: string): boolean => {
  const creds = Object.values(MOCK_ADMIN_CREDENTIALS).find(c => c.email === email);
  return creds ? creds.password === password : false;
}; 