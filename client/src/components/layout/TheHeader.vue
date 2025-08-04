<template>
    <header class="the-header">
        <div class="the-header__container">
            <h1 class="the-header__title">tRPC + Vue Example</h1>
            <nav v-if="authStore.isAuthenticated" class="the-header__nav">
                <span class="the-header__user">
                    {{ authStore.user?.username }} ({{ authStore.user?.role }})
                </span>
                <BaseButton
                    :loading="authStore.isLoading"
                    variant="secondary"
                    size="small"
                    @click="handleLogout"
                >
                    Logout
                </BaseButton>
            </nav>
        </div>
    </header>
</template>

<script setup lang="ts">
import { useAuthStore } from '../../stores/useAuthStore';
import BaseButton from '../base/BaseButton.vue';

const authStore = useAuthStore();

async function handleLogout() {
    try {
        await authStore.logout();
    } catch (error) {
        console.error('Logout failed:', error);
    }
}
</script>

<style scoped>
.the-header {
  background-color: #f8f9fa;
  border-bottom: 1px solid #dee2e6;
  padding: 16px 0;
}

.the-header__container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.the-header__title {
  font-size: 24px;
  margin: 0;
  color: #333;
}

.the-header__nav {
  display: flex;
  align-items: center;
  gap: 16px;
}

.the-header__user {
  font-size: 14px;
  color: #666;
}
</style>