<template>
    <div id="app">
        <TheHeader />
    
        <main class="app-main">
            <AuthSection />
            <PublicRoutes />
            <ProtectedRoutes v-if="authStore.isAuthenticated" />
            <AdminPanel v-if="authStore.isAdmin" />
        </main>
    </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useAuthStore } from './stores/useAuthStore';
import TheHeader from './components/layout/TheHeader.vue';
import AuthSection from './components/feature/AuthSection.vue';
import PublicRoutes from './components/feature/PublicRoutes.vue';
import ProtectedRoutes from './components/feature/ProtectedRoutes.vue';
import AdminPanel from './components/feature/AdminPanel.vue';

const authStore = useAuthStore();

onMounted(async () => {
    // Try to restore authentication from cookie
    await authStore.fetchCurrentUser();
});
</script>

<style>
*, *::before, *::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  background-color: #f5f5f5;
  color: #333;
}

#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.app-main {
  flex: 1;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 24px 16px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

h1, h2, h3, h4, h5, h6 {
  color: #333;
}
</style>