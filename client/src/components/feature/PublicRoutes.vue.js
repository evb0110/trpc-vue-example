/// <reference types="../../../../node_modules/.vue-global-types/vue_3.5_0.d.ts" />
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
const createdUser = ref(null);
const createLoading = ref(false);
const createError = ref('');
// Request info
const requestInfo = ref(null);
const infoLoading = ref(false);
// Rate limited report
const reportType = ref('summary');
const reportResult = ref(null);
const reportLoading = ref(false);
const reportError = ref('');
async function sayHello() {
    helloLoading.value = true;
    helloError.value = '';
    greeting.value = '';
    try {
        const result = await trpc.public.hello.query({ name: name.value });
        greeting.value = result.greeting;
    }
    catch (error) {
        helloError.value = error.message || 'Failed to get greeting';
    }
    finally {
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
    }
    catch (error) {
        createError.value = error.message || 'Failed to create user';
    }
    finally {
        createLoading.value = false;
    }
}
async function getRequestInfo() {
    infoLoading.value = true;
    try {
        requestInfo.value = await trpc.public.requestInfo.query();
    }
    catch (error) {
        console.error('Error getting request info:', error);
    }
    finally {
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
    }
    catch (error) {
        reportError.value = error.message || 'Failed to generate report';
    }
    finally {
        reportLoading.value = false;
    }
}
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_elements;
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['public-routes__section']} */ ;
/** @type {__VLS_StyleScopedClasses['public-routes__section']} */ ;
/** @type {__VLS_StyleScopedClasses['public-routes__success']} */ ;
/** @type {__VLS_StyleScopedClasses['public-routes__info']} */ ;
/** @type {__VLS_StyleScopedClasses['public-routes__info']} */ ;
/** @type {__VLS_StyleScopedClasses['public-routes__select']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "public-routes" },
});
__VLS_asFunctionalElement(__VLS_elements.section, __VLS_elements.section)({
    ...{ class: "public-routes__section" },
});
__VLS_asFunctionalElement(__VLS_elements.h2, __VLS_elements.h2)({});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "public-routes__form" },
});
/** @type {[typeof BaseInput, ]} */ ;
// @ts-ignore
const __VLS_0 = __VLS_asFunctionalComponent(BaseInput, new BaseInput({
    modelValue: (__VLS_ctx.name),
    disabled: (__VLS_ctx.helloLoading),
    placeholder: "Enter your name",
}));
const __VLS_1 = __VLS_0({
    modelValue: (__VLS_ctx.name),
    disabled: (__VLS_ctx.helloLoading),
    placeholder: "Enter your name",
}, ...__VLS_functionalComponentArgsRest(__VLS_0));
// @ts-ignore
[name, helloLoading,];
/** @type {[typeof BaseButton, typeof BaseButton, ]} */ ;
// @ts-ignore
const __VLS_4 = __VLS_asFunctionalComponent(BaseButton, new BaseButton({
    ...{ 'onClick': {} },
    loading: (__VLS_ctx.helloLoading),
    disabled: (!__VLS_ctx.name),
}));
const __VLS_5 = __VLS_4({
    ...{ 'onClick': {} },
    loading: (__VLS_ctx.helloLoading),
    disabled: (!__VLS_ctx.name),
}, ...__VLS_functionalComponentArgsRest(__VLS_4));
let __VLS_7;
let __VLS_8;
const __VLS_9 = ({ click: {} },
    { onClick: (__VLS_ctx.sayHello) });
const { default: __VLS_10 } = __VLS_6.slots;
// @ts-ignore
[name, helloLoading, sayHello,];
var __VLS_6;
if (__VLS_ctx.greeting) {
    // @ts-ignore
    [greeting,];
    __VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({
        ...{ class: "public-routes__result" },
    });
    (__VLS_ctx.greeting);
    // @ts-ignore
    [greeting,];
}
if (__VLS_ctx.helloError) {
    // @ts-ignore
    [helloError,];
    __VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({
        ...{ class: "public-routes__error" },
    });
    (__VLS_ctx.helloError);
    // @ts-ignore
    [helloError,];
}
__VLS_asFunctionalElement(__VLS_elements.section, __VLS_elements.section)({
    ...{ class: "public-routes__section" },
});
__VLS_asFunctionalElement(__VLS_elements.h2, __VLS_elements.h2)({});
__VLS_asFunctionalElement(__VLS_elements.form, __VLS_elements.form)({
    ...{ onSubmit: (__VLS_ctx.handleCreateUser) },
    ...{ class: "public-routes__form" },
});
// @ts-ignore
[handleCreateUser,];
/** @type {[typeof BaseInput, ]} */ ;
// @ts-ignore
const __VLS_11 = __VLS_asFunctionalComponent(BaseInput, new BaseInput({
    modelValue: (__VLS_ctx.userName),
    disabled: (__VLS_ctx.createLoading),
    error: (__VLS_ctx.createError),
    label: "Username",
    placeholder: "Enter username",
    required: true,
}));
const __VLS_12 = __VLS_11({
    modelValue: (__VLS_ctx.userName),
    disabled: (__VLS_ctx.createLoading),
    error: (__VLS_ctx.createError),
    label: "Username",
    placeholder: "Enter username",
    required: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_11));
// @ts-ignore
[userName, createLoading, createError,];
/** @type {[typeof BaseInput, ]} */ ;
// @ts-ignore
const __VLS_15 = __VLS_asFunctionalComponent(BaseInput, new BaseInput({
    modelValue: (__VLS_ctx.userEmail),
    disabled: (__VLS_ctx.createLoading),
    type: "email",
    label: "Email",
    placeholder: "Enter email",
    required: true,
}));
const __VLS_16 = __VLS_15({
    modelValue: (__VLS_ctx.userEmail),
    disabled: (__VLS_ctx.createLoading),
    type: "email",
    label: "Email",
    placeholder: "Enter email",
    required: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_15));
// @ts-ignore
[createLoading, userEmail,];
/** @type {[typeof BaseButton, typeof BaseButton, ]} */ ;
// @ts-ignore
const __VLS_19 = __VLS_asFunctionalComponent(BaseButton, new BaseButton({
    loading: (__VLS_ctx.createLoading),
    disabled: (!__VLS_ctx.userName || !__VLS_ctx.userEmail),
    type: "submit",
}));
const __VLS_20 = __VLS_19({
    loading: (__VLS_ctx.createLoading),
    disabled: (!__VLS_ctx.userName || !__VLS_ctx.userEmail),
    type: "submit",
}, ...__VLS_functionalComponentArgsRest(__VLS_19));
const { default: __VLS_22 } = __VLS_21.slots;
// @ts-ignore
[userName, createLoading, userEmail,];
var __VLS_21;
if (__VLS_ctx.createdUser) {
    // @ts-ignore
    [createdUser,];
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "public-routes__success" },
    });
    __VLS_asFunctionalElement(__VLS_elements.ul, __VLS_elements.ul)({});
    __VLS_asFunctionalElement(__VLS_elements.li, __VLS_elements.li)({});
    (__VLS_ctx.createdUser.id);
    // @ts-ignore
    [createdUser,];
    __VLS_asFunctionalElement(__VLS_elements.li, __VLS_elements.li)({});
    (__VLS_ctx.createdUser.username);
    // @ts-ignore
    [createdUser,];
    __VLS_asFunctionalElement(__VLS_elements.li, __VLS_elements.li)({});
    (__VLS_ctx.createdUser.email);
    // @ts-ignore
    [createdUser,];
}
__VLS_asFunctionalElement(__VLS_elements.section, __VLS_elements.section)({
    ...{ class: "public-routes__section" },
});
__VLS_asFunctionalElement(__VLS_elements.h2, __VLS_elements.h2)({});
/** @type {[typeof BaseButton, typeof BaseButton, ]} */ ;
// @ts-ignore
const __VLS_23 = __VLS_asFunctionalComponent(BaseButton, new BaseButton({
    ...{ 'onClick': {} },
    loading: (__VLS_ctx.infoLoading),
}));
const __VLS_24 = __VLS_23({
    ...{ 'onClick': {} },
    loading: (__VLS_ctx.infoLoading),
}, ...__VLS_functionalComponentArgsRest(__VLS_23));
let __VLS_26;
let __VLS_27;
const __VLS_28 = ({ click: {} },
    { onClick: (__VLS_ctx.getRequestInfo) });
const { default: __VLS_29 } = __VLS_25.slots;
// @ts-ignore
[infoLoading, getRequestInfo,];
var __VLS_25;
if (__VLS_ctx.requestInfo) {
    // @ts-ignore
    [requestInfo,];
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "public-routes__info" },
    });
    __VLS_asFunctionalElement(__VLS_elements.h3, __VLS_elements.h3)({});
    __VLS_asFunctionalElement(__VLS_elements.ul, __VLS_elements.ul)({});
    __VLS_asFunctionalElement(__VLS_elements.li, __VLS_elements.li)({});
    __VLS_asFunctionalElement(__VLS_elements.strong, __VLS_elements.strong)({});
    (__VLS_ctx.requestInfo.ip);
    // @ts-ignore
    [requestInfo,];
    __VLS_asFunctionalElement(__VLS_elements.li, __VLS_elements.li)({});
    __VLS_asFunctionalElement(__VLS_elements.strong, __VLS_elements.strong)({});
    (__VLS_ctx.requestInfo.userAgent);
    // @ts-ignore
    [requestInfo,];
    __VLS_asFunctionalElement(__VLS_elements.li, __VLS_elements.li)({});
    __VLS_asFunctionalElement(__VLS_elements.strong, __VLS_elements.strong)({});
    (__VLS_ctx.requestInfo.requestCount);
    // @ts-ignore
    [requestInfo,];
    __VLS_asFunctionalElement(__VLS_elements.li, __VLS_elements.li)({});
    __VLS_asFunctionalElement(__VLS_elements.strong, __VLS_elements.strong)({});
    (new Date(__VLS_ctx.requestInfo.timestamp).toLocaleString());
    // @ts-ignore
    [requestInfo,];
}
__VLS_asFunctionalElement(__VLS_elements.section, __VLS_elements.section)({
    ...{ class: "public-routes__section" },
});
__VLS_asFunctionalElement(__VLS_elements.h2, __VLS_elements.h2)({});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "public-routes__form" },
});
__VLS_asFunctionalElement(__VLS_elements.label, __VLS_elements.label)({});
__VLS_asFunctionalElement(__VLS_elements.select, __VLS_elements.select)({
    value: (__VLS_ctx.reportType),
    ...{ class: "public-routes__select" },
});
// @ts-ignore
[reportType,];
__VLS_asFunctionalElement(__VLS_elements.option, __VLS_elements.option)({
    value: "summary",
});
__VLS_asFunctionalElement(__VLS_elements.option, __VLS_elements.option)({
    value: "detailed",
});
/** @type {[typeof BaseButton, typeof BaseButton, ]} */ ;
// @ts-ignore
const __VLS_30 = __VLS_asFunctionalComponent(BaseButton, new BaseButton({
    ...{ 'onClick': {} },
    loading: (__VLS_ctx.reportLoading),
    variant: "secondary",
}));
const __VLS_31 = __VLS_30({
    ...{ 'onClick': {} },
    loading: (__VLS_ctx.reportLoading),
    variant: "secondary",
}, ...__VLS_functionalComponentArgsRest(__VLS_30));
let __VLS_33;
let __VLS_34;
const __VLS_35 = ({ click: {} },
    { onClick: (__VLS_ctx.generateReport) });
const { default: __VLS_36 } = __VLS_32.slots;
// @ts-ignore
[reportLoading, generateReport,];
var __VLS_32;
if (__VLS_ctx.reportResult) {
    // @ts-ignore
    [reportResult,];
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "public-routes__success" },
    });
    __VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({});
    (__VLS_ctx.reportResult.report);
    // @ts-ignore
    [reportResult,];
    __VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({});
    (__VLS_ctx.reportResult.requestsRemaining);
    // @ts-ignore
    [reportResult,];
}
if (__VLS_ctx.reportError) {
    // @ts-ignore
    [reportError,];
    __VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({
        ...{ class: "public-routes__error" },
    });
    (__VLS_ctx.reportError);
    // @ts-ignore
    [reportError,];
}
/** @type {__VLS_StyleScopedClasses['public-routes']} */ ;
/** @type {__VLS_StyleScopedClasses['public-routes__section']} */ ;
/** @type {__VLS_StyleScopedClasses['public-routes__form']} */ ;
/** @type {__VLS_StyleScopedClasses['public-routes__result']} */ ;
/** @type {__VLS_StyleScopedClasses['public-routes__error']} */ ;
/** @type {__VLS_StyleScopedClasses['public-routes__section']} */ ;
/** @type {__VLS_StyleScopedClasses['public-routes__form']} */ ;
/** @type {__VLS_StyleScopedClasses['public-routes__success']} */ ;
/** @type {__VLS_StyleScopedClasses['public-routes__section']} */ ;
/** @type {__VLS_StyleScopedClasses['public-routes__info']} */ ;
/** @type {__VLS_StyleScopedClasses['public-routes__section']} */ ;
/** @type {__VLS_StyleScopedClasses['public-routes__form']} */ ;
/** @type {__VLS_StyleScopedClasses['public-routes__select']} */ ;
/** @type {__VLS_StyleScopedClasses['public-routes__success']} */ ;
/** @type {__VLS_StyleScopedClasses['public-routes__error']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            BaseButton: BaseButton,
            BaseInput: BaseInput,
            name: name,
            greeting: greeting,
            helloLoading: helloLoading,
            helloError: helloError,
            userName: userName,
            userEmail: userEmail,
            createdUser: createdUser,
            createLoading: createLoading,
            createError: createError,
            requestInfo: requestInfo,
            infoLoading: infoLoading,
            reportType: reportType,
            reportResult: reportResult,
            reportLoading: reportLoading,
            reportError: reportError,
            sayHello: sayHello,
            handleCreateUser: handleCreateUser,
            getRequestInfo: getRequestInfo,
            generateReport: generateReport,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
    },
});
; /* PartiallyEnd: #4569/main.vue */
