import {mount} from '@vue/test-utils'
import {describe, it, expect} from 'vitest'
import DetailsListItem from "~/components/details/DetailsListItem.vue";

describe('DetailsListItem.vue', () => {

  it('displays the label', () => {
    const wrapper = mount(DetailsListItem, {
      props: {
        label: 'Nom',
        value: 'John Doe',
      },
    })

    expect(wrapper.text()).toContain('Nom')
  })

  it('displays a single value', () => {
    const wrapper = mount(DetailsListItem, {
      props: {
        label: 'Nom',
        value: 'John Doe',
      },
    })

    const valueSpan = wrapper.findAll('span')[1] // le deuxième span contient la value
    expect(valueSpan.text()).toBe('John Doe')
  })

  it('displays a list of values', () => {
    const items = ['Item 1', 'Item 2', 'Item 3']

    const wrapper = mount(DetailsListItem, {
      props: {
        label: 'Liste',
        value: items,
      },
    })

    const liItems = wrapper.findAll('ul li')
    expect(liItems).toHaveLength(items.length)
    liItems.forEach((li, index) => {
      expect(li.text()).toBe(items[index])
    })
  })

  it('does not display <ul> if the value is not an array', () => {
    const wrapper = mount(DetailsListItem, {
      props: {
        label: 'Nom',
        value: 'John Doe',
      },
    })

    expect(wrapper.find('ul').exists()).toBe(false)
  })
})
