import { shallowMount } from '@vue/test-utils'
import PokemonList from '@/components/PokemonList.vue'
import 'intersection-observer'


describe('PokemonList.vue', () => {

  it('does list exist', () => {
    const wrapper = shallowMount(PokemonList, {
      methods: {
        fetchData: () => { }
      }
    })

    expect(wrapper.find(".b-pokemon-list").exists()).toBe(true);
  })
})