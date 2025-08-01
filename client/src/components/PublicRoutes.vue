<template>
    <div>
        <section>
            <h2>Query Example</h2>
            <input v-model="name" placeholder="Enter your name">
            <button @click="sayHello">Say Hello</button>
            <p v-if="greeting">{{ greeting }}</p>
            <p v-if="helloLoading">Loading...</p>
            <p v-if="helloError" class="error">Error: {{ helloError }}</p>
        </section>

        <section>
            <h2>Mutation Example</h2>
            <form @submit.prevent="handleSubmit">
                <input v-model="userName" placeholder="Name" required>
                <input
                    v-model="userEmail"
                    type="email"
                    placeholder="Email"
                    required
                >
                <button :disabled="createLoading" type="submit">
                    Create User
                </button>
            </form>
            <p v-if="createdUser">
                User created: {{ createdUser.name }} (ID: {{ createdUser.id }})
            </p>
            <p v-if="createLoading">Creating user...</p>
            <p v-if="createError" class="error">Error: {{ createError }}</p>
        </section>
        
        <section>
            <h2>Request Info</h2>
            <button @click="getRequestInfo">Get Request Info</button>
            <div v-if="requestInfo">
                <p>Your IP: {{ requestInfo.yourIp }}</p>
                <p>User Agent: {{ requestInfo.userAgent }}</p>
                <p>Request Count: {{ requestInfo.requestCount }}</p>
            </div>
        </section>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { trpc } from '../api/trpc';

// Query example states
const name = ref('World');
const greeting = ref('');
const helloLoading = ref(false);
const helloError = ref('');

// Mutation example states
const userName = ref('');
const userEmail = ref('');
const createdUser = ref<any>(null);
const createLoading = ref(false);
const createError = ref('');

// Request info state
const requestInfo = ref<any>(null);

async function sayHello() {
    helloLoading.value = true;
    helloError.value = '';
    try {
        const result = await trpc.hello.query({ name: name.value });
        greeting.value = result.greeting;
    } catch (error: any) {
        helloError.value = error.message;
    } finally {
        helloLoading.value = false;
    }
}

async function handleSubmit() {
    createLoading.value = true;
    createError.value = '';
    createdUser.value = null;
    try {
        createdUser.value = await trpc.createUser.mutate({
            name: userName.value,
            email: userEmail.value,
        });
        userName.value = '';
        userEmail.value = '';
    } catch (error: any) {
        createError.value = error.message;
    } finally {
        createLoading.value = false;
    }
}

async function getRequestInfo() {
    try {
        requestInfo.value = await trpc.getRequestInfo.query();
    } catch (error: any) {
        console.error('Error getting request info:', error);
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

form {
    display: flex;
    gap: 10px;
    align-items: center;
    margin-bottom: 10px;
}

input {
    margin-right: 10px;
    padding: 5px;
}

button {
    padding: 5px 15px;
    cursor: pointer;
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