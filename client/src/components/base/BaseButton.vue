<template>
    <button
        :type="type"
        :disabled="disabled || loading"
        :class="[
            'base-button',
            `base-button--${variant}`,
            `base-button--${size}`,
            {
                'base-button--loading': loading,
                'base-button--full-width': fullWidth,
            },
        ]"
        @click="$emit('click', $event)"
    >
        <span v-if="loading" class="base-button__loader">Loading...</span>
        <span v-else class="base-button__content">
            <slot />
        </span>
    </button>
</template>

<script setup lang="ts">
interface Props {
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
}

withDefaults(defineProps<Props>(), {
    type: 'button',
    variant: 'primary',
    size: 'medium',
    disabled: false,
    loading: false,
    fullWidth: false,
});

defineEmits<{
  (e: 'click', event: MouseEvent): void;
}>();
</script>

<style scoped>
.base-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
  min-width: 80px;
}

.base-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* Sizes */
.base-button--small {
  padding: 6px 12px;
  font-size: 14px;
}

.base-button--medium {
  padding: 8px 16px;
  font-size: 16px;
}

.base-button--large {
  padding: 12px 24px;
  font-size: 18px;
}

/* Variants */
.base-button--primary {
  background-color: #007bff;
  color: white;
}

.base-button--primary:hover:not(:disabled) {
  background-color: #0056b3;
}

.base-button--secondary {
  background-color: #6c757d;
  color: white;
}

.base-button--secondary:hover:not(:disabled) {
  background-color: #545b62;
}

.base-button--danger {
  background-color: #dc3545;
  color: white;
}

.base-button--danger:hover:not(:disabled) {
  background-color: #c82333;
}

/* Full width */
.base-button--full-width {
  width: 100%;
}

/* Loading state */
.base-button--loading {
  pointer-events: none;
}

.base-button__loader {
  display: flex;
  align-items: center;
  gap: 8px;
}
</style>