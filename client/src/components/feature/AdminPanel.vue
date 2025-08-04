<template>
    <section class="admin-panel">
        <h2>Admin Panel</h2>
    
        <div v-if="!authStore.isAdmin" class="admin-panel__warning">
            <p>You must have admin privileges to access this panel.</p>
        </div>
    
        <div v-else class="admin-panel__content">
            <div class="admin-panel__actions">
                <BaseButton :loading="usersLoading" @click="getAllUsers">
                    Get All Users
                </BaseButton>
                <BaseButton :loading="statsLoading" variant="secondary" @click="getSystemStats">
                    Get System Stats
                </BaseButton>
                <BaseButton :loading="analyticsLoading" variant="secondary" @click="getAnalytics">
                    Get Analytics
                </BaseButton>
            </div>
      
            <!-- Users List -->
            <div v-if="users" class="admin-panel__section">
                <h3>All Users ({{ users.total }})</h3>
                <div class="admin-panel__users">
                    <div
                        v-for="user in users.users"
                        :key="user.id"
                        :class="{ 'admin-panel__user-card--selected': selectedUser?.id === user.id }"
                        class="admin-panel__user-card"
                        @click="selectedUser = user"
                    >
                        <div class="admin-panel__user-info">
                            <h4>{{ user.username }}</h4>
                            <p>{{ user.email }}</p>
                            <span :class="`admin-panel__badge--${user.role}`" class="admin-panel__badge">
                                {{ user.role }}
                            </span>
                        </div>
                        <BaseButton
                            v-if="user.role !== 'admin'"
                            :loading="deleteLoading === user.id"
                            variant="danger"
                            size="small"
                            @click.stop="deleteUser(user.id)"
                        >
                            Delete
                        </BaseButton>
                    </div>
                </div>
            </div>
      
            <!-- System Stats -->
            <div v-if="systemStats" class="admin-panel__section">
                <h3>System Statistics</h3>
                <div class="admin-panel__stats">
                    <div class="admin-panel__stat">
                        <span class="admin-panel__stat-label">Total Users</span>
                        <span class="admin-panel__stat-value">{{ systemStats.stats.totalUsers }}</span>
                    </div>
                    <div class="admin-panel__stat">
                        <span class="admin-panel__stat-label">Active Connections</span>
                        <span class="admin-panel__stat-value">{{ systemStats.stats.activeConnections }}</span>
                    </div>
                    <div class="admin-panel__stat">
                        <span class="admin-panel__stat-label">Server Uptime</span>
                        <span class="admin-panel__stat-value">{{ formatUptime(systemStats.stats.serverUptime) }}</span>
                    </div>
                    <div class="admin-panel__stat">
                        <span class="admin-panel__stat-label">Memory Usage</span>
                        <span class="admin-panel__stat-value">{{ formatMemory(systemStats.stats.memoryUsage.heapUsed) }}</span>
                    </div>
                </div>
            </div>
      
            <!-- Analytics -->
            <div v-if="analytics" class="admin-panel__section">
                <h3>Analytics</h3>
                <div class="admin-panel__analytics">
                    <div class="admin-panel__metric">
                        <h4>Daily Active Users</h4>
                        <p class="admin-panel__metric-value">{{ analytics.metrics.dailyActiveUsers }}</p>
                    </div>
                    <div class="admin-panel__metric">
                        <h4>Total Revenue</h4>
                        <p class="admin-panel__metric-value">${{ analytics.metrics.totalRevenue.toFixed(2) }}</p>
                    </div>
                    <div class="admin-panel__metric">
                        <h4>New Signups</h4>
                        <p class="admin-panel__metric-value">{{ analytics.metrics.newSignups }}</p>
                    </div>
                    <div class="admin-panel__metric">
                        <h4>Churn Rate</h4>
                        <p class="admin-panel__metric-value">{{ (analytics.metrics.churnRate * 100).toFixed(1) }}%</p>
                    </div>
                </div>
            </div>
      
            <p v-if="error" class="admin-panel__error">{{ error }}</p>
        </div>
    </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { trpc } from '../../api/trpc';
import { useAuthStore } from '../../stores/useAuthStore';
import BaseButton from '../base/BaseButton.vue';

const authStore = useAuthStore();

// State
const users = ref<any>(null);
const systemStats = ref<any>(null);
const analytics = ref<any>(null);
const selectedUser = ref<any>(null);
const error = ref('');

// Loading states
const usersLoading = ref(false);
const statsLoading = ref(false);
const analyticsLoading = ref(false);
const deleteLoading = ref<string | null>(null);

async function getAllUsers() {
    usersLoading.value = true;
    error.value = '';
    users.value = null;
  
    try {
        users.value = await trpc.admin.users.query();
    } catch (err: any) {
        error.value = err.message || 'Failed to load users';
    } finally {
        usersLoading.value = false;
    }
}

async function getSystemStats() {
    statsLoading.value = true;
    error.value = '';
    systemStats.value = null;
  
    try {
        systemStats.value = await trpc.admin.systemStats.query();
    } catch (err: any) {
        error.value = err.message || 'Failed to load system stats';
    } finally {
        statsLoading.value = false;
    }
}

async function getAnalytics() {
    analyticsLoading.value = true;
    error.value = '';
    analytics.value = null;
  
    try {
        analytics.value = await trpc.admin.analytics.query();
    } catch (err: any) {
        error.value = err.message || 'Failed to load analytics';
    } finally {
        analyticsLoading.value = false;
    }
}

async function deleteUser(userId: string) {
    if (!confirm('Are you sure you want to delete this user?')) {
        return;
    }
  
    deleteLoading.value = userId;
    error.value = '';
  
    try {
        await trpc.admin.deleteUser.mutate({ userId });
        // Refresh users list
        await getAllUsers();
        selectedUser.value = null;
    } catch (err: any) {
        error.value = err.message || 'Failed to delete user';
    } finally {
        deleteLoading.value = null;
    }
}

function formatUptime(seconds: number): string {
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
  
    if (days > 0) {
        return `${days}d ${hours}h ${minutes}m`;
    } else if (hours > 0) {
        return `${hours}h ${minutes}m`;
    } else {
        return `${minutes}m`;
    }
}

function formatMemory(bytes: number): string {
    return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}
</script>

<style scoped>
.admin-panel {
  background-color: white;
  padding: 24px;
  border: 1px solid #dee2e6;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.admin-panel h2 {
  margin-top: 0;
  margin-bottom: 20px;
  color: #333;
}

.admin-panel__warning {
  padding: 16px;
  background-color: #f8d7da;
  border: 1px solid #f5c6cb;
  border-radius: 4px;
  color: #721c24;
}

.admin-panel__content {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.admin-panel__actions {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.admin-panel__section {
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 8px;
}

.admin-panel__section h3 {
  margin-top: 0;
  margin-bottom: 16px;
  color: #495057;
}

/* Users List */
.admin-panel__users {
  display: grid;
  gap: 12px;
}

.admin-panel__user-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  background-color: white;
  border: 1px solid #dee2e6;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.admin-panel__user-card:hover {
  border-color: #007bff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.admin-panel__user-card--selected {
  border-color: #007bff;
  background-color: #e7f3ff;
}

.admin-panel__user-info h4 {
  margin: 0 0 4px;
  color: #333;
}

.admin-panel__user-info p {
  margin: 0 0 8px;
  color: #666;
  font-size: 14px;
}

.admin-panel__badge {
  display: inline-block;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  text-transform: uppercase;
}

.admin-panel__badge--user {
  background-color: #e9ecef;
  color: #495057;
}

.admin-panel__badge--admin {
  background-color: #d4edda;
  color: #155724;
}

/* System Stats */
.admin-panel__stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
}

.admin-panel__stat {
  display: flex;
  flex-direction: column;
  padding: 16px;
  background-color: white;
  border-radius: 4px;
}

.admin-panel__stat-label {
  font-size: 14px;
  color: #666;
  margin-bottom: 4px;
}

.admin-panel__stat-value {
  font-size: 24px;
  font-weight: bold;
  color: #333;
}

/* Analytics */
.admin-panel__analytics {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 16px;
}

.admin-panel__metric {
  padding: 16px;
  background-color: white;
  border-radius: 4px;
  text-align: center;
}

.admin-panel__metric h4 {
  margin: 0 0 8px;
  font-size: 14px;
  color: #666;
}

.admin-panel__metric-value {
  margin: 0;
  font-size: 28px;
  font-weight: bold;
  color: #007bff;
}

.admin-panel__error {
  padding: 12px;
  background-color: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
  border-radius: 4px;
}
</style>