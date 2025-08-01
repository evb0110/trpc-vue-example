<template>
    <section>
        <h2>Admin Panel (Requires Admin Role)</h2>
        <div class="admin-actions">
            <button @click="getAllUsers">Get All Users</button>
            <button @click="getSystemStats">Get System Stats</button>
            <button @click="getAnalytics">Get Analytics</button>
        </div>
        
        <div v-if="adminData" class="admin-data">
            <h3>Admin Data:</h3>
            <pre>{{ JSON.stringify(adminData, null, 2) }}</pre>
        </div>
        
        <div v-if="selectedUser" class="user-actions">
            <h3>User Actions</h3>
            <p>Selected user: {{ selectedUser.name }}</p>
            <button class="danger" @click="deleteSelectedUser">Delete User</button>
        </div>
        
        <p v-if="adminError" class="error">Admin Error: {{ adminError }}</p>
    </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { trpc } from '../api/trpc';

const adminData = ref<any>(null);
const adminError = ref('');
const selectedUser = ref<any>(null);

async function getAllUsers() {
    adminError.value = '';
    try {
        const result = await trpc.getAllUsers.query();
        adminData.value = result;
        
        // Allow selecting a user for deletion (not the admin themselves)
        if (result.users && result.users.length > 0) {
            selectedUser.value = result.users.find((u: any) => u.role !== 'admin');
        }
    } catch (error: any) {
        adminError.value = error.message;
    }
}

async function getSystemStats() {
    adminError.value = '';
    try {
        adminData.value = await trpc.getSystemStats.query();
    } catch (error: any) {
        adminError.value = error.message;
    }
}

async function getAnalytics() {
    adminError.value = '';
    try {
        adminData.value = await trpc.getAnalytics.query();
    } catch (error: any) {
        adminError.value = error.message;
    }
}

async function deleteSelectedUser() {
    if (!selectedUser.value) {
        return;
    }
    
    adminError.value = '';
    try {
        const result = await trpc.deleteUser.mutate({
            userId: selectedUser.value.id,
        });
        adminData.value = result;
        selectedUser.value = null;
    } catch (error: any) {
        adminError.value = error.message;
    }
}
</script>

<style scoped>
section {
    margin-bottom: 30px;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 5px;
}

.admin-actions {
    margin-bottom: 20px;
}

.admin-data {
    background-color: #f5f5f5;
    padding: 15px;
    border-radius: 5px;
    margin-bottom: 20px;
}

.user-actions {
    background-color: #fff3cd;
    padding: 15px;
    border-radius: 5px;
    margin-top: 20px;
}

button {
    padding: 5px 15px;
    cursor: pointer;
    margin-right: 10px;
    margin-bottom: 10px;
}

button.danger {
    background-color: #dc3545;
    color: white;
    border: none;
}

button.danger:hover {
    background-color: #c82333;
}

.error {
    color: red;
    font-weight: bold;
}

pre {
    background-color: #fff;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 3px;
    overflow-x: auto;
}
</style>