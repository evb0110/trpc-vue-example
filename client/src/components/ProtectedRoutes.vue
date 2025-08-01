<template>
    <section>
        <h2>Protected Routes (Requires Authentication)</h2>
        <div>
            <button @click="getProfile">Get Profile</button>
            <p v-if="profile">
                Profile: {{ profile.name }} (ID: {{ profile.id }})
            </p>
            <p v-if="profileLoading">Loading profile...</p>
            <p v-if="profileError" class="error">Error: {{ profileError }}</p>
        </div>
        
        <div class="update-section">
            <h3>Update Profile</h3>
            <form @submit.prevent="updateProfile">
                <input v-model="newName" placeholder="New name" required>
                <button :disabled="updateLoading" type="submit">
                    Update Name
                </button>
            </form>
            <p v-if="updateResult">
                Profile updated: {{ updateResult.name }}
            </p>
            <p v-if="updateLoading">Updating...</p>
            <p v-if="updateError" class="error">Error: {{ updateError }}</p>
        </div>
        
        <div class="rate-limited-section">
            <h3>Rate Limited Operations</h3>
            <button @click="generateReport('summary')">Generate Summary Report</button>
            <button @click="generateReport('detailed')">Generate Detailed Report</button>
            <p v-if="reportResult">
                {{ reportResult.report }} - Remaining requests: {{ reportResult.requestsRemaining }}
            </p>
            <p v-if="reportError" class="error">{{ reportError }}</p>
        </div>
    </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { trpc } from '../api/trpc';

// Profile states
const profile = ref<any>(null);
const profileLoading = ref(false);
const profileError = ref('');

// Update profile states
const newName = ref('');
const updateResult = ref<any>(null);
const updateLoading = ref(false);
const updateError = ref('');

// Report states
const reportResult = ref<any>(null);
const reportError = ref('');

async function getProfile() {
    profileLoading.value = true;
    profileError.value = '';
    try {
        profile.value = await trpc.getProfile.query();
    } catch (error: any) {
        profileError.value = error.message;
    } finally {
        profileLoading.value = false;
    }
}

async function updateProfile() {
    updateLoading.value = true;
    updateError.value = '';
    updateResult.value = null;
    try {
        updateResult.value = await trpc.updateProfile.mutate({
            name: newName.value,
        });
        newName.value = '';
        if (profile.value) {
            profile.value.name = updateResult.value.name;
        }
    } catch (error: any) {
        updateError.value = error.message;
    } finally {
        updateLoading.value = false;
    }
}

async function generateReport(type: 'summary' | 'detailed') {
    reportError.value = '';
    reportResult.value = null;
    try {
        reportResult.value = await trpc.generateReport.mutate({ type });
    } catch (error: any) {
        reportError.value = error.message;
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

.update-section,
.rate-limited-section {
    margin-top: 20px;
    padding-top: 20px;
    border-top: 1px solid #eee;
}

form {
    display: flex;
    gap: 10px;
    align-items: center;
    margin-bottom: 10px;
}

input {
    padding: 5px;
}

button {
    padding: 5px 15px;
    cursor: pointer;
    margin-right: 10px;
}

button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

.error {
    color: red;
    font-weight: bold;
}
</style>