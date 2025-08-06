/// <reference types="../../../../node_modules/.vue-global-types/vue_3.5_0.d.ts" />
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
    }
    catch (error) {
        console.error('Login failed:', error);
    }
}
async function handleQuickLogin(role) {
    const credentials = role === 'admin'
        ? { username: 'admin', password: 'admin' }
        : { username: 'user', password: 'user' };
    username.value = credentials.username;
    password.value = credentials.password;
    try {
        await authStore.login(credentials.username, credentials.password);
        username.value = '';
        password.value = '';
    }
    catch (error) {
        console.error('Login failed:', error);
    }
}
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_elements;
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['auth-section__user-details']} */ ;
/** @type {__VLS_StyleScopedClasses['auth-section__permissions']} */ ;
/** @type {__VLS_StyleScopedClasses['auth-section__permissions']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_elements.section, __VLS_elements.section)({
    ...{ class: "auth-section" },
});
__VLS_asFunctionalElement(__VLS_elements.h2, __VLS_elements.h2)({
    ...{ class: "auth-section__title" },
});
if (!__VLS_ctx.authStore.isAuthenticated) {
    // @ts-ignore
    [authStore,];
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "auth-section__login" },
    });
    /** @type {[typeof BaseInput, ]} */ ;
    // @ts-ignore
    const __VLS_0 = __VLS_asFunctionalComponent(BaseInput, new BaseInput({
        modelValue: (__VLS_ctx.username),
        disabled: (__VLS_ctx.authStore.isLoading),
        label: "Username",
        placeholder: "Enter username",
    }));
    const __VLS_1 = __VLS_0({
        modelValue: (__VLS_ctx.username),
        disabled: (__VLS_ctx.authStore.isLoading),
        label: "Username",
        placeholder: "Enter username",
    }, ...__VLS_functionalComponentArgsRest(__VLS_0));
    // @ts-ignore
    [authStore, username,];
    /** @type {[typeof BaseInput, ]} */ ;
    // @ts-ignore
    const __VLS_4 = __VLS_asFunctionalComponent(BaseInput, new BaseInput({
        modelValue: (__VLS_ctx.password),
        disabled: (__VLS_ctx.authStore.isLoading),
        type: "password",
        label: "Password",
        placeholder: "Enter password",
    }));
    const __VLS_5 = __VLS_4({
        modelValue: (__VLS_ctx.password),
        disabled: (__VLS_ctx.authStore.isLoading),
        type: "password",
        label: "Password",
        placeholder: "Enter password",
    }, ...__VLS_functionalComponentArgsRest(__VLS_4));
    // @ts-ignore
    [authStore, password,];
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "auth-section__buttons" },
    });
    /** @type {[typeof BaseButton, typeof BaseButton, ]} */ ;
    // @ts-ignore
    const __VLS_8 = __VLS_asFunctionalComponent(BaseButton, new BaseButton({
        ...{ 'onClick': {} },
        loading: (__VLS_ctx.authStore.isLoading),
        disabled: (!__VLS_ctx.username || !__VLS_ctx.password),
    }));
    const __VLS_9 = __VLS_8({
        ...{ 'onClick': {} },
        loading: (__VLS_ctx.authStore.isLoading),
        disabled: (!__VLS_ctx.username || !__VLS_ctx.password),
    }, ...__VLS_functionalComponentArgsRest(__VLS_8));
    let __VLS_11;
    let __VLS_12;
    const __VLS_13 = ({ click: {} },
        { onClick: (__VLS_ctx.handleLogin) });
    const { default: __VLS_14 } = __VLS_10.slots;
    // @ts-ignore
    [authStore, username, password, handleLogin,];
    var __VLS_10;
    /** @type {[typeof BaseButton, typeof BaseButton, ]} */ ;
    // @ts-ignore
    const __VLS_15 = __VLS_asFunctionalComponent(BaseButton, new BaseButton({
        ...{ 'onClick': {} },
        loading: (__VLS_ctx.authStore.isLoading),
        variant: "secondary",
    }));
    const __VLS_16 = __VLS_15({
        ...{ 'onClick': {} },
        loading: (__VLS_ctx.authStore.isLoading),
        variant: "secondary",
    }, ...__VLS_functionalComponentArgsRest(__VLS_15));
    let __VLS_18;
    let __VLS_19;
    const __VLS_20 = ({ click: {} },
        { onClick: (...[$event]) => {
                if (!(!__VLS_ctx.authStore.isAuthenticated))
                    return;
                __VLS_ctx.handleQuickLogin('user');
                // @ts-ignore
                [authStore, handleQuickLogin,];
            } });
    const { default: __VLS_21 } = __VLS_17.slots;
    var __VLS_17;
    /** @type {[typeof BaseButton, typeof BaseButton, ]} */ ;
    // @ts-ignore
    const __VLS_22 = __VLS_asFunctionalComponent(BaseButton, new BaseButton({
        ...{ 'onClick': {} },
        loading: (__VLS_ctx.authStore.isLoading),
        variant: "secondary",
    }));
    const __VLS_23 = __VLS_22({
        ...{ 'onClick': {} },
        loading: (__VLS_ctx.authStore.isLoading),
        variant: "secondary",
    }, ...__VLS_functionalComponentArgsRest(__VLS_22));
    let __VLS_25;
    let __VLS_26;
    const __VLS_27 = ({ click: {} },
        { onClick: (...[$event]) => {
                if (!(!__VLS_ctx.authStore.isAuthenticated))
                    return;
                __VLS_ctx.handleQuickLogin('admin');
                // @ts-ignore
                [authStore, handleQuickLogin,];
            } });
    const { default: __VLS_28 } = __VLS_24.slots;
    var __VLS_24;
}
else {
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "auth-section__user-info" },
    });
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "auth-section__user-details" },
    });
    __VLS_asFunctionalElement(__VLS_elements.h3, __VLS_elements.h3)({});
    __VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({});
    __VLS_asFunctionalElement(__VLS_elements.strong, __VLS_elements.strong)({});
    (__VLS_ctx.authStore.user?.username);
    // @ts-ignore
    [authStore,];
    __VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({});
    __VLS_asFunctionalElement(__VLS_elements.strong, __VLS_elements.strong)({});
    (__VLS_ctx.authStore.user?.email);
    // @ts-ignore
    [authStore,];
    __VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({});
    __VLS_asFunctionalElement(__VLS_elements.strong, __VLS_elements.strong)({});
    (__VLS_ctx.authStore.user?.role);
    // @ts-ignore
    [authStore,];
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "auth-section__permissions" },
    });
    __VLS_asFunctionalElement(__VLS_elements.h4, __VLS_elements.h4)({});
    __VLS_asFunctionalElement(__VLS_elements.ul, __VLS_elements.ul)({});
    for (const [permission] of __VLS_getVForSourceType((__VLS_ctx.authStore.user?.permissions))) {
        // @ts-ignore
        [authStore,];
        __VLS_asFunctionalElement(__VLS_elements.li, __VLS_elements.li)({
            key: (permission),
        });
        (permission);
    }
}
if (__VLS_ctx.authStore.error) {
    // @ts-ignore
    [authStore,];
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "auth-section__error" },
    });
    (__VLS_ctx.authStore.error);
    // @ts-ignore
    [authStore,];
}
/** @type {__VLS_StyleScopedClasses['auth-section']} */ ;
/** @type {__VLS_StyleScopedClasses['auth-section__title']} */ ;
/** @type {__VLS_StyleScopedClasses['auth-section__login']} */ ;
/** @type {__VLS_StyleScopedClasses['auth-section__buttons']} */ ;
/** @type {__VLS_StyleScopedClasses['auth-section__user-info']} */ ;
/** @type {__VLS_StyleScopedClasses['auth-section__user-details']} */ ;
/** @type {__VLS_StyleScopedClasses['auth-section__permissions']} */ ;
/** @type {__VLS_StyleScopedClasses['auth-section__error']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            BaseButton: BaseButton,
            BaseInput: BaseInput,
            authStore: authStore,
            username: username,
            password: password,
            handleLogin: handleLogin,
            handleQuickLogin: handleQuickLogin,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
    },
});
; /* PartiallyEnd: #4569/main.vue */
