import { shallowMount } from '@vue/test-utils'
import Pokemon from '@/components/Pokemon.vue'

describe('Pokemon.vue', () => {

  it('renders', () => {
    const wrapper = shallowMount(Pokemon, {})
    expect(wrapper.exists()).toBe(true)
  })
})