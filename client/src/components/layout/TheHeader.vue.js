/// <reference types="../../../../node_modules/.vue-global-types/vue_3.5_0.d.ts" />
import { useAuthStore } from '../../stores/useAuthStore';
import BaseButton from '../base/BaseButton.vue';
const authStore = useAuthStore();
async function handleLogout() {
    try {
        await authStore.logout();
    }
    catch (error) {
        console.error('Logout failed:', error);
    }
}
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_elements;
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_elements.header, __VLS_elements.header)({
    ...{ class: "the-header" },
});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "the-header__container" },
});
__VLS_asFunctionalElement(__VLS_elements.h1, __VLS_elements.h1)({
    ...{ class: "the-header__title" },
});
if (__VLS_ctx.authStore.isAuthenticated) {
    // @ts-ignore
    [authStore,];
    __VLS_asFunctionalElement(__VLS_elements.nav, __VLS_elements.nav)({
        ...{ class: "the-header__nav" },
    });
    __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
        ...{ class: "the-header__user" },
    });
    (__VLS_ctx.authStore.user?.username);
    (__VLS_ctx.authStore.user?.role);
    // @ts-ignore
    [authStore, authStore,];
    /** @type {[typeof BaseButton, typeof BaseButton, ]} */ ;
    // @ts-ignore
    const __VLS_0 = __VLS_asFunctionalComponent(BaseButton, new BaseButton({
        ...{ 'onClick': {} },
        loading: (__VLS_ctx.authStore.isLoading),
        variant: "secondary",
        size: "small",
    }));
    const __VLS_1 = __VLS_0({
        ...{ 'onClick': {} },
        loading: (__VLS_ctx.authStore.isLoading),
        variant: "secondary",
        size: "small",
    }, ...__VLS_functionalComponentArgsRest(__VLS_0));
    let __VLS_3;
    let __VLS_4;
    const __VLS_5 = ({ click: {} },
        { onClick: (__VLS_ctx.handleLogout) });
    const { default: __VLS_6 } = __VLS_2.slots;
    // @ts-ignore
    [authStore, handleLogout,];
    var __VLS_2;
}
/** @type {__VLS_StyleScopedClasses['the-header']} */ ;
/** @type {__VLS_StyleScopedClasses['the-header__container']} */ ;
/** @type {__VLS_StyleScopedClasses['the-header__title']} */ ;
/** @type {__VLS_StyleScopedClasses['the-header__nav']} */ ;
/** @type {__VLS_StyleScopedClasses['the-header__user']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            BaseButton: BaseButton,
            authStore: authStore,
            handleLogout: handleLogout,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
    },
});
; /* PartiallyEnd: #4569/main.vue */
