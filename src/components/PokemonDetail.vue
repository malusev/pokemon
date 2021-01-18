<template>
  <div class="b-pokemon-detail">
    <div class="b-pokemon-detail__wrapper container">
      <div class="b-pokemon-detail__header">
        <div
          v-if="pokemon"
          class="b-pokemon-detail__header-image mb-4 mx-auto d-flex justify-content-center align-items-center"
        >
          <img :src="getUrlForImage" alt="Pokemon image" />
        </div>

        <h2 class="b-pokemon-detail__header-name text-capitalize">{{ pokemon.name }} <span>#{{ pokemon.order }}</span></h2>

        <div class="b-pokemon-detail__header-types d-flex justify-content-center align-items-center">
          <div
            class="b-pokemon-detail__header-type px-4 py-1"
            v-for="(value, index) in pokemon.types"
            :key="'value' + index"
          >
            {{ value.type.name }}
          </div>
        </div>
      </div>

      <div v-if="pokemon" class="b-pokemon-detail__data">
        <div class="row px-4 mb-4">
          <div class="b-pokemon-detail__data-block b-pokemon-detail__data-block--left col-6">
            <div class="row">
              <div class="b-pokemon-detail__data-stats col-6 text-left py-2">
                <h3 class="b-pokemon-detail__data-stats-title font-weight-bold">Pokemon Stats</h3>

                <div
                  class="b-pokemon-detail__data-stat"
                  v-for="(value, index) in pokemon.stats"
                  :key="'value' + index"
                >
                  <p class="d-flex justify-content-between border-bottom"><span class="text-capitalize">{{ value.stat.name }}:</span> {{ value.base_stat }}</p>
                </div>
              </div>

              <div class="b-pokemon-detail__data-abilities col-6 py-2">
                <h3 class="b-pokemon-detail__data-abilities-title font-weight-bold">Abilities</h3>
                <div
                  class="b-pokemon-detail__data-ability mb-3"
                  v-for="(value, index) in pokemon.abilities"
                  :key="'value' + index"
                >
                  <span class="px-4 py-1">{{ value.ability.name }}</span>
                </div>
              </div>
            </div>
          </div>

          <div class="col-6">
            <div class="b-pokemon-detail__data-moves py-2">
              <h3 class="b-pokemon-detail__data-moves-title mb-4">Pokemon moves</h3>

              <div
                class="b-pokemon-detail__data-move mb-3"
                v-for="(value, index) in pokemon.moves"
                :key="'value' + index"
              >
                <span class="px-4 py-1">{{ value.move.name }}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div class="b-pokemon-detail__data-evolutions px-2 py-4">
          <h3>Pokemon evolutions</h3>
          <div
            class="b-pokemon-detail__data-evolution mb-3"
            v-for="(value, index) in possibleEvolutions"
            :key="'value' + index"
          >
            <span class="px-4 py-1 text-capitalize">{{ value }}</span>
          </div>
        </div>
      </div>

      <h2 v-else>The pokemon was not found</h2>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PokemonDetail',
  data: () => {
    return {
      imageUrl:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/",
      pokemonUrl: "https://pokeapi.co/api/v2/pokemon/",
      pokemon: {},
      pokemonSpecies: {},
      pokemonEvolution: {},
      possibleEvolutions: [],
    };
  },
  methods: {
    fetchData() {
      const req = new Request(this.pokemonUrl + this.$route.query.id);
      fetch(req)
        .then((resp) => {
          if (resp.status === 200) return resp.json();
        })
        .then((data) => {
          this.pokemon = data;
          this.fetchSpecies();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    fetchSpecies() {
      const req = new Request(this.pokemon.species.url);
      fetch(req)
        .then((resp) => {
          if (resp.status === 200) return resp.json();
        })
        .then((data) => {
          this.pokemonSpecies = data;
          this.fetchEvolution();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    fetchEvolution() {
      const req = new Request(this.pokemonSpecies.evolution_chain.url);
      fetch(req)
        .then((resp) => {
          if (resp.status === 200) return resp.json();
        })
        .then((data) => {
          this.pokemonEvolution = data.chain;
          this.possibleEvolutions.push(this.pokemonEvolution.species.name);
          this.setPossibleEvolves(this.pokemonEvolution.evolves_to);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    setPossibleEvolves(evolvesTo) {
      if (evolvesTo.length) {
        evolvesTo.forEach((element) => {
          this.possibleEvolutions.push(element.species.name);
          this.setPossibleEvolves(element.evolves_to);
        });
      }
    },
  },
  created() {
    this.fetchData();
  },
  computed: {
    getUrlForImage() {
      return this.pokemon && this.pokemon.id
        ? this.imageUrl + this.pokemon.id + ".png"
        : "";
    },
  },
};
</script>

<style lang="scss" scoped>
.b-pokemon-detail {
  background-image: url("../assets/images/body_bg.png");

  &__wrapper {
    background-color: white;
    padding-top: 100px;
  }

  &__header {
    margin-bottom: 100px;

    &-image {
      width: 120px;
      height: 120px;
      background-color: #f5f5f5;
      border-radius: 10px;
      transition: all 0.2s linear;
    }

    &-name {
      font-size: 1.6rem;

      span {
        font-size: 1.2rem;
      }
    }

    &-type {
      background:#597285;
      color: white;
      border-radius: 10px;

      &:not(:last-child) {
        margin-right: 10px;
      }
    }
  }

  &__data {
    &-block {
      border-radius: 10px;

      &--left {
        background-color: #f5f5f5;
      }
    }

    &-stats {
      &-title {
        font-size: 1.2rem;
      }
    }

    &-abilities {
      &-title {
        font-size: 1.2rem;
      }      
    }

    &-ability {
        span {
          background: #c7a138;
          color: white;
          border-radius: 10px;
        }
      }

    &-moves {
      background-image: url("../assets/images/body_bg.png");
      color: white;
      border-radius: 10px;
      max-height: 300px;
      overflow: auto;      
    }

    &-move,
    &-evolution {
      span {
        border: 1px solid white;
        border-radius: 10px;
      }
    }

    &-evolutions {
      background-image: url("../assets/images/body_gray_bg.png");
      color: white;
    }
  }
}
</style>
