<template>
    <section class="auth-section">
        <h2>Authentication</h2>
        <div v-if="!isAuthenticated">
            <button @click="handleLoginAsUser">Login as User</button>
            <button @click="handleLoginAsAdmin">Login as Admin</button>
        </div>
        <div v-else>
            <button @click="handleLogout">Logout</button>
            <p>Logged in as: {{ currentUser?.name }} ({{ currentUser?.role }})</p>
            <button @click="showPermissions">Check Permissions</button>
            <div v-if="permissionsVisible && permissions.length > 0">
                <h4>Your Permissions:</h4>
                <ul>
                    <li v-for="perm in permissions" :key="perm">{{ perm }}</li>
                </ul>
            </div>
        </div>
        <p v-if="error" class="error">{{ error }}</p>
    </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useAuth } from '../composables/useAuth';

const {
    currentUser,
    permissions,
    isAuthenticated,
    error,
    loginAsUser,
    loginAsAdmin,
    logout,
    fetchPermissions,
} = useAuth();

const permissionsVisible = ref(false);

async function handleLoginAsUser() {
    await loginAsUser('user', 'password');
}

async function handleLoginAsAdmin() {
    await loginAsAdmin('admin', 'password');
}

async function handleLogout() {
    await logout();
    permissionsVisible.value = false;
}

async function showPermissions() {
    await fetchPermissions();
    permissionsVisible.value = !permissionsVisible.value;
}
</script>

<style scoped>
.auth-section {
    background-color: #f0f0f0;
    padding: 20px;
    margin-bottom: 20px;
    border-radius: 5px;
}

.error {
    color: red;
    font-weight: bold;
}
</style>