import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import BaseTable from '../base/BaseTable.vue'

describe('Base Table', () => {

  const sample = [
    {
      id: 1,
      createdAt: "2020-07-08T17:16:07.207Z",
      updatedAt: "2023-10-17T22:52:09.916Z",
      title: "Deprecator quasi esse attollo admitto strenuus blandior valens varietas.",
      content: "Content 1",
      author: "Frances Rohan",
      tags: [
          "typescript",
          "rust",
          "java"
      ]
    },
    {
      id: 2,
      createdAt: "2020-07-09T15:56:55.039Z",
      updatedAt: "2023-09-25T22:48:11.696Z",
      title: "Curiositas itaque spiculum approbo occaecati video venia similique volaticus adsidue.",
      content: "Content 2",
      author: "Margaret Batz",
      tags: [
            "javascript",
            "java",
            "php",
            "express"
        ]
    },
    {
        id: 3,
        createdAt: "2020-07-10T15:13:12.789Z",
        updatedAt: "2023-10-09T07:14:25.638Z",
        title: "Cinis concedo sollers defetiscor clamo tremo.",
        content: "Content 3",
        author: "Lela Hartmann I",
        tags: [
            "php",
            "typescript"
        ]
    },
    {
        id: 4,
        createdAt: "2020-07-11T08:39:47.493Z",
        updatedAt: "2023-10-10T16:08:22.599Z",
        title: "Valetudo angulus vir maxime ars exercitationem caveo truculenter comprehendo.",
        content: "Content 4",
        author: "Brent Kohler",
        tags: [
            "rust",
            "go",
            "typescript"
        ]
    }]


  it('renders properly', () => {
    const wrapper = mount(BaseTable, { 
      props: { 
        fields: [
          'id',
          'createdAt',
          'updatedAt',
          'title',
          'content',
          'author',
          'tags'
        ],
        data: sample,
      } 
    })
    
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.findAll('tr').length).toBe(5)
  })

  it('sort event is emmited', async () => {
    const wrapper = mount(BaseTable, {
      global: {
        mocks: {
          route: {
            query: {}
          }
        }
      },
      props: { 
        fields: [
          'id',
          'createdAt',
          'updatedAt',
          'title',
          'content',
          'author',
          'tags'
        ],
        data: sample,
        sortable: true,
      } 
    })

    await wrapper.findAll('th')[0].find('span').trigger('click')
    expect(wrapper.emitted().sort).toBeTruthy()

  })

  it('shows action button', () => {
    const wrapper = mount(BaseTable, {
      global: {
        mocks: {
          route: {
            query: {}
          }
        }
      },
      slots: {
        action: `
        <template #action="{ id }">
          <RouterLink :to="/entries/id">view</RouterLink>
        </template>`
      },
      props: { 
        fields: [
          'id',
          'createdAt',
          'updatedAt',
          'title',
          'content',
          'author',
          'tags'
        ],
        data: sample,
      } 
    })

    expect(wrapper.findAll('tr')[1].findAll('td')[7].html()).toContain('<routerlink to="/entries/di">view</routerlink>')
  })

})
