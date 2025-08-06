import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { trpc } from '../api/trpc';
export const useAuthStore = defineStore('auth', () => {
    // State
    const user = ref(null);
    const isLoading = ref(false);
    const error = ref(null);
    // Getters
    const isAuthenticated = computed(() => Boolean(user.value));
    const isAdmin = computed(() => user.value?.role === 'admin');
    const hasPermission = computed(() => (permission) => user.value?.permissions.includes(permission) ?? false);
    // Actions
    async function login(username, password) {
        isLoading.value = true;
        error.value = null;
        try {
            const result = await trpc.auth.login.mutate({ username, password });
            if (result.success) {
                await fetchCurrentUser();
            }
            return result;
        }
        catch (e) {
            error.value = e instanceof Error ? e.message : 'Login failed';
            throw e;
        }
        finally {
            isLoading.value = false;
        }
    }
    async function logout() {
        isLoading.value = true;
        error.value = null;
        try {
            await trpc.auth.logout.mutate();
            user.value = null;
        }
        catch (e) {
            error.value = e instanceof Error ? e.message : 'Logout failed';
            throw e;
        }
        finally {
            isLoading.value = false;
        }
    }
    async function fetchCurrentUser() {
        isLoading.value = true;
        error.value = null;
        try {
            const currentUser = await trpc.auth.me.query();
            user.value = currentUser;
            return currentUser;
        }
        catch (e) {
            // Not authenticated, ignore error
            user.value = null;
            return null;
        }
        finally {
            isLoading.value = false;
        }
    }
    return {
        // State
        user: computed(() => user.value),
        isLoading: computed(() => isLoading.value),
        error: computed(() => error.value),
        // Getters
        isAuthenticated,
        isAdmin,
        hasPermission,
        // Actions
        login,
        logout,
        fetchCurrentUser,
    };
});
