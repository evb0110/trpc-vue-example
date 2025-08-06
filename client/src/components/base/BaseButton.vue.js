/// <reference types="../../../../node_modules/.vue-global-types/vue_3.5_0.d.ts" />
const __VLS_props = withDefaults(defineProps(), {
    type: 'button',
    variant: 'primary',
    size: 'medium',
    disabled: false,
    loading: false,
    fullWidth: false,
});
const __VLS_emit = defineEmits();
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_withDefaultsArg = (function (t) { return t; })({
    type: 'button',
    variant: 'primary',
    size: 'medium',
    disabled: false,
    loading: false,
    fullWidth: false,
});
const __VLS_ctx = {};
let __VLS_elements;
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['base-button']} */ ;
/** @type {__VLS_StyleScopedClasses['base-button--primary']} */ ;
/** @type {__VLS_StyleScopedClasses['base-button--secondary']} */ ;
/** @type {__VLS_StyleScopedClasses['base-button--danger']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_elements.button, __VLS_elements.button)({
    ...{ onClick: (...[$event]) => {
            __VLS_ctx.$emit('click', $event);
            // @ts-ignore
            [$emit,];
        } },
    type: (__VLS_ctx.type),
    disabled: (__VLS_ctx.disabled || __VLS_ctx.loading),
    ...{ class: ([
            'base-button',
            `base-button--${__VLS_ctx.variant}`,
            `base-button--${__VLS_ctx.size}`,
            {
                'base-button--loading': __VLS_ctx.loading,
                'base-button--full-width': __VLS_ctx.fullWidth,
            },
        ]) },
});
// @ts-ignore
[type, disabled, loading, loading, variant, size, fullWidth,];
if (__VLS_ctx.loading) {
    // @ts-ignore
    [loading,];
    __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
        ...{ class: "base-button__loader" },
    });
}
else {
    __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
        ...{ class: "base-button__content" },
    });
    var __VLS_0 = {};
}
/** @type {__VLS_StyleScopedClasses['base-button__loader']} */ ;
/** @type {__VLS_StyleScopedClasses['base-button__content']} */ ;
// @ts-ignore
var __VLS_1 = __VLS_0;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {};
    },
    __typeEmits: {},
    __typeProps: {},
    props: {},
});
const __VLS_component = (await import('vue')).defineComponent({
    setup() {
    },
    __typeEmits: {},
    __typeProps: {},
    props: {},
});
export default {};
; /* PartiallyEnd: #4569/main.vue */
