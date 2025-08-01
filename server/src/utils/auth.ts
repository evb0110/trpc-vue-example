import type { TUser } from '../types';

// Mock user database
const MOCK_USERS: Record<string, TUser> = {
    'user-token': {
        id: '123',
        name: 'John User',
        role: 'user',
        permissions: ['read:profile', 'update:profile'],
    },
    'admin-token': {
        id: '456',
        name: 'Jane Admin',
        role: 'admin',
        permissions: ['read:profile', 'update:profile', 'delete:users', 'read:analytics', 'manage:system'],
    },
};

export function getUserByToken(token: string): TUser | undefined {
    return MOCK_USERS[token];
}

export function validateCredentials(username: string, password: string): { token: string; user: TUser } | null {
    // In production, validate against database and generate JWT
    // For demo, accept any credentials and return appropriate token
    
    if (username === 'admin') {
        return {
            token: 'admin-token',
            user: MOCK_USERS['admin-token'],
        };
    }
    
    // Default to regular user for any other username
    return {
        token: 'user-token',
        user: MOCK_USERS['user-token'],
    };
}