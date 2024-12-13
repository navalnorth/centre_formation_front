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

  it('renders navigation links correctly', () => {
    const wrapper = mount(FooterComp, {
      global: {
        stubs: {
          'router-link': true,
        },
      },
    });

    const links = wrapper.findAll('router-link-stub');
    expect(links).toHaveLength(5); 
    expect(links[0].attributes('to')).toBe('/');
    expect(links[1].attributes('to')).toBe('/bilan-de-competences');
    expect(links[2].attributes('to')).toBe('/formation');
    expect(links[3].attributes('to')).toBe('/'); 
    expect(links[4].attributes('to')).toBe('/mentions-legales');

  });


});
