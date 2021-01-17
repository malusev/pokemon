<template>
  <div class="b-pokemon-list container">
    <div class="b-pokemon-list__wrapper row">
      <div
        class="b-pokemon-list__block text-center col-12 col-md-4 mb-4 pt-3"
        v-for="(pokemon, index) in pokemons"
        :key="'poke' + index"
        @click="setPokemonUrl(pokemon.id)"
      >
        <div class="b-pokemon-list__block-image mb-2 d-flex justify-content-center align-items-center">
          <img
            :src="imageUrl + pokemon.id + '.png'"
            alt="Pokemon image"
          />
        </div>
        
        <h3 class="b-pokemon-list__block-name m-0 font-weight-bold">{{ pokemon.name }}</h3>
      </div>
    </div>

    <div id="scroll-trigger" ref="infinitescrolltrigger">
    </div>
  </div>
</template>

<script>
export default {
  props: ["imageUrl", "apiUrl"],
  data: () => {
    return {
      pokemons: [],
      nextUrl: "",
      currentUrl: "",
    };
  },
  methods: {
    fetchData() {
      const req = new Request(this.currentUrl);
      fetch(req)
        .then((resp) => {
          if (resp.status === 200) return resp.json();
        })
        .then((data) => {
          this.nextUrl = data.next;
          data.results.forEach((pokemon) => {
            pokemon.id = pokemon.url
              .split("/")
              .filter(function (part) {
                return !!part;
              })
              .pop();
            this.pokemons.push(pokemon);
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    scrollTrigger() {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.intersectionRatio > 0 && this.nextUrl) {
            this.next();
          }
        });
      });

      observer.observe(this.$refs.infinitescrolltrigger);
    },
    next() {
      this.currentUrl = this.nextUrl;
      this.fetchData();
    },
    setPokemonUrl(id) {
      this.$router.push({ name: 'PokemonDetail', query: { id } });
    },
  },
  created() {
    this.currentUrl = this.apiUrl;
    this.fetchData();
  },
  mounted() {
    this.scrollTrigger();
  },
};
</script>

<style lang="scss" scoped>
.b-pokemon-list {
  padding-top: 100px;
  background-color: white;

  &__wrapper {
    max-width: 800px;
    margin: 0 auto;
  }

  &__block {
    height: 200px;
    text-transform: capitalize;
    cursor: pointer;
    transition: all .2s linear;

    &:hover {
      box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2), 0 10px 15px rgba(0, 0, 0, 0.2);

      .b-pokemon-list__block-image,
      .b-pokemon-list__block-name {
        transform: scale(1.1);
      }
    }

    &-image {
      width: 120px;
      height: 120px;
      background-color: #f5f5f5;
      border-radius: 10px;
      transition: all .2s linear;
      margin: 0 auto;
    }

    &-name {
      font-size: 1.2em;
      transition: all .2s linear;
    }
  }
}
</style>
