<template>
  <div :class="setDivClass">
    <div :class="setSectionLabelSize">
      <h1 v-if="isFirst" class="font-semibold text-white italic text-center">
        {{ sectionLabel }}
      </h1>
      <h2 v-else class="font-semibold italic text-center">
        {{ sectionLabel }}
      </h2>
      <p v-if="isFirst" class="text-center font-semibold text-white">
        {{ sectionDescription }}
      </p>
      <p v-else class="text-center font-semibold">
        {{ sectionDescription }}
      </p>
    </div>
    <div class="md:w-1/3">
      <btn
        class="text-3xl w-20"
        type="button"
        :block="isBlock"
        color="logo-blue"
        @click="sendTo(linkLocation)"
      >
        {{ buttonLabel }}
      </btn>
    </div>
  </div>
</template>

<script>
import Btn from './button.vue';

export default {
  components: {
    Btn,
  },
  props: {
    buttonLabel: {
      type: String,
      default: '',
    },
    sectionLabel: {
      type: String,
      default: '',
    },
    sectionDescription: {
      type: String,
      default: '',
    },
    isFirst: {
      type: Boolean,
      default: false,
    },
    linkLocation: {
      type: String,
      required: true,
    },
  },
  data: () => ({
    isBlock: true,
  }),
  computed: {
    setSectionLabelSize() {
      if (this.isFirst) {
        return 'h-72 mb-12 text-5xl flex justify-center flex-col bg-tilling bg-no-repeat bg-center';
      }
      return 'h-4/5 text-4xl';
    },
    setDivClass() {
      // if (this.isFirst) {
      //   return 'h-5/6';
      // }
      return 'h-96 my-12';
    },
  },
  methods: {
    sendTo(location) {
      this.$router.push(location);
    },
  },
};

</script>
