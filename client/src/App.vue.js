/// <reference types="../../node_modules/.vue-global-types/vue_3.5_0.d.ts" />
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
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_elements;
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    id: "app",
});
/** @type {[typeof TheHeader, ]} */ ;
// @ts-ignore
const __VLS_0 = __VLS_asFunctionalComponent(TheHeader, new TheHeader({}));
const __VLS_1 = __VLS_0({}, ...__VLS_functionalComponentArgsRest(__VLS_0));
__VLS_asFunctionalElement(__VLS_elements.main, __VLS_elements.main)({
    ...{ class: "app-main" },
});
/** @type {[typeof AuthSection, ]} */ ;
// @ts-ignore
const __VLS_4 = __VLS_asFunctionalComponent(AuthSection, new AuthSection({}));
const __VLS_5 = __VLS_4({}, ...__VLS_functionalComponentArgsRest(__VLS_4));
/** @type {[typeof PublicRoutes, ]} */ ;
// @ts-ignore
const __VLS_8 = __VLS_asFunctionalComponent(PublicRoutes, new PublicRoutes({}));
const __VLS_9 = __VLS_8({}, ...__VLS_functionalComponentArgsRest(__VLS_8));
if (__VLS_ctx.authStore.isAuthenticated) {
    // @ts-ignore
    [authStore,];
    /** @type {[typeof ProtectedRoutes, ]} */ ;
    // @ts-ignore
    const __VLS_12 = __VLS_asFunctionalComponent(ProtectedRoutes, new ProtectedRoutes({}));
    const __VLS_13 = __VLS_12({}, ...__VLS_functionalComponentArgsRest(__VLS_12));
}
if (__VLS_ctx.authStore.isAdmin) {
    // @ts-ignore
    [authStore,];
    /** @type {[typeof AdminPanel, ]} */ ;
    // @ts-ignore
    const __VLS_16 = __VLS_asFunctionalComponent(AdminPanel, new AdminPanel({}));
    const __VLS_17 = __VLS_16({}, ...__VLS_functionalComponentArgsRest(__VLS_16));
}
/** @type {__VLS_StyleScopedClasses['app-main']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            TheHeader: TheHeader,
            AuthSection: AuthSection,
            PublicRoutes: PublicRoutes,
            ProtectedRoutes: ProtectedRoutes,
            AdminPanel: AdminPanel,
            authStore: authStore,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
    },
});
; /* PartiallyEnd: #4569/main.vue */
