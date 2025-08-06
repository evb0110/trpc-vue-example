/// <reference types="../../../../node_modules/.vue-global-types/vue_3.5_0.d.ts" />
import { computed } from 'vue';
const __VLS_props = withDefaults(defineProps(), {
    type: 'text',
    disabled: false,
    required: false,
});
const emit = defineEmits();
const inputId = computed(() => `input-${Math.random().toString(36).substring(2, 9)}`);
function handleInput(event) {
    const target = event.target;
    emit('update:modelValue', target.value);
}
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_withDefaultsArg = (function (t) { return t; })({
    type: 'text',
    disabled: false,
    required: false,
});
const __VLS_ctx = {};
let __VLS_elements;
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['base-input__field']} */ ;
/** @type {__VLS_StyleScopedClasses['base-input__field']} */ ;
/** @type {__VLS_StyleScopedClasses['base-input__field--error']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "base-input" },
});
if (__VLS_ctx.label) {
    // @ts-ignore
    [label,];
    __VLS_asFunctionalElement(__VLS_elements.label, __VLS_elements.label)({
        for: (__VLS_ctx.inputId),
        ...{ class: "base-input__label" },
    });
    // @ts-ignore
    [inputId,];
    (__VLS_ctx.label);
    // @ts-ignore
    [label,];
    if (__VLS_ctx.required) {
        // @ts-ignore
        [required,];
        __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
            ...{ class: "base-input__required" },
        });
    }
}
__VLS_asFunctionalElement(__VLS_elements.input, __VLS_elements.input)({
    ...{ onInput: (__VLS_ctx.handleInput) },
    ...{ onBlur: (...[$event]) => {
            __VLS_ctx.$emit('blur', $event);
            // @ts-ignore
            [handleInput, $emit,];
        } },
    ...{ onFocus: (...[$event]) => {
            __VLS_ctx.$emit('focus', $event);
            // @ts-ignore
            [$emit,];
        } },
    id: (__VLS_ctx.inputId),
    type: (__VLS_ctx.type),
    value: (__VLS_ctx.modelValue),
    placeholder: (__VLS_ctx.placeholder),
    disabled: (__VLS_ctx.disabled),
    required: (__VLS_ctx.required),
    autocomplete: (__VLS_ctx.autocomplete),
    ...{ class: ({
            'base-input__field--error': !!__VLS_ctx.error,
        }) },
    ...{ class: "base-input__field" },
});
// @ts-ignore
[inputId, required, type, modelValue, placeholder, disabled, autocomplete, error,];
if (__VLS_ctx.error) {
    // @ts-ignore
    [error,];
    __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
        ...{ class: "base-input__error" },
    });
    (__VLS_ctx.error);
    // @ts-ignore
    [error,];
}
/** @type {__VLS_StyleScopedClasses['base-input']} */ ;
/** @type {__VLS_StyleScopedClasses['base-input__label']} */ ;
/** @type {__VLS_StyleScopedClasses['base-input__required']} */ ;
/** @type {__VLS_StyleScopedClasses['base-input__field']} */ ;
/** @type {__VLS_StyleScopedClasses['base-input__error']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            inputId: inputId,
            handleInput: handleInput,
        };
    },
    __typeEmits: {},
    __typeProps: {},
    props: {},
});
export default (await import('vue')).defineComponent({
    setup() {
    },
    __typeEmits: {},
    __typeProps: {},
    props: {},
});
; /* PartiallyEnd: #4569/main.vue */
