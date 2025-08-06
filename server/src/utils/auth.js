// Mock user database
const MOCK_USERS = {
    'user-token': {
        id: '123',
        username: 'john_user',
        email: 'john@example.com',
        role: 'user',
        permissions: ['read:profile', 'update:profile'],
        createdAt: new Date('2024-01-01'),
    },
    'admin-token': {
        id: '456',
        username: 'jane_admin',
        email: 'jane@example.com',
        role: 'admin',
        permissions: ['read:profile', 'update:profile', 'delete:users', 'read:analytics', 'manage:system'],
        createdAt: new Date('2024-01-01'),
    },
};
export function getUserByToken(token) {
    return MOCK_USERS[token];
}
export function validateCredentials(username, password) {
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
