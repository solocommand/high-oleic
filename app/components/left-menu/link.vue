<template>
  <nuxt-link
    :to="to"
    :exact="exact"
    :class="classes"
    :active-class="activeClasses"
    @click.native="$emit('click', $event)"
  >
    <slot />
  </nuxt-link>
</template>

<script>

export default {
  props: {
    to: {
      type: [String, Object],
      required: true,
    },
    exact: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
      default: 'desktop',
      validator: (v) => ['desktop', 'mobile'].includes(v),
    },
  },

  data: () => ({
    activeClassDefs: {
      common: ['bg-logo-yellow'],
      desktop: [],
      mobile: [],
    },
    classDefs: {
      common: [
        'group',
        'flex',
        'flex-col',
        'p-2',
        'font-medium',
        'text-logo-blue',
        'hover:bg-logo-yellow',
        'focus:outline-none',
        'transition',
        'ease-in-out',
        'duration-150',
        'menu-item-link',
      ],
      desktop: ['text-base', 'leading-6'],
      mobile: ['text-base', 'leading-6'],
    },
  }),

  computed: {
    activeClasses() {
      return [...this.activeClassDefs.common, ...this.activeClassDefs[this.size]].join(' ');
    },
    classes() {
      return [...this.classDefs.common, ...this.classDefs[this.size]];
    },
  },
};
</script>
