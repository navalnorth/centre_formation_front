

import { mount, flushPromises } from '@vue/test-utils';
import Accueil from '@/components/AccueilCardComp.vue';
import { useRouter } from 'vue-router';


// Mock du routeur
jest.mock('vue-router', () => ({
    useRouter: jest.fn(() => ({
        push: jest.fn(),
    })),
}));

// Mock de `fetch`
global.fetch = jest.fn();

describe('Accueil.vue', () => {
    const mockCards = [
        {
            title: 'Bilan de compétences',
            description: 'Description du bilan de compétences.',
            bgimage: 'bilan.jpg',
            infoBull1: 'Info 1',
            infoBull2: 'Info 2',
            isFlipped: false, // Ajout explicite
        },
        {
            title: 'Nos formations',
            description: 'Description des formations.',
            bgimage: 'formation.jpg',
            infoBull1: 'Info 1',
            infoBull2: 'Info 2',
            isFlipped: false, // Ajout explicite
        },
    ];


    beforeEach(() => {
        jest.clearAllMocks();
        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => ({
                data: mockCards,

            }),
        });
    });

    it('récupère et affiche les cartes correctement', async () => {
        const wrapper = mount(Accueil);

        // Attendez que les appels API soient terminés
        await flushPromises();

        // Vérifiez que les cartes sont rendues
        const cards = wrapper.findAll('.card-container');
        expect(cards).toHaveLength(mockCards.length);

        // Vérifiez le contenu de la première carte
        const firstCardTitle = wrapper.find('.card-front p');
        expect(firstCardTitle.text()).toBe(mockCards[0].title);
    });

    it('navigue vers la route correcte lors du clic sur une carte', async () => {
        // Mock du comportement de useRouter pour inclure router.push comme une promesse
        const router = {
            push: jest.fn().mockResolvedValue(), // Retourne une promesse résolue
        };

        // Simuler le hook useRouter pour renvoyer notre mock
        useRouter.mockReturnValue(router);

        const wrapper = mount(Accueil);

        // Attendez que les appels API soient terminés
        await flushPromises();

        // Trouver la première carte et simuler un clic
        const firstCard = wrapper.find('.card-back');
        await firstCard.trigger('click');

        // Vérifiez que router.push a été appelé avec la bonne route
        expect(router.push).toHaveBeenCalledWith('/bilan-de-competences');
    });


   
});
