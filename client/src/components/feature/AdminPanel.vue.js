/// <reference types="../../../../node_modules/.vue-global-types/vue_3.5_0.d.ts" />
import { ref } from 'vue';
import { trpc } from '../../api/trpc';
import { useAuthStore } from '../../stores/useAuthStore';
import BaseButton from '../base/BaseButton.vue';
const authStore = useAuthStore();
// State
const users = ref(null);
const systemStats = ref(null);
const analytics = ref(null);
const selectedUser = ref(null);
const error = ref('');
// Loading states
const usersLoading = ref(false);
const statsLoading = ref(false);
const analyticsLoading = ref(false);
const deleteLoading = ref(null);
async function getAllUsers() {
    usersLoading.value = true;
    error.value = '';
    users.value = null;
    try {
        users.value = await trpc.admin.users.query();
    }
    catch (err) {
        error.value = err.message || 'Failed to load users';
    }
    finally {
        usersLoading.value = false;
    }
}
async function getSystemStats() {
    statsLoading.value = true;
    error.value = '';
    systemStats.value = null;
    try {
        systemStats.value = await trpc.admin.systemStats.query();
    }
    catch (err) {
        error.value = err.message || 'Failed to load system stats';
    }
    finally {
        statsLoading.value = false;
    }
}
async function getAnalytics() {
    analyticsLoading.value = true;
    error.value = '';
    analytics.value = null;
    try {
        analytics.value = await trpc.admin.analytics.query();
    }
    catch (err) {
        error.value = err.message || 'Failed to load analytics';
    }
    finally {
        analyticsLoading.value = false;
    }
}
async function deleteUser(userId) {
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
    }
    catch (err) {
        error.value = err.message || 'Failed to delete user';
    }
    finally {
        deleteLoading.value = null;
    }
}
function formatUptime(seconds) {
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    if (days > 0) {
        return `${days}d ${hours}h ${minutes}m`;
    }
    else if (hours > 0) {
        return `${hours}h ${minutes}m`;
    }
    else {
        return `${minutes}m`;
    }
}
function formatMemory(bytes) {
    return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_elements;
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['admin-panel']} */ ;
/** @type {__VLS_StyleScopedClasses['admin-panel__section']} */ ;
/** @type {__VLS_StyleScopedClasses['admin-panel__user-card']} */ ;
/** @type {__VLS_StyleScopedClasses['admin-panel__user-info']} */ ;
/** @type {__VLS_StyleScopedClasses['admin-panel__metric']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_elements.section, __VLS_elements.section)({
    ...{ class: "admin-panel" },
});
__VLS_asFunctionalElement(__VLS_elements.h2, __VLS_elements.h2)({});
if (!__VLS_ctx.authStore.isAdmin) {
    // @ts-ignore
    [authStore,];
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "admin-panel__warning" },
    });
    __VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({});
}
else {
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "admin-panel__content" },
    });
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "admin-panel__actions" },
    });
    /** @type {[typeof BaseButton, typeof BaseButton, ]} */ ;
    // @ts-ignore
    const __VLS_0 = __VLS_asFunctionalComponent(BaseButton, new BaseButton({
        ...{ 'onClick': {} },
        loading: (__VLS_ctx.usersLoading),
    }));
    const __VLS_1 = __VLS_0({
        ...{ 'onClick': {} },
        loading: (__VLS_ctx.usersLoading),
    }, ...__VLS_functionalComponentArgsRest(__VLS_0));
    let __VLS_3;
    let __VLS_4;
    const __VLS_5 = ({ click: {} },
        { onClick: (__VLS_ctx.getAllUsers) });
    const { default: __VLS_6 } = __VLS_2.slots;
    // @ts-ignore
    [usersLoading, getAllUsers,];
    var __VLS_2;
    /** @type {[typeof BaseButton, typeof BaseButton, ]} */ ;
    // @ts-ignore
    const __VLS_7 = __VLS_asFunctionalComponent(BaseButton, new BaseButton({
        ...{ 'onClick': {} },
        loading: (__VLS_ctx.statsLoading),
        variant: "secondary",
    }));
    const __VLS_8 = __VLS_7({
        ...{ 'onClick': {} },
        loading: (__VLS_ctx.statsLoading),
        variant: "secondary",
    }, ...__VLS_functionalComponentArgsRest(__VLS_7));
    let __VLS_10;
    let __VLS_11;
    const __VLS_12 = ({ click: {} },
        { onClick: (__VLS_ctx.getSystemStats) });
    const { default: __VLS_13 } = __VLS_9.slots;
    // @ts-ignore
    [statsLoading, getSystemStats,];
    var __VLS_9;
    /** @type {[typeof BaseButton, typeof BaseButton, ]} */ ;
    // @ts-ignore
    const __VLS_14 = __VLS_asFunctionalComponent(BaseButton, new BaseButton({
        ...{ 'onClick': {} },
        loading: (__VLS_ctx.analyticsLoading),
        variant: "secondary",
    }));
    const __VLS_15 = __VLS_14({
        ...{ 'onClick': {} },
        loading: (__VLS_ctx.analyticsLoading),
        variant: "secondary",
    }, ...__VLS_functionalComponentArgsRest(__VLS_14));
    let __VLS_17;
    let __VLS_18;
    const __VLS_19 = ({ click: {} },
        { onClick: (__VLS_ctx.getAnalytics) });
    const { default: __VLS_20 } = __VLS_16.slots;
    // @ts-ignore
    [analyticsLoading, getAnalytics,];
    var __VLS_16;
    if (__VLS_ctx.users) {
        // @ts-ignore
        [users,];
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            ...{ class: "admin-panel__section" },
        });
        __VLS_asFunctionalElement(__VLS_elements.h3, __VLS_elements.h3)({});
        (__VLS_ctx.users.total);
        // @ts-ignore
        [users,];
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            ...{ class: "admin-panel__users" },
        });
        for (const [user] of __VLS_getVForSourceType((__VLS_ctx.users.users))) {
            // @ts-ignore
            [users,];
            __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
                ...{ onClick: (...[$event]) => {
                        if (!!(!__VLS_ctx.authStore.isAdmin))
                            return;
                        if (!(__VLS_ctx.users))
                            return;
                        __VLS_ctx.selectedUser = user;
                        // @ts-ignore
                        [selectedUser,];
                    } },
                key: (user.id),
                ...{ class: ({ 'admin-panel__user-card--selected': __VLS_ctx.selectedUser?.id === user.id }) },
                ...{ class: "admin-panel__user-card" },
            });
            // @ts-ignore
            [selectedUser,];
            __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
                ...{ class: "admin-panel__user-info" },
            });
            __VLS_asFunctionalElement(__VLS_elements.h4, __VLS_elements.h4)({});
            (user.username);
            __VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({});
            (user.email);
            __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
                ...{ class: (`admin-panel__badge--${user.role}`) },
                ...{ class: "admin-panel__badge" },
            });
            (user.role);
            if (user.role !== 'admin') {
                /** @type {[typeof BaseButton, typeof BaseButton, ]} */ ;
                // @ts-ignore
                const __VLS_21 = __VLS_asFunctionalComponent(BaseButton, new BaseButton({
                    ...{ 'onClick': {} },
                    loading: (__VLS_ctx.deleteLoading === user.id),
                    variant: "danger",
                    size: "small",
                }));
                const __VLS_22 = __VLS_21({
                    ...{ 'onClick': {} },
                    loading: (__VLS_ctx.deleteLoading === user.id),
                    variant: "danger",
                    size: "small",
                }, ...__VLS_functionalComponentArgsRest(__VLS_21));
                let __VLS_24;
                let __VLS_25;
                const __VLS_26 = ({ click: {} },
                    { onClick: (...[$event]) => {
                            if (!!(!__VLS_ctx.authStore.isAdmin))
                                return;
                            if (!(__VLS_ctx.users))
                                return;
                            if (!(user.role !== 'admin'))
                                return;
                            __VLS_ctx.deleteUser(user.id);
                            // @ts-ignore
                            [deleteLoading, deleteUser,];
                        } });
                const { default: __VLS_27 } = __VLS_23.slots;
                var __VLS_23;
            }
        }
    }
    if (__VLS_ctx.systemStats) {
        // @ts-ignore
        [systemStats,];
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            ...{ class: "admin-panel__section" },
        });
        __VLS_asFunctionalElement(__VLS_elements.h3, __VLS_elements.h3)({});
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            ...{ class: "admin-panel__stats" },
        });
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            ...{ class: "admin-panel__stat" },
        });
        __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
            ...{ class: "admin-panel__stat-label" },
        });
        __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
            ...{ class: "admin-panel__stat-value" },
        });
        (__VLS_ctx.systemStats.stats.totalUsers);
        // @ts-ignore
        [systemStats,];
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            ...{ class: "admin-panel__stat" },
        });
        __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
            ...{ class: "admin-panel__stat-label" },
        });
        __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
            ...{ class: "admin-panel__stat-value" },
        });
        (__VLS_ctx.systemStats.stats.activeConnections);
        // @ts-ignore
        [systemStats,];
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            ...{ class: "admin-panel__stat" },
        });
        __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
            ...{ class: "admin-panel__stat-label" },
        });
        __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
            ...{ class: "admin-panel__stat-value" },
        });
        (__VLS_ctx.formatUptime(__VLS_ctx.systemStats.stats.serverUptime));
        // @ts-ignore
        [systemStats, formatUptime,];
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            ...{ class: "admin-panel__stat" },
        });
        __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
            ...{ class: "admin-panel__stat-label" },
        });
        __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
            ...{ class: "admin-panel__stat-value" },
        });
        (__VLS_ctx.formatMemory(__VLS_ctx.systemStats.stats.memoryUsage.heapUsed));
        // @ts-ignore
        [systemStats, formatMemory,];
    }
    if (__VLS_ctx.analytics) {
        // @ts-ignore
        [analytics,];
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            ...{ class: "admin-panel__section" },
        });
        __VLS_asFunctionalElement(__VLS_elements.h3, __VLS_elements.h3)({});
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            ...{ class: "admin-panel__analytics" },
        });
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            ...{ class: "admin-panel__metric" },
        });
        __VLS_asFunctionalElement(__VLS_elements.h4, __VLS_elements.h4)({});
        __VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({
            ...{ class: "admin-panel__metric-value" },
        });
        (__VLS_ctx.analytics.metrics.dailyActiveUsers);
        // @ts-ignore
        [analytics,];
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            ...{ class: "admin-panel__metric" },
        });
        __VLS_asFunctionalElement(__VLS_elements.h4, __VLS_elements.h4)({});
        __VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({
            ...{ class: "admin-panel__metric-value" },
        });
        (__VLS_ctx.analytics.metrics.totalRevenue.toFixed(2));
        // @ts-ignore
        [analytics,];
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            ...{ class: "admin-panel__metric" },
        });
        __VLS_asFunctionalElement(__VLS_elements.h4, __VLS_elements.h4)({});
        __VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({
            ...{ class: "admin-panel__metric-value" },
        });
        (__VLS_ctx.analytics.metrics.newSignups);
        // @ts-ignore
        [analytics,];
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            ...{ class: "admin-panel__metric" },
        });
        __VLS_asFunctionalElement(__VLS_elements.h4, __VLS_elements.h4)({});
        __VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({
            ...{ class: "admin-panel__metric-value" },
        });
        ((__VLS_ctx.analytics.metrics.churnRate * 100).toFixed(1));
        // @ts-ignore
        [analytics,];
    }
    if (__VLS_ctx.error) {
        // @ts-ignore
        [error,];
        __VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({
            ...{ class: "admin-panel__error" },
        });
        (__VLS_ctx.error);
        // @ts-ignore
        [error,];
    }
}
/** @type {__VLS_StyleScopedClasses['admin-panel']} */ ;
/** @type {__VLS_StyleScopedClasses['admin-panel__warning']} */ ;
/** @type {__VLS_StyleScopedClasses['admin-panel__content']} */ ;
/** @type {__VLS_StyleScopedClasses['admin-panel__actions']} */ ;
/** @type {__VLS_StyleScopedClasses['admin-panel__section']} */ ;
/** @type {__VLS_StyleScopedClasses['admin-panel__users']} */ ;
/** @type {__VLS_StyleScopedClasses['admin-panel__user-card']} */ ;
/** @type {__VLS_StyleScopedClasses['admin-panel__user-info']} */ ;
/** @type {__VLS_StyleScopedClasses['admin-panel__badge']} */ ;
/** @type {__VLS_StyleScopedClasses['admin-panel__section']} */ ;
/** @type {__VLS_StyleScopedClasses['admin-panel__stats']} */ ;
/** @type {__VLS_StyleScopedClasses['admin-panel__stat']} */ ;
/** @type {__VLS_StyleScopedClasses['admin-panel__stat-label']} */ ;
/** @type {__VLS_StyleScopedClasses['admin-panel__stat-value']} */ ;
/** @type {__VLS_StyleScopedClasses['admin-panel__stat']} */ ;
/** @type {__VLS_StyleScopedClasses['admin-panel__stat-label']} */ ;
/** @type {__VLS_StyleScopedClasses['admin-panel__stat-value']} */ ;
/** @type {__VLS_StyleScopedClasses['admin-panel__stat']} */ ;
/** @type {__VLS_StyleScopedClasses['admin-panel__stat-label']} */ ;
/** @type {__VLS_StyleScopedClasses['admin-panel__stat-value']} */ ;
/** @type {__VLS_StyleScopedClasses['admin-panel__stat']} */ ;
/** @type {__VLS_StyleScopedClasses['admin-panel__stat-label']} */ ;
/** @type {__VLS_StyleScopedClasses['admin-panel__stat-value']} */ ;
/** @type {__VLS_StyleScopedClasses['admin-panel__section']} */ ;
/** @type {__VLS_StyleScopedClasses['admin-panel__analytics']} */ ;
/** @type {__VLS_StyleScopedClasses['admin-panel__metric']} */ ;
/** @type {__VLS_StyleScopedClasses['admin-panel__metric-value']} */ ;
/** @type {__VLS_StyleScopedClasses['admin-panel__metric']} */ ;
/** @type {__VLS_StyleScopedClasses['admin-panel__metric-value']} */ ;
/** @type {__VLS_StyleScopedClasses['admin-panel__metric']} */ ;
/** @type {__VLS_StyleScopedClasses['admin-panel__metric-value']} */ ;
/** @type {__VLS_StyleScopedClasses['admin-panel__metric']} */ ;
/** @type {__VLS_StyleScopedClasses['admin-panel__metric-value']} */ ;
/** @type {__VLS_StyleScopedClasses['admin-panel__error']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            BaseButton: BaseButton,
            authStore: authStore,
            users: users,
            systemStats: systemStats,
            analytics: analytics,
            selectedUser: selectedUser,
            error: error,
            usersLoading: usersLoading,
            statsLoading: statsLoading,
            analyticsLoading: analyticsLoading,
            deleteLoading: deleteLoading,
            getAllUsers: getAllUsers,
            getSystemStats: getSystemStats,
            getAnalytics: getAnalytics,
            deleteUser: deleteUser,
            formatUptime: formatUptime,
            formatMemory: formatMemory,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
    },
});
; /* PartiallyEnd: #4569/main.vue */
