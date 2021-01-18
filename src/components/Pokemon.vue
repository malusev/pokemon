<template>
  <div class="b-pokemon">
    <PokemonList 
      :imageUrl="imageUrl" 
      :apiUrl="apiUrl" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import PokemonList from './PokemonList.vue';

export default Vue.extend({
  name: 'Pokemon',
  components: {
    PokemonList,
  },
  data: () => {
    return {
      imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/',
      apiUrl: 'https://pokeapi.co/api/v2/pokemon/'
    }
  }
});
</script>

<style scoped lang="scss">
.b-pokemon {
  background-image: url('../assets/images/body_bg.png');
}
</style>
