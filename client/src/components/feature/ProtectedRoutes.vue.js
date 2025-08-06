/// <reference types="../../../../node_modules/.vue-global-types/vue_3.5_0.d.ts" />
import { ref } from 'vue';
import { trpc } from '../../api/trpc';
import { useAuthStore } from '../../stores/useAuthStore';
import BaseButton from '../base/BaseButton.vue';
import BaseInput from '../base/BaseInput.vue';
const authStore = useAuthStore();
// Profile states
const profile = ref(null);
const profileLoading = ref(false);
const profileError = ref('');
// Update profile states
const newUsername = ref('');
const newEmail = ref('');
const updateResult = ref(null);
const updateLoading = ref(false);
const updateError = ref('');
// Delete account states
const deleteResult = ref(null);
const deleteLoading = ref(false);
const deleteError = ref('');
async function getProfile() {
    profileLoading.value = true;
    profileError.value = '';
    profile.value = null;
    try {
        profile.value = await trpc.user.profile.query();
    }
    catch (error) {
        profileError.value = error.message || 'Failed to load profile';
    }
    finally {
        profileLoading.value = false;
    }
}
async function updateProfile() {
    updateLoading.value = true;
    updateError.value = '';
    updateResult.value = null;
    try {
        const updates = {};
        if (newUsername.value) {
            updates.username = newUsername.value;
        }
        if (newEmail.value) {
            updates.email = newEmail.value;
        }
        updateResult.value = await trpc.user.updateProfile.mutate(updates);
        // Update the auth store with new user data
        if (updateResult.value.success) {
            await authStore.fetchCurrentUser();
            newUsername.value = '';
            newEmail.value = '';
            // Refresh profile if it was loaded
            if (profile.value) {
                await getProfile();
            }
        }
    }
    catch (error) {
        updateError.value = error.message || 'Failed to update profile';
    }
    finally {
        updateLoading.value = false;
    }
}
async function deleteAccount() {
    if (!confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
        return;
    }
    deleteLoading.value = true;
    deleteError.value = '';
    deleteResult.value = null;
    try {
        deleteResult.value = await trpc.user.delete.mutate();
    }
    catch (error) {
        deleteError.value = error.message || 'Failed to delete account';
    }
    finally {
        deleteLoading.value = false;
    }
}
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_elements;
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['protected-routes']} */ ;
/** @type {__VLS_StyleScopedClasses['protected-routes__section']} */ ;
/** @type {__VLS_StyleScopedClasses['protected-routes__profile']} */ ;
/** @type {__VLS_StyleScopedClasses['protected-routes__profile']} */ ;
/** @type {__VLS_StyleScopedClasses['protected-routes__profile']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_elements.section, __VLS_elements.section)({
    ...{ class: "protected-routes" },
});
__VLS_asFunctionalElement(__VLS_elements.h2, __VLS_elements.h2)({});
if (!__VLS_ctx.authStore.isAuthenticated) {
    // @ts-ignore
    [authStore,];
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "protected-routes__warning" },
    });
    __VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({});
}
else {
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "protected-routes__content" },
    });
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "protected-routes__section" },
    });
    __VLS_asFunctionalElement(__VLS_elements.h3, __VLS_elements.h3)({});
    /** @type {[typeof BaseButton, typeof BaseButton, ]} */ ;
    // @ts-ignore
    const __VLS_0 = __VLS_asFunctionalComponent(BaseButton, new BaseButton({
        ...{ 'onClick': {} },
        loading: (__VLS_ctx.profileLoading),
    }));
    const __VLS_1 = __VLS_0({
        ...{ 'onClick': {} },
        loading: (__VLS_ctx.profileLoading),
    }, ...__VLS_functionalComponentArgsRest(__VLS_0));
    let __VLS_3;
    let __VLS_4;
    const __VLS_5 = ({ click: {} },
        { onClick: (__VLS_ctx.getProfile) });
    const { default: __VLS_6 } = __VLS_2.slots;
    // @ts-ignore
    [profileLoading, getProfile,];
    var __VLS_2;
    if (__VLS_ctx.profile) {
        // @ts-ignore
        [profile,];
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            ...{ class: "protected-routes__profile" },
        });
        __VLS_asFunctionalElement(__VLS_elements.h4, __VLS_elements.h4)({});
        __VLS_asFunctionalElement(__VLS_elements.ul, __VLS_elements.ul)({});
        __VLS_asFunctionalElement(__VLS_elements.li, __VLS_elements.li)({});
        __VLS_asFunctionalElement(__VLS_elements.strong, __VLS_elements.strong)({});
        (__VLS_ctx.profile.id);
        // @ts-ignore
        [profile,];
        __VLS_asFunctionalElement(__VLS_elements.li, __VLS_elements.li)({});
        __VLS_asFunctionalElement(__VLS_elements.strong, __VLS_elements.strong)({});
        (__VLS_ctx.profile.username);
        // @ts-ignore
        [profile,];
        __VLS_asFunctionalElement(__VLS_elements.li, __VLS_elements.li)({});
        __VLS_asFunctionalElement(__VLS_elements.strong, __VLS_elements.strong)({});
        (__VLS_ctx.profile.email);
        // @ts-ignore
        [profile,];
        __VLS_asFunctionalElement(__VLS_elements.li, __VLS_elements.li)({});
        __VLS_asFunctionalElement(__VLS_elements.strong, __VLS_elements.strong)({});
        (__VLS_ctx.profile.role);
        // @ts-ignore
        [profile,];
        __VLS_asFunctionalElement(__VLS_elements.li, __VLS_elements.li)({});
        __VLS_asFunctionalElement(__VLS_elements.strong, __VLS_elements.strong)({});
        (new Date(__VLS_ctx.profile.joinedAt).toLocaleDateString());
        // @ts-ignore
        [profile,];
    }
    if (__VLS_ctx.profileError) {
        // @ts-ignore
        [profileError,];
        __VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({
            ...{ class: "protected-routes__error" },
        });
        (__VLS_ctx.profileError);
        // @ts-ignore
        [profileError,];
    }
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "protected-routes__section" },
    });
    __VLS_asFunctionalElement(__VLS_elements.h3, __VLS_elements.h3)({});
    __VLS_asFunctionalElement(__VLS_elements.form, __VLS_elements.form)({
        ...{ onSubmit: (__VLS_ctx.updateProfile) },
        ...{ class: "protected-routes__form" },
    });
    // @ts-ignore
    [updateProfile,];
    /** @type {[typeof BaseInput, ]} */ ;
    // @ts-ignore
    const __VLS_7 = __VLS_asFunctionalComponent(BaseInput, new BaseInput({
        modelValue: (__VLS_ctx.newUsername),
        disabled: (__VLS_ctx.updateLoading),
        label: "New Username",
        placeholder: "Enter new username",
    }));
    const __VLS_8 = __VLS_7({
        modelValue: (__VLS_ctx.newUsername),
        disabled: (__VLS_ctx.updateLoading),
        label: "New Username",
        placeholder: "Enter new username",
    }, ...__VLS_functionalComponentArgsRest(__VLS_7));
    // @ts-ignore
    [newUsername, updateLoading,];
    /** @type {[typeof BaseInput, ]} */ ;
    // @ts-ignore
    const __VLS_11 = __VLS_asFunctionalComponent(BaseInput, new BaseInput({
        modelValue: (__VLS_ctx.newEmail),
        disabled: (__VLS_ctx.updateLoading),
        type: "email",
        label: "New Email",
        placeholder: "Enter new email",
    }));
    const __VLS_12 = __VLS_11({
        modelValue: (__VLS_ctx.newEmail),
        disabled: (__VLS_ctx.updateLoading),
        type: "email",
        label: "New Email",
        placeholder: "Enter new email",
    }, ...__VLS_functionalComponentArgsRest(__VLS_11));
    // @ts-ignore
    [updateLoading, newEmail,];
    /** @type {[typeof BaseButton, typeof BaseButton, ]} */ ;
    // @ts-ignore
    const __VLS_15 = __VLS_asFunctionalComponent(BaseButton, new BaseButton({
        loading: (__VLS_ctx.updateLoading),
        disabled: (!__VLS_ctx.newUsername && !__VLS_ctx.newEmail),
        type: "submit",
    }));
    const __VLS_16 = __VLS_15({
        loading: (__VLS_ctx.updateLoading),
        disabled: (!__VLS_ctx.newUsername && !__VLS_ctx.newEmail),
        type: "submit",
    }, ...__VLS_functionalComponentArgsRest(__VLS_15));
    const { default: __VLS_18 } = __VLS_17.slots;
    // @ts-ignore
    [newUsername, updateLoading, newEmail,];
    var __VLS_17;
    if (__VLS_ctx.updateResult) {
        // @ts-ignore
        [updateResult,];
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            ...{ class: "protected-routes__success" },
        });
    }
    if (__VLS_ctx.updateError) {
        // @ts-ignore
        [updateError,];
        __VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({
            ...{ class: "protected-routes__error" },
        });
        (__VLS_ctx.updateError);
        // @ts-ignore
        [updateError,];
    }
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "protected-routes__section" },
    });
    __VLS_asFunctionalElement(__VLS_elements.h3, __VLS_elements.h3)({});
    __VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({});
    /** @type {[typeof BaseButton, typeof BaseButton, ]} */ ;
    // @ts-ignore
    const __VLS_19 = __VLS_asFunctionalComponent(BaseButton, new BaseButton({
        ...{ 'onClick': {} },
        loading: (__VLS_ctx.deleteLoading),
        variant: "danger",
    }));
    const __VLS_20 = __VLS_19({
        ...{ 'onClick': {} },
        loading: (__VLS_ctx.deleteLoading),
        variant: "danger",
    }, ...__VLS_functionalComponentArgsRest(__VLS_19));
    let __VLS_22;
    let __VLS_23;
    const __VLS_24 = ({ click: {} },
        { onClick: (__VLS_ctx.deleteAccount) });
    const { default: __VLS_25 } = __VLS_21.slots;
    // @ts-ignore
    [deleteLoading, deleteAccount,];
    var __VLS_21;
    if (__VLS_ctx.deleteResult) {
        // @ts-ignore
        [deleteResult,];
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            ...{ class: "protected-routes__warning" },
        });
        (__VLS_ctx.deleteResult.message);
        // @ts-ignore
        [deleteResult,];
    }
    if (__VLS_ctx.deleteError) {
        // @ts-ignore
        [deleteError,];
        __VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({
            ...{ class: "protected-routes__error" },
        });
        (__VLS_ctx.deleteError);
        // @ts-ignore
        [deleteError,];
    }
}
/** @type {__VLS_StyleScopedClasses['protected-routes']} */ ;
/** @type {__VLS_StyleScopedClasses['protected-routes__warning']} */ ;
/** @type {__VLS_StyleScopedClasses['protected-routes__content']} */ ;
/** @type {__VLS_StyleScopedClasses['protected-routes__section']} */ ;
/** @type {__VLS_StyleScopedClasses['protected-routes__profile']} */ ;
/** @type {__VLS_StyleScopedClasses['protected-routes__error']} */ ;
/** @type {__VLS_StyleScopedClasses['protected-routes__section']} */ ;
/** @type {__VLS_StyleScopedClasses['protected-routes__form']} */ ;
/** @type {__VLS_StyleScopedClasses['protected-routes__success']} */ ;
/** @type {__VLS_StyleScopedClasses['protected-routes__error']} */ ;
/** @type {__VLS_StyleScopedClasses['protected-routes__section']} */ ;
/** @type {__VLS_StyleScopedClasses['protected-routes__warning']} */ ;
/** @type {__VLS_StyleScopedClasses['protected-routes__error']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            BaseButton: BaseButton,
            BaseInput: BaseInput,
            authStore: authStore,
            profile: profile,
            profileLoading: profileLoading,
            profileError: profileError,
            newUsername: newUsername,
            newEmail: newEmail,
            updateResult: updateResult,
            updateLoading: updateLoading,
            updateError: updateError,
            deleteResult: deleteResult,
            deleteLoading: deleteLoading,
            deleteError: deleteError,
            getProfile: getProfile,
            updateProfile: updateProfile,
            deleteAccount: deleteAccount,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
    },
});
; /* PartiallyEnd: #4569/main.vue */
