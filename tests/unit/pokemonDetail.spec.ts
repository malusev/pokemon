import { shallowMount } from '@vue/test-utils'
import PokemonDetail from '@/components/PokemonDetail.vue'
import 'intersection-observer'

describe('PokemonDetail.vue', () => {

  it('does pokemon exist', () => {
    const wrapper = shallowMount(PokemonDetail, {
      methods: {
        fetchData: () => { }
      
      }
    })

    expect(wrapper.find(".b-pokemon-detail__header-image").exists()).toBe(true);
  })
})