<template>
    <div class="base-input">
        <label v-if="label" :for="inputId" class="base-input__label">
            {{ label }}
            <span v-if="required" class="base-input__required">*</span>
        </label>
        <input
            :id="inputId"
            :type="type"
            :value="modelValue"
            :placeholder="placeholder"
            :disabled="disabled"
            :required="required"
            :autocomplete="autocomplete"
            :class="{
                'base-input__field--error': !!error,
            }"
            class="base-input__field"
            @input="handleInput"
            @blur="$emit('blur', $event)"
            @focus="$emit('focus', $event)"
        >
        <span v-if="error" class="base-input__error">{{ error }}</span>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  modelValue: string;
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url';
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  error?: string;
  autocomplete?: string;
}

const props = withDefaults(defineProps<Props>(), {
    type: 'text',
    disabled: false,
    required: false,
});

const emit = defineEmits<{
  'update:modelValue': [value: string];
  blur: [event: FocusEvent];
  focus: [event: FocusEvent];
}>();

const inputId = computed(() => `input-${Math.random().toString(36).substr(2, 9)}`);

function handleInput(event: Event) {
    const target = event.target as HTMLInputElement;
    emit('update:modelValue', target.value);
}
</script>

<style scoped>
.base-input {
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
}

.base-input__label {
  font-size: 14px;
  font-weight: 500;
  color: #333;
}

.base-input__required {
  color: #dc3545;
  margin-left: 2px;
}

.base-input__field {
  padding: 8px 12px;
  border: 1px solid #ced4da;
  border-radius: 4px;
  font-size: 16px;
  transition: border-color 0.2s ease;
  width: 100%;
}

.base-input__field:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.1);
}

.base-input__field:disabled {
  background-color: #e9ecef;
  cursor: not-allowed;
}

.base-input__field--error {
  border-color: #dc3545;
}

.base-input__field--error:focus {
  border-color: #dc3545;
  box-shadow: 0 0 0 2px rgba(220, 53, 69, 0.1);
}

.base-input__error {
  font-size: 12px;
  color: #dc3545;
  margin-top: 2px;
}
</style>