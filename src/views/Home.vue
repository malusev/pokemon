<template>
  <div class="main">
    <Pokemon/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Pokemon from '@/components/Pokemon.vue';

export default Vue.extend({
  name: 'Home',
  components: {
    Pokemon,
  }
});
</script>
