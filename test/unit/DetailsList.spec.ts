import {mount} from '@vue/test-utils'
import {describe, it, expect} from 'vitest'
import DetailsList from "~/components/details/DetailsList.vue";
import DetailsListItem from "~/components/details/DetailsListItem.vue";
import {Separator} from "~/components/ui/separator";

describe('DetailsList.vue', () => {
  const listItems = [
    {label: 'Nom', value: 'John Doe'},
    {label: 'Email', value: 'john@example.com'},
  ]

  const datesList = [
    {label: 'Date de création', value: '2025-09-22'},
    {label: 'Date de modification', value: '2025-09-23'},
  ]

  it('displays the title', () => {
    const wrapper = mount(DetailsList, {
      props: {title: 'Informations', listItems},
      global: {
        components: {Separator},
      }
    })

    expect(wrapper.find('h3').text()).toBe('Informations')
  })

  it('returns the items in listItems', () => {
    const wrapper = mount(DetailsList, {
      props: {title: 'Infos', listItems},
      global: {
        components: {Separator},
      }
    })

    const itemComponents = wrapper.findAllComponents(DetailsListItem)
    expect(itemComponents).toHaveLength(listItems.length)
    itemComponents.forEach((comp, index) => {
      expect(comp.props('label')).toBe(listItems[index].label)
      expect(comp.props('value')).toBe(listItems[index].value)
    })
  })

  it('returns the Separator and datesList if provided', () => {
    const wrapper = mount(DetailsList, {
      props: {title: 'Infos', listItems, datesList},
      global: {
        components: {Separator},
      }
    })

    const separators = wrapper.findAllComponents(Separator)
    expect(separators).toHaveLength(1)

    const itemComponents = wrapper.findAllComponents(DetailsListItem)
    expect(itemComponents).toHaveLength(listItems.length + datesList.length)
  })

  it('does not display a separator if datesList is not provided', () => {
    const wrapper = mount(DetailsList, {
      props: {title: 'Infos', listItems},
      global: {
        components: {Separator},
      }
    })

    expect(wrapper.findComponent(Separator).exists()).toBe(false)
  })
})
