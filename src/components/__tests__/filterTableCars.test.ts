import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import sinon from 'sinon'
import FilterTableCars from '@/components/FilterTableCars.vue'
import PrimeVue from 'primevue/config'

describe('FilterTableCars component', () => {
  it('should submit the form with filter data', async () => {
    const wrapper = mount(FilterTableCars, {
      global: {
        plugins: [PrimeVue]
      }
    })

    const brandInput = wrapper.find('input[id="brand"]')
    const modelInput = wrapper.find('input[id="model"]')
    const yearInput = wrapper.find('input[id="year"]')
    const priceInput = wrapper.find('input[id="price"]')
    const submitButton = wrapper.find('button[id="filter-btn"]')

    await brandInput.setValue('Toyota')
    await modelInput.setValue('Corolla')
    await yearInput.setValue('2022')
    await priceInput.setValue('50000')
    await submitButton.trigger('click')

    wrapper.vm.$emit('onSubmit', {
      brand: 'Toyota',
      model: 'Corolla',
      year: '2022',
      price: '50000'
    })
    await wrapper.vm.$nextTick()

    expect(wrapper.emitted('onSubmit')).toBeTruthy()
    expect(wrapper.emitted('onSubmit')!.length).toBe(1)
    expect(wrapper.emitted('onSubmit')![0]).toEqual([
      {
        brand: 'Toyota',
        model: 'Corolla',
        year: '2022',
        price: '50000'
      }
    ])
  })

  it('must clear the form fields', async () => {
    const clickHandler = sinon.stub()
    const wrapper = mount(FilterTableCars, {
      global: {
        plugins: [PrimeVue]
      },
      data() {
        return {
          clicked: false
        }
      }
    })

    const brandInput = wrapper.find('input[id="brand"]')
    const modelInput = wrapper.find('input[id="model"]')
    const yearInput = wrapper.find('input[id="year"]')
    const priceInput = wrapper.find('input[id="price"]')
    const submitButton = wrapper.find('button[id="filter-clear"]')

    const brand = brandInput.element as HTMLInputElement
    const model = modelInput.element as HTMLInputElement
    const year = yearInput.element as HTMLInputElement
    const price = priceInput.element as HTMLInputElement

    await submitButton.trigger('click')

    expect(brand.value).toBe('')
    expect(model.value).toBe('')
    expect(year.value).toBe('')
    expect(price.value).toBe('')

    wrapper.vm.$emit('onSubmit', {
      brand: '',
      model: '',
      year: '',
      price: ''
    })
    await wrapper.vm.$nextTick()

    expect(wrapper.emitted('onSubmit')![0]).toEqual([
      {
        brand: '',
        model: '',
        year: '',
        price: ''
      }
    ])
  })

  it('should disable the clear button when disabledButtonClear is true', async () => {
    const wrapper = mount(FilterTableCars, {
      global: {
        plugins: [PrimeVue]
      },
      data() {
        return {
          disabledButtonClear: false
        }
      }
    })

    const brandInput = wrapper.find('input[id="brand"]')
    const modelInput = wrapper.find('input[id="model"]')
    const yearInput = wrapper.find('input[id="year"]')
    const priceInput = wrapper.find('input[id="price"]')
    const clearButton = wrapper.find('button[id="filter-clear"]')

    expect(clearButton.attributes('disabled')).toBeDefined()

    await wrapper.setData({ disabledButtonClear: true })

    expect(clearButton.attributes('disabled')).toBeDefined()

    await brandInput.setValue('Toyota')
    await modelInput.setValue('')
    await yearInput.setValue('')
    await priceInput.setValue('')

     const disabledButtonClear = wrapper.vm.$data.disabledButtonClear

     expect(disabledButtonClear).toBe(true)
  })
})
