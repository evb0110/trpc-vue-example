<template>
    <div id="app">
        <h1>tRPC + Vue Example</h1>
        
        <AuthSection />
        <PublicRoutes />
        <ProtectedRoutes />
        <AdminPanel />
    </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import AuthSection from './components/AuthSection.vue';
import PublicRoutes from './components/PublicRoutes.vue';
import ProtectedRoutes from './components/ProtectedRoutes.vue';
import AdminPanel from './components/AdminPanel.vue';

// Check authentication on mount
import { useAuth } from './composables/useAuth';

const { checkAuth } = useAuth();

onMounted(async () => {
    // Try to restore authentication from cookie
    await checkAuth();
});
</script>

<style>
#app {
    font-family: Arial, sans-serif;
    max-width: 800px;
    margin-inline: auto;
}

h1 {
    text-align: center;
    color: #333;
    margin-bottom: 40px;
}

*, *::before, *::after {
    margin: 0;
    box-sizing: border-box;
}
</style>