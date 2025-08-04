<template>
    <section class="auth-section">
        <h2 class="auth-section__title">Authentication</h2>
    
        <div v-if="!authStore.isAuthenticated" class="auth-section__login">
            <BaseInput
                v-model="username"
                :disabled="authStore.isLoading"
                label="Username"
                placeholder="Enter username"
            />
            <BaseInput
                v-model="password"
                :disabled="authStore.isLoading"
                type="password"
                label="Password"
                placeholder="Enter password"
            />
            <div class="auth-section__buttons">
                <BaseButton
                    :loading="authStore.isLoading"
                    :disabled="!username || !password"
                    @click="handleLogin"
                >
                    Login
                </BaseButton>
                <BaseButton
                    :loading="authStore.isLoading"
                    variant="secondary"
                    @click="handleQuickLogin('user')"
                >
                    Quick Login as User
                </BaseButton>
                <BaseButton
                    :loading="authStore.isLoading"
                    variant="secondary"
                    @click="handleQuickLogin('admin')"
                >
                    Quick Login as Admin
                </BaseButton>
            </div>
        </div>
    
        <div v-else class="auth-section__user-info">
            <div class="auth-section__user-details">
                <h3>User Information</h3>
                <p><strong>Username:</strong> {{ authStore.user?.username }}</p>
                <p><strong>Email:</strong> {{ authStore.user?.email }}</p>
                <p><strong>Role:</strong> {{ authStore.user?.role }}</p>
            </div>
      
            <div class="auth-section__permissions">
                <h4>Permissions:</h4>
                <ul>
                    <li v-for="permission in authStore.user?.permissions" :key="permission">
                        {{ permission }}
                    </li>
                </ul>
            </div>
        </div>
    
        <div v-if="authStore.error" class="auth-section__error">
            {{ authStore.error }}
        </div>
    </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '../../stores/useAuthStore';
import BaseButton from '../base/BaseButton.vue';
import BaseInput from '../base/BaseInput.vue';

const authStore = useAuthStore();
const username = ref('');
const password = ref('');

async function handleLogin() {
    try {
        await authStore.login(username.value, password.value);
        username.value = '';
        password.value = '';
    } catch (error) {
        console.error('Login failed:', error);
    }
}

async function handleQuickLogin(role: 'user' | 'admin') {
    const credentials = role === 'admin'
        ? { username: 'admin', password: 'admin' }
        : { username: 'user', password: 'user' };
  
    username.value = credentials.username;
    password.value = credentials.password;
  
    try {
        await authStore.login(credentials.username, credentials.password);
        username.value = '';
        password.value = '';
    } catch (error) {
        console.error('Login failed:', error);
    }
}
</script>

<style scoped>
.auth-section {
  background-color: #f8f9fa;
  padding: 24px;
  margin-bottom: 24px;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.auth-section__title {
  margin-top: 0;
  margin-bottom: 20px;
  color: #333;
}

.auth-section__login {
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 400px;
}

.auth-section__buttons {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.auth-section__user-info {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}

.auth-section__user-details h3,
.auth-section__permissions h4 {
  margin-top: 0;
  margin-bottom: 12px;
  color: #333;
}

.auth-section__user-details p {
  margin: 8px 0;
  color: #666;
}

.auth-section__permissions ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.auth-section__permissions li {
  padding: 4px 8px;
  background-color: #e9ecef;
  border-radius: 4px;
  margin-bottom: 4px;
  font-size: 14px;
  color: #495057;
}

.auth-section__error {
  margin-top: 16px;
  padding: 12px;
  background-color: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
  border-radius: 4px;
}
</style>