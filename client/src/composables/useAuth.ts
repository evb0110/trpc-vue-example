import { computed, ref } from 'vue';
import { trpc } from '../api/trpc';

interface IUser {
    id: string;
    name: string;
    role: 'user' | 'admin';
}

interface IAuthState {
    currentUser: IUser | null;
    permissions: string[];
    isLoading: boolean;
    error: string | null;
}

const state = ref<IAuthState>({
    currentUser: null,
    permissions: [],
    isLoading: false,
    error: null,
});

export function useAuth() {
    const isAuthenticated = computed(() => Boolean(state.value.currentUser));
    const isAdmin = computed(() => state.value.currentUser?.role === 'admin');
    
    async function loginAsUser(username: string, password: string) {
        state.value.isLoading = true;
        state.value.error = null;
        
        try {
            const result = await trpc.loginAsUser.mutate({ username, password });
            if (result.success) {
                state.value.currentUser = result.user;
                await fetchPermissions();
            }
            return result;
        } catch (error: any) {
            state.value.error = error.message;
            throw error;
        } finally {
            state.value.isLoading = false;
        }
    }
    
    async function loginAsAdmin(username: string, password: string) {
        state.value.isLoading = true;
        state.value.error = null;
        
        try {
            const result = await trpc.loginAsAdmin.mutate({ username, password });
            if (result.success) {
                state.value.currentUser = result.user;
                await fetchPermissions();
            }
            return result;
        } catch (error: any) {
            state.value.error = error.message;
            throw error;
        } finally {
            state.value.isLoading = false;
        }
    }
    
    async function logout() {
        state.value.isLoading = true;
        state.value.error = null;
        
        try {
            await trpc.logout.mutate();
            state.value.currentUser = null;
            state.value.permissions = [];
        } catch (error: any) {
            state.value.error = error.message;
            throw error;
        } finally {
            state.value.isLoading = false;
        }
    }
    
    async function fetchPermissions() {
        try {
            const whoami = await trpc.whoami.query();
            state.value.permissions = whoami.permissions;
            return whoami;
        } catch (error: any) {
            // Not authenticated or error
            state.value.permissions = [];
            return null;
        }
    }
    
    async function checkAuth() {
        try {
            const whoami = await trpc.whoami.query();
            state.value.currentUser = {
                id: whoami.id,
                name: whoami.name,
                role: whoami.role,
            };
            state.value.permissions = whoami.permissions;
            return true;
        } catch {
            state.value.currentUser = null;
            state.value.permissions = [];
            return false;
        }
    }
    
    function hasPermission(permission: string): boolean {
        return state.value.permissions.includes(permission);
    }
    
    return {
        // State
        currentUser: computed(() => state.value.currentUser),
        permissions: computed(() => state.value.permissions),
        isLoading: computed(() => state.value.isLoading),
        error: computed(() => state.value.error),
        
        // Computed
        isAuthenticated,
        isAdmin,
        
        // Methods
        loginAsUser,
        loginAsAdmin,
        logout,
        checkAuth,
        fetchPermissions,
        hasPermission,
    };
}