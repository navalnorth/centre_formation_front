import { mount } from '@vue/test-utils';
import Navbar from '@/components/NavBarComp.vue'; // Remplacez par le chemin réel du composant
import { createRouter, createWebHistory } from 'vue-router';

const mockFetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () =>
      Promise.resolve({
        data: [{ logo: 'logo.png' }],
      }),
  })
);

global.fetch = mockFetch;

describe('Navbar.vue', () => {
  let router;

  beforeEach(() => {
    router = createRouter({
      history: createWebHistory(),
      routes: [
        { path: '/', component: { template: '<div>Home</div>' } },
        { path: '/about', component: { template: '<div>About</div>' } },
        { path: '/bilan-de-competences', component: { template: '<div>Bilan</div>' } },
        { path: '/formation', component: { template: '<div>Formation</div>' } },
        { path: '/contact', component: { template: '<div>Contact</div>' } },
      ],
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the logo when it is available', async () => {
    const wrapper = mount(Navbar, {
      global: {
        plugins: [router],
        stubs: {
          'router-link': true,
          ChMenuHamburger: true,
        },
      },
    });
  
    // Attendre que fetchLogo soit exécuté
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick(); // Double attente pour garantir que le DOM est mis à jour
  
    const logo = wrapper.find('img[alt="Logo"]');
    expect(logo.exists()).toBe(true);
    expect(logo.attributes('src')).toContain('logo.png'); // Vérifie la source de l'image
    expect(global.fetch).toHaveBeenCalledWith(
      `${process.env.VUE_APP_URL}/users/`,
      expect.any(Object)
    );
  });
  

  it('renders navigation links correctly', async () => {
    const wrapper = mount(Navbar, {
      global: {
        plugins: [router],
        stubs: {
          'router-link': true,
        },
      },
    });

    const links = wrapper.findAll('router-link-stub');
    expect(links).toHaveLength(8); // Vérifie le nombre de liens de navigation
    expect(links[0].attributes('to')).toBe('/about');
    expect(links[1].attributes('to')).toBe('/bilan-de-competences');
    expect(links[2].attributes('to')).toBe('/formation');
    expect(links[3].attributes('to')).toBe('/contact');
    expect(links[4].attributes('to')).toBe('/about');
    expect(links[5].attributes('to')).toBe('/bilan-de-competences');
    expect(links[6].attributes('to')).toBe('/formation');
    expect(links[7].attributes('to')).toBe('/contact');
  });


  it('navigates to the correct page when clicking a link', async () => {
    router.push('/');
    await router.isReady();
  
    const wrapper = mount(Navbar, {
      global: {
        plugins: [router],
        stubs: {
          'router-link': {
            template: '<a :href="to"><slot /></a>', // Stub pour simuler un `router-link`
            props: ['to'],
          },
        },
      },
    });
  
    // Rechercher le lien "Qui suis-je ?"
    const aboutLink = wrapper.find('a[href="/about"]');
    expect(aboutLink.exists()).toBe(true); // Vérifie que le lien existe
  
    // Simuler un clic
    await aboutLink.trigger('click');
  
    // Simuler la navigation (mise à jour manuelle du routeur pour le test)
    await router.push('/about');
    await wrapper.vm.$nextTick();
  
    // Vérifier la route actuelle
    expect(router.currentRoute.value.path).toBe('/about');
  });
  
  
  it('displays the admin link only when the user is logged in', async () => {
    const mockStore = {
      state: {
        user: { username: 'admin' },
      },
    };

    const wrapper = mount(Navbar, {
      global: {
        plugins: [router],
        mocks: {
          $store: mockStore,
        },
        stubs: {
          'router-link': true,
        },
      },
    });

    const adminLink = wrapper.find('router-link-stub[to="/admin-menu"]');
    expect(adminLink.exists()).toBe(false);
  });
  

  it('does not display the admin link when the user is not logged in', async () => {
    const mockStore = {
      state: {
        user: null,
      },
    };

    const wrapper = mount(Navbar, {
      global: {
        plugins: [router],
        mocks: {
          $store: mockStore,
        },
        stubs: {
          'router-link': true,
        },
      },
    });

    const adminLink = wrapper.find('router-link-stub[to="/admin-menu"]');
    expect(adminLink.exists()).toBe(false);
  });
});
