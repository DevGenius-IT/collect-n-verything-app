import {mount, flushPromises} from '@vue/test-utils'
import {describe, it, expect, vi, beforeEach, beforeAll} from 'vitest'
import {createPinia, setActivePinia} from 'pinia'
import {TabsRoot} from "radix-vue";
import {h} from 'vue'
import {SignUp} from "~/components/forms";
import fr from "~/i18n/locales/fr.json";

// Mock store - must be defined before vi.mock calls
vi.mock('~/stores/AuthStore', () => {
  const mockAuthStore = {
    signUp: vi.fn(),
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
  signUp: vi.fn(),
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
  vi.mocked(authStore().signUp).mockClear()
  vi.mocked(toast).mockClear()
})

// Factory avec TabsRoot
function factory(props: any = {}) {
  return mount(TabsRoot, {
    props: {defaultValue: 'register'},
    slots: {
      default: () => h(SignUp, props),
    },
    global: {
      stubs: {'auto-animate': true},
    },
  })
}

// ----- Tests -----
describe('SignUp.vue', () => {
  const defaultProps = {changeTab: vi.fn(), redirectAfterLogin: false}

  it('displays the title, description, and submit button', () => {
    const wrapper = factory(defaultProps)
    expect(wrapper.text()).toContain(fr['forms']['sign-up'].title)
    expect(wrapper.text()).toContain(fr['forms']['sign-up'].description)
    expect(wrapper.find('button[type="submit"]').exists()).toBe(true)
  })

  it('does not call signUp if the form is invalid', async () => {
    const wrapper = factory(defaultProps)

    await wrapper.find('#firstname').setValue('J')
    await wrapper.find('form').trigger('submit.prevent')
    await flushPromises()

    expect(mockAuthStore.signUp).not.toHaveBeenCalled()
  })

  it('changes the tab when you click on login', async () => {
    const changeTabSpy = vi.fn()
    const wrapper = factory({changeTab: changeTabSpy})

    const loginText = fr['forms']['sign-up']['login-here']
    const loginLink = wrapper.findAll('a.underline').find(a => a.text().trim() === loginText)
    if (!loginLink) throw new Error()

    await loginLink.trigger('click')

    expect(changeTabSpy).toHaveBeenCalledTimes(1)
    expect(changeTabSpy).toHaveBeenCalledWith('login')
  })
})