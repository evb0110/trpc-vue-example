<template>
    <div id="app">
        <h1>tRPC + Vue Example</h1>
        
        <section class="auth-section">
            <h2>Authentication</h2>
            <div v-if="!isAuthenticated">
                <button @click="loginAsUser">Login as User</button>
                <button @click="loginAsAdmin">Login as Admin</button>
            </div>
            <div v-else>
                <button @click="logout">Logout</button>
                <p>Logged in as: {{ currentUser?.name }} ({{ currentUser?.role }})</p>
                <button @click="checkWhoAmI">Check Permissions</button>
                <div v-if="whoamiData">
                    <h4>Your Permissions:</h4>
                    <ul>
                        <li v-for="perm in whoamiData.permissions" :key="perm">{{ perm }}</li>
                    </ul>
                </div>
            </div>
        </section>
    
        <section>
            <h2>Query Example</h2>
            <input v-model="name" placeholder="Enter your name">
            <button @click="sayHello">Say Hello</button>
            <p v-if="greeting">{{ greeting }}</p>
            <p v-if="helloLoading">Loading...</p>
            <p v-if="helloError">Error: {{ helloError }}</p>
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
            <p v-if="createError">Error: {{ createError }}</p>
        </section>
        
        <section>
            <h2>Protected Routes (Requires Authentication)</h2>
            <div>
                <button @click="getProfile">Get Profile</button>
                <p v-if="profile">
                    Profile: {{ profile.name }} (ID: {{ profile.id }})
                </p>
                <p v-if="profileLoading">Loading profile...</p>
                <p v-if="profileError" style="color: red; font-weight: bold;">Error: {{ profileError }}</p>
            </div>
            
            <div style="margin-top: 20px;">
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
                <p v-if="updateError" style="color: red; font-weight: bold;">Error: {{ updateError }}</p>
            </div>
        </section>
        
        <section>
            <h2>Admin Panel (Requires Admin Role)</h2>
            <div>
                <button @click="getAllUsers">Get All Users</button>
                <button @click="getSystemStats">Get System Stats</button>
                <button @click="getAnalytics">Get Analytics</button>
            </div>
            
            <div v-if="adminData">
                <h3>Admin Data:</h3>
                <pre>{{ JSON.stringify(adminData, null, 2) }}</pre>
            </div>
            <p v-if="adminError" style="color: red; font-weight: bold;">Admin Error: {{ adminError }}</p>
        </section>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { trpc, setAuthToken, clearAuthToken } from './trpc';

// Authentication state
const authToken = ref<string | null>(null);
const currentUser = ref<{ name: string; role: string } | null>(null);
const isAuthenticated = computed(() => !!authToken.value);
const whoamiData = ref<any>(null);

// Public route states
const name = ref('World');
const userName = ref('');
const userEmail = ref('');

const greeting = ref('');
const helloLoading = ref(false);
const helloError = ref('');

const createdUser = ref<any>(null);
const createLoading = ref(false);
const createError = ref('');

// Protected route states
const profile = ref<any>(null);
const profileLoading = ref(false);
const profileError = ref('');

const newName = ref('');
const updateResult = ref<any>(null);
const updateLoading = ref(false);
const updateError = ref('');

// Admin states
const adminData = ref<any>(null);
const adminError = ref('');

// Authentication methods
const loginAsUser = () => {
    authToken.value = 'user-token';
    setAuthToken(authToken.value);
    currentUser.value = { name: 'John User', role: 'user' };
    whoamiData.value = null;
    adminData.value = null;
};

const loginAsAdmin = () => {
    authToken.value = 'admin-token';
    setAuthToken(authToken.value);
    currentUser.value = { name: 'Jane Admin', role: 'admin' };
    whoamiData.value = null;
    adminData.value = null;
};

const logout = () => {
    authToken.value = null;
    clearAuthToken();
    currentUser.value = null;
    profile.value = null;
    updateResult.value = null;
    whoamiData.value = null;
    adminData.value = null;
};

const checkWhoAmI = async () => {
    try {
        whoamiData.value = await trpc.whoami.query();
    } catch (error: any) {
        console.error('Whoami error:', error.message);
    }
};

// Public route methods
const sayHello = async () => {
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
};

const handleSubmit = async () => {
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
};

// Protected route methods
const getProfile = async () => {
    profileLoading.value = true;
    profileError.value = '';
    try {
        profile.value = await trpc.getProfile.query();
    } catch (error: any) {
        profileError.value = error.message;
    } finally {
        profileLoading.value = false;
    }
};

const updateProfile = async () => {
    updateLoading.value = true;
    updateError.value = '';
    updateResult.value = null;
    try {
        updateResult.value = await trpc.updateProfile.mutate({
            name: newName.value,
        });
        newName.value = '';
        // Update the profile display
        if (profile.value) {
            profile.value.name = updateResult.value.name;
        }
    } catch (error: any) {
        updateError.value = error.message;
    } finally {
        updateLoading.value = false;
    }
};

// Admin methods
const getAllUsers = async () => {
    adminError.value = '';
    try {
        adminData.value = await trpc.getAllUsers.query();
    } catch (error: any) {
        adminError.value = error.message;
    }
};

const getSystemStats = async () => {
    adminError.value = '';
    try {
        adminData.value = await trpc.getSystemStats.query();
    } catch (error: any) {
        adminError.value = error.message;
    }
};

const getAnalytics = async () => {
    adminError.value = '';
    try {
        adminData.value = await trpc.getAnalytics.query();
    } catch (error: any) {
        adminError.value = error.message;
    }
};
</script>

<style>
#app {
  font-family: Arial, sans-serif;
  max-width: 600px;
  margin: 50px auto;
  padding: 20px;
}

section {
  margin-bottom: 30px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
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

.auth-section {
  background-color: #f0f0f0;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 5px;
}

form {
  display: flex;
  gap: 10px;
  align-items: center;
  margin-bottom: 10px;
}
</style>