<template>
  <button
    :type="type"
    :disabled="disabled || loading"
    :class="classes"
    @click="$emit('click', $event)"
  >
    <loading-spinner
      :color="spinnerColor"
      :show="loading"
    />
    <slot />
  </button>
</template>

<script>
import LoadingSpinner from './loading-spinner.vue';

export default {
  components: { LoadingSpinner },

  props: {
    type: {
      type: String,
      default: 'button',
      validator: (value) => ['button', 'submit', 'reset'].includes(value),
    },
    color: {
      type: String,
      default: 'logo-blue',
      validator: (value) => [
        'logo-blue',
        'logo-green',
        'logo-yellow',
        'logo-white',
        'logo-white-rd',
        'red-600',
        'secondary-3',
      ].includes(value),
    },
    spinnerColor: {
      type: String,
      default: 'gray-700',
    },
    block: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    classes() {
      const disabled = this.loading || this.disabled;
      const core = [
        'flex',
        'justify-center',
        'py-2',
        'px-4',
        'border',
        'border-transparent',
        'text-sm',
        'font-bold',
        'focus:outline-none',
        'disabled:cursor-not-allowed',
        'disabled:bg-gray-300',
        'disabled:text-gray-700',
        'transition',
        'duration-150',
        'ease-in-out',
        'items-center',
      ];
      if (!disabled) {
        core.push('shadow');
        core.push('hover:bg-opacity-85');
      }
      if (this.block) {
        core.push('w-full');
      }
      const colors = {
        'logo-blue': [
          'bg-logo-blue',
          'focus:bg-opacity-85',
          'focus:border-logo-blue',
          'focus:shadow-outline-gray',
          'active:bg-opacity-85',
          'text-white',
        ],
        'logo-green': [
          'bg-logo-green',
          'focus:bg-opacity-85',
          'focus:border-logo-green',
          'focus:shadow-outline-gray',
          'active:bg-opacity-85',
          'text-white',
        ],
        'logo-yellow': [
          'bg-logo-yellow',
          'focus:bg-opacity-85',
          'focus:border-logo-yellow',
          'focus:shadow-outline-gray',
          'active:bg-opacity-85',
          'text-gray-600',
        ],
        'logo-white': [
          'bg-logo-white',
          'border-logo-blue',
          'border-solid',
          'color-logo-blue',
          'focus:bg-opacity-85',
          'focus:border-logo-blue',
          'focus:shadow-outline-gray',
          'active:bg-opacity-85',
          'text-gray-600',
        ],
        'logo-white-rd': [
          'bg-logo-white',
          'border-logo-blue',
          'border-solid',
          'rounded-full',
          'color-logo-blue',
          'focus:bg-opacity-85',
          'focus:border-logo-blue',
          'focus:shadow-outline-gray',
          'active:bg-opacity-85',
          'text-logo-blue',
          'disabled:bg-logo-white',
          'disabled:text-logo-blue',
        ],
        'secondary-3': [
          'bg-secondary-3',
          'focus:bg-opacity-85',
          'focus:border-secondary-3',
          'focus:shadow-outline-gray',
          'active:bg-opacity-85',
          'text-white',
        ],
        'red-600': [
          'bg-red-600',
          'focus:bg-opacity-85',
          'focus:border-red-600',
          'focus:shadow-outline-gray',
          'active:bg-opacity-85',
          'text-white',
        ],
      };
      const color = colors[this.color];
      if (!color) return core;
      return [...core, ...color];
    },
  },
};
</script>
