import { mount } from '@vue/test-utils';
import FooterComp from '@/components/FooterComp.vue'; // Remplacez par le chemin réel du composant



module.exports = {
  moduleNameMapper: {
    '^@kalimahapps/vue-icons$': './__mocks__/@kalimahapps/vue-icons.js',
  },
};

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({}),
  })
);

global.scrollTo = jest.fn();

describe('FooterComp.vue', () => {
  it('calls scrollToTop when the scroll-to-top button is clicked', async () => {
    const wrapper = mount(FooterComp, {
      global: {
        stubs: {
          MdKeyboardArrowUp: true, // Stub pour éviter de charger l'icône
          'router-link': true,
        },
      },
    });

    const button = wrapper.find('.cursor-pointer');
    expect(button.exists()).toBe(true);
    await button.trigger('click');

    expect(global.scrollTo).toHaveBeenCalledWith({
      top: 0,
      behavior: 'smooth',
    });
  });
});
