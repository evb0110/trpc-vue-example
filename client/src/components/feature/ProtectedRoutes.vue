<template>
    <section class="protected-routes">
        <h2>Protected Routes (Requires Authentication)</h2>
    
        <div v-if="!authStore.isAuthenticated" class="protected-routes__warning">
            <p>You must be logged in to access these features.</p>
        </div>
    
        <div v-else class="protected-routes__content">
            <div class="protected-routes__section">
                <h3>User Profile</h3>
                <BaseButton :loading="profileLoading" @click="getProfile">
                    Get Profile
                </BaseButton>
                <div v-if="profile" class="protected-routes__profile">
                    <h4>Profile Information:</h4>
                    <ul>
                        <li><strong>ID:</strong> {{ profile.id }}</li>
                        <li><strong>Username:</strong> {{ profile.username }}</li>
                        <li><strong>Email:</strong> {{ profile.email }}</li>
                        <li><strong>Role:</strong> {{ profile.role }}</li>
                        <li><strong>Joined:</strong> {{ new Date(profile.joinedAt).toLocaleDateString() }}</li>
                    </ul>
                </div>
                <p v-if="profileError" class="protected-routes__error">{{ profileError }}</p>
            </div>
      
            <div class="protected-routes__section">
                <h3>Update Profile</h3>
                <form class="protected-routes__form" @submit.prevent="updateProfile">
                    <BaseInput
                        v-model="newUsername"
                        :disabled="updateLoading"
                        label="New Username"
                        placeholder="Enter new username"
                    />
                    <BaseInput
                        v-model="newEmail"
                        :disabled="updateLoading"
                        type="email"
                        label="New Email"
                        placeholder="Enter new email"
                    />
                    <BaseButton
                        :loading="updateLoading"
                        :disabled="!newUsername && !newEmail"
                        type="submit"
                    >
                        Update Profile
                    </BaseButton>
                </form>
                <div v-if="updateResult" class="protected-routes__success">
                    Profile updated successfully!
                </div>
                <p v-if="updateError" class="protected-routes__error">{{ updateError }}</p>
            </div>
      
            <div class="protected-routes__section">
                <h3>Danger Zone</h3>
                <p>This action requires authentication and is rate-limited.</p>
                <BaseButton
                    :loading="deleteLoading"
                    variant="danger"
                    @click="deleteAccount"
                >
                    Delete Account
                </BaseButton>
                <div v-if="deleteResult" class="protected-routes__warning">
                    {{ deleteResult.message }}
                </div>
                <p v-if="deleteError" class="protected-routes__error">{{ deleteError }}</p>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { trpc } from '../../api/trpc';
import { useAuthStore } from '../../stores/useAuthStore';
import BaseButton from '../base/BaseButton.vue';
import BaseInput from '../base/BaseInput.vue';

const authStore = useAuthStore();

// Profile states
const profile = ref<any>(null);
const profileLoading = ref(false);
const profileError = ref('');

// Update profile states
const newUsername = ref('');
const newEmail = ref('');
const updateResult = ref<any>(null);
const updateLoading = ref(false);
const updateError = ref('');

// Delete account states
const deleteResult = ref<any>(null);
const deleteLoading = ref(false);
const deleteError = ref('');

async function getProfile() {
    profileLoading.value = true;
    profileError.value = '';
    profile.value = null;
  
    try {
        profile.value = await trpc.user.profile.query();
    } catch (error: any) {
        profileError.value = error.message || 'Failed to load profile';
    } finally {
        profileLoading.value = false;
    }
}

async function updateProfile() {
    updateLoading.value = true;
    updateError.value = '';
    updateResult.value = null;
  
    try {
        const updates: any = {};
        if (newUsername.value) {
            updates.username = newUsername.value;
        }
        if (newEmail.value) {
            updates.email = newEmail.value;
        }
    
        updateResult.value = await trpc.user.updateProfile.mutate(updates);
    
        // Update the auth store with new user data
        if (updateResult.value.success) {
            await authStore.fetchCurrentUser();
            newUsername.value = '';
            newEmail.value = '';
      
            // Refresh profile if it was loaded
            if (profile.value) {
                await getProfile();
            }
        }
    } catch (error: any) {
        updateError.value = error.message || 'Failed to update profile';
    } finally {
        updateLoading.value = false;
    }
}

async function deleteAccount() {
    if (!confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
        return;
    }
  
    deleteLoading.value = true;
    deleteError.value = '';
    deleteResult.value = null;
  
    try {
        deleteResult.value = await trpc.user.delete.mutate();
    } catch (error: any) {
        deleteError.value = error.message || 'Failed to delete account';
    } finally {
        deleteLoading.value = false;
    }
}
</script>

<style scoped>
.protected-routes {
  background-color: white;
  padding: 24px;
  border: 1px solid #dee2e6;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.protected-routes h2 {
  margin-top: 0;
  margin-bottom: 20px;
  color: #333;
}

.protected-routes__warning {
  padding: 16px;
  background-color: #fff3cd;
  border: 1px solid #ffeaa7;
  border-radius: 4px;
  color: #856404;
}

.protected-routes__content {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.protected-routes__section {
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 8px;
}

.protected-routes__section h3 {
  margin-top: 0;
  margin-bottom: 16px;
  color: #495057;
}

.protected-routes__profile {
  margin-top: 16px;
  padding: 16px;
  background-color: white;
  border-radius: 4px;
}

.protected-routes__profile h4 {
  margin-top: 0;
  margin-bottom: 12px;
  color: #333;
  font-size: 16px;
}

.protected-routes__profile ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.protected-routes__profile li {
  padding: 4px 0;
  color: #666;
}

.protected-routes__form {
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-width: 400px;
}

.protected-routes__success {
  margin-top: 16px;
  padding: 12px;
  background-color: #d4edda;
  border: 1px solid #c3e6cb;
  border-radius: 4px;
  color: #155724;
}

.protected-routes__error {
  margin-top: 16px;
  padding: 12px;
  background-color: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
  border-radius: 4px;
}
</style>