import {mount, flushPromises} from '@vue/test-utils'
import {describe, it, expect, vi, beforeEach, beforeAll} from 'vitest'
import {SignIn} from '~/components/forms'
import fr from '~/i18n/locales/fr.json'
import {createPinia, setActivePinia} from 'pinia'
import {TabsRoot} from "radix-vue";
import {h} from 'vue'

// Mock store - must be defined before vi.mock calls
vi.mock('~/stores/AuthStore', () => {
  const mockAuthStore = {
    signIn: vi.fn(),
    state: {isError: false}
  }
  return {authStore: () => mockAuthStore}
})

// Mock toast
vi.mock('@/components/ui/toast', () => ({
  toast: vi.fn()
}))

// Get references to mocked functions after mocking
const mockAuthStore = vi.mocked({
  signIn: vi.fn(),
  state: {isError: false, error: null}
})

beforeAll(() => {
  window.HTMLElement.prototype.animate = () =>
    ({finished: Promise.resolve(), addEventListener: vi.fn()}) as any;
});

beforeEach(async () => {
  setActivePinia(createPinia())
  vi.clearAllMocks()

  // Reset mock state
  mockAuthStore.state.isError = false
  mockAuthStore.state.error = null

  // Get fresh references to mocked modules
  const {authStore} = await import('~/stores/AuthStore')
  const {toast} = await import('@/components/ui/toast')

  // Reset the actual mocked functions
  vi.mocked(authStore().signIn).mockClear()
  vi.mocked(toast).mockClear()
})

// Factory avec TabsRoot
function factory(props: any = {}) {
  return mount(TabsRoot, {
    props: {defaultValue: 'login'},
    slots: {
      default: () => h(SignIn, props),
    },
    global: {
      stubs: {'auto-animate': true},
    },
  })
}

// ----- Tests -----
describe('SignIn.vue', () => {
  const defaultProps = {changeTab: vi.fn(), redirectAfterLogin: false}

  it('displays the title, description, and submit button', () => {
    const wrapper = factory(defaultProps)
    expect(wrapper.text()).toContain(fr['forms']['sign-in'].title)
    expect(wrapper.text()).toContain(fr['forms']['sign-in'].description)
    expect(wrapper.find('button[type="submit"]').exists()).toBe(true)
  })

  it('displays all required form fields', () => {
    const wrapper = factory(defaultProps)

    expect(wrapper.find('input[type="email"]').exists()).toBe(true)
    expect(wrapper.find('input[type="password"]').exists()).toBe(true)
    expect(wrapper.text()).toContain(fr['forms']['sign-in']['fields']['email'].label)
    expect(wrapper.text()).toContain(fr['forms']['sign-in']['fields']['password'].label)
  })

  it('prevents signIn call when form is invalid', async () => {
    const {authStore} = await import('~/stores/AuthStore')
    const mockAuth = authStore()

    const wrapper = factory(defaultProps)

    const emailInput = wrapper.find('input[type="email"]')
    const passwordInput = wrapper.find('input[type="password"]')
    const form = wrapper.find('form')

    await emailInput.setValue('invalid-email')
    await emailInput.trigger('blur')

    await passwordInput.setValue('123')
    await passwordInput.trigger('blur')

    await form.trigger('submit')
    await flushPromises()

    expect(mockAuth.signIn).not.toHaveBeenCalled()
  })

  it('has correct accessibility attributes', () => {
    const wrapper = factory(defaultProps)

    const submitButton = wrapper.find('button[type="submit"]')
    expect(submitButton.attributes('aria-label')).toBe(fr['forms']['sign-in'].submit)

    const emailInput = wrapper.find('input[type="email"]')
    const passwordInput = wrapper.find('input[type="password"]')

    expect(emailInput.attributes('id')).toBe('email')
    expect(passwordInput.attributes('id')).toBe('password')
    expect(emailInput.attributes('autocomplete')).toBe('username')
    expect(passwordInput.attributes('autocomplete')).toBe('current-password')
  })

  it('displays Google sign-in button', () => {
    const wrapper = factory(defaultProps)

    const buttons = wrapper.findAll('button')
    const googleButton = buttons.find(btn => btn.text().includes(fr['forms']['sign-in']['google']))

    expect(googleButton?.exists()).toBe(true)
    expect(googleButton?.attributes('class')).toContain('outline')
  })

  it('has required attributes on form inputs', () => {
    const wrapper = factory(defaultProps)

    const emailInput = wrapper.find('input[type="email"]')
    const passwordInput = wrapper.find('input[type="password"]')

    expect(emailInput.attributes('required')).toBeDefined()
    expect(passwordInput.attributes('required')).toBeDefined()
  })

  it('changes the tab when you click on register', async () => {
    const changeTabSpy = vi.fn()
    const wrapper = factory({changeTab: changeTabSpy})

    const registerText = fr['forms']['sign-in']['register-here']
    const registerLink = wrapper.findAll('a.underline').find(a => a.text().trim() === registerText)
    if (!registerLink) throw new Error()

    await registerLink.trigger('click')

    expect(changeTabSpy).toHaveBeenCalledTimes(1)
    expect(changeTabSpy).toHaveBeenCalledWith('register')
  })
})