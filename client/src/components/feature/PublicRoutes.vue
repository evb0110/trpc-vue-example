<template>
    <div class="public-routes">
        <section class="public-routes__section">
            <h2>Hello Query Example</h2>
            <div class="public-routes__form">
                <BaseInput
                    v-model="name"
                    :disabled="helloLoading"
                    placeholder="Enter your name"
                />
                <BaseButton
                    :loading="helloLoading"
                    :disabled="!name"
                    @click="sayHello"
                >
                    Say Hello
                </BaseButton>
            </div>
            <p v-if="greeting" class="public-routes__result">{{ greeting }}</p>
            <p v-if="helloError" class="public-routes__error">{{ helloError }}</p>
        </section>

        <section class="public-routes__section">
            <h2>Create User Example</h2>
            <form class="public-routes__form" @submit.prevent="handleCreateUser">
                <BaseInput
                    v-model="userName"
                    :disabled="createLoading"
                    :error="createError"
                    label="Username"
                    placeholder="Enter username"
                    required
                />
                <BaseInput
                    v-model="userEmail"
                    :disabled="createLoading"
                    type="email"
                    label="Email"
                    placeholder="Enter email"
                    required
                />
                <BaseButton
                    :loading="createLoading"
                    :disabled="!userName || !userEmail"
                    type="submit"
                >
                    Create User
                </BaseButton>
            </form>
            <div v-if="createdUser" class="public-routes__success">
                User created successfully!
                <ul>
                    <li>ID: {{ createdUser.id }}</li>
                    <li>Username: {{ createdUser.username }}</li>
                    <li>Email: {{ createdUser.email }}</li>
                </ul>
            </div>
        </section>
    
        <section class="public-routes__section">
            <h2>Request Information</h2>
            <BaseButton :loading="infoLoading" @click="getRequestInfo">
                Get Request Info
            </BaseButton>
            <div v-if="requestInfo" class="public-routes__info">
                <h3>Your Request Details:</h3>
                <ul>
                    <li><strong>IP Address:</strong> {{ requestInfo.ip }}</li>
                    <li><strong>User Agent:</strong> {{ requestInfo.userAgent }}</li>
                    <li><strong>Request Count:</strong> {{ requestInfo.requestCount }}</li>
                    <li><strong>Timestamp:</strong> {{ new Date(requestInfo.timestamp).toLocaleString() }}</li>
                </ul>
            </div>
        </section>

        <section class="public-routes__section">
            <h2>Rate Limited Example</h2>
            <div class="public-routes__form">
                <label>Report Type:</label>
                <select v-model="reportType" class="public-routes__select">
                    <option value="summary">Summary Report</option>
                    <option value="detailed">Detailed Report</option>
                </select>
                <BaseButton
                    :loading="reportLoading"
                    variant="secondary"
                    @click="generateReport"
                >
                    Generate Report
                </BaseButton>
            </div>
            <div v-if="reportResult" class="public-routes__success">
                <p>{{ reportResult.report }}</p>
                <p>Requests remaining: {{ reportResult.requestsRemaining }}</p>
            </div>
            <p v-if="reportError" class="public-routes__error">{{ reportError }}</p>
        </section>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { trpc } from '../../api/trpc';
import BaseButton from '../base/BaseButton.vue';
import BaseInput from '../base/BaseInput.vue';

// Hello query
const name = ref('World');
const greeting = ref('');
const helloLoading = ref(false);
const helloError = ref('');

// Create user mutation
const userName = ref('');
const userEmail = ref('');
const createdUser = ref<any>(null);
const createLoading = ref(false);
const createError = ref('');

// Request info
const requestInfo = ref<any>(null);
const infoLoading = ref(false);

// Rate limited report
const reportType = ref<'summary' | 'detailed'>('summary');
const reportResult = ref<any>(null);
const reportLoading = ref(false);
const reportError = ref('');

async function sayHello() {
    helloLoading.value = true;
    helloError.value = '';
    greeting.value = '';
  
    try {
        const result = await trpc.public.hello.query({ name: name.value });
        greeting.value = result.greeting;
    } catch (error: any) {
        helloError.value = error.message || 'Failed to get greeting';
    } finally {
        helloLoading.value = false;
    }
}

async function handleCreateUser() {
    createLoading.value = true;
    createError.value = '';
    createdUser.value = null;
  
    try {
        createdUser.value = await trpc.user.create.mutate({
            username: userName.value,
            email: userEmail.value,
        });
        userName.value = '';
        userEmail.value = '';
    } catch (error: any) {
        createError.value = error.message || 'Failed to create user';
    } finally {
        createLoading.value = false;
    }
}

async function getRequestInfo() {
    infoLoading.value = true;
    try {
        requestInfo.value = await trpc.public.requestInfo.query();
    } catch (error: any) {
        console.error('Error getting request info:', error);
    } finally {
        infoLoading.value = false;
    }
}

async function generateReport() {
    reportLoading.value = true;
    reportError.value = '';
    reportResult.value = null;
  
    try {
        reportResult.value = await trpc.public.generateReport.mutate({
            type: reportType.value,
        });
    } catch (error: any) {
        reportError.value = error.message || 'Failed to generate report';
    } finally {
        reportLoading.value = false;
    }
}
</script>

<style scoped>
.public-routes {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.public-routes__section {
  background-color: white;
  padding: 24px;
  border: 1px solid #dee2e6;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.public-routes__section h2 {
  margin-top: 0;
  margin-bottom: 16px;
  color: #333;
}

.public-routes__section h3 {
  margin-top: 0;
  margin-bottom: 12px;
  color: #495057;
  font-size: 16px;
}

.public-routes__form {
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-width: 500px;
}

.public-routes__result {
  margin-top: 16px;
  padding: 12px;
  background-color: #e7f3ff;
  border-radius: 4px;
  color: #004085;
}

.public-routes__success {
  margin-top: 16px;
  padding: 12px;
  background-color: #d4edda;
  border: 1px solid #c3e6cb;
  border-radius: 4px;
  color: #155724;
}

.public-routes__success ul {
  margin: 8px 0 0;
  padding-left: 20px;
}

.public-routes__error {
  margin-top: 16px;
  padding: 12px;
  background-color: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
  border-radius: 4px;
}

.public-routes__info {
  margin-top: 16px;
  padding: 16px;
  background-color: #f8f9fa;
  border-radius: 4px;
}

.public-routes__info ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.public-routes__info li {
  padding: 4px 0;
  color: #495057;
}

.public-routes__select {
  padding: 8px 12px;
  border: 1px solid #ced4da;
  border-radius: 4px;
  font-size: 16px;
  background-color: white;
  cursor: pointer;
}

.public-routes__select:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.1);
}

label {
  font-size: 14px;
  font-weight: 500;
  color: #333;
  margin-bottom: 4px;
}
</style>