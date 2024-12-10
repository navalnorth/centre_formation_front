<template>
    <BannierPagesComp>
        <template #title>
            Mentions Légales
        </template>
    </BannierPagesComp>

    <div class="flex justify-center items-center flex-col px-10">
        <section class= "text-left py-8 px-4 sm:px-8 md:px-16 taille">
        <h2 class="text-3xl font-bold text-gray-800 mb-6 border-b-2 border-gray-300 pb-2">
            Mentions Légales
        </h2>

        <article class="mb-8">
            <h3 class="text-2xl font-semibold text-gray-700 mb-4">
                Identification de l'éditeur
            </h3>
            <p class="text-gray-600">
                <strong>Responsable de la publication :</strong> Pauline Bourdarias<br />
                <!-- <strong>Adresse professionnelle :</strong> [Adresse complète de l'activité]<br /> -->
                <strong>Téléphone :</strong> 06 38 41 09 42<br />
                <strong>Adresse e-mail :</strong> pauline.bourdarias@gmail.com<br />
            </p>
        </article>

        <article class="mb-8">
            <h3 class="text-2xl font-semibold text-gray-700 mb-4">
                Informations légales
            </h3>
            <p class="text-gray-600">
                <strong>SIRET :</strong> 91792754300012<br />
                <strong>Numéro de TVA intracommunautaire :</strong> FR74917927543<br />
                <strong>Code APE :</strong> 8559A<br />
                <strong>Déclaration d'activité :</strong> Enregistrée sous le numéro 32591224359 auprès du Préfet de Région Hauts-de-France.<br />
            </p>
        </article>

        <article class="mb-8">
            <h3 class="text-2xl font-semibold text-gray-700 mb-4">
                Hébergement du site
            </h3>
            <p class="text-gray-600">
                <strong>Hébergeur :</strong> Hostinger<br />
                <strong>Adresse :</strong> 61 Lordou Vironos Street, 6023 Larnaca, Chypre<br />
            </p>
        </article>

        <article class="mb-8">
            <h3 class="text-2xl font-semibold text-gray-700 mb-4">
                Activités proposées
            </h3>
            <p class="text-gray-600">
                Ce site propose des services de bilans de compétences et de formations. Ces activités sont conformes à la réglementation en vigueur en France et sont destinées aux particuliers ainsi qu'aux professionnels souhaitant développer leurs compétences personnelles et professionnelles.
            </p>
        </article>

        <article class="mb-8">
            <h3 class="text-2xl font-semibold text-gray-700 mb-4">
                Propriété intellectuelle
            </h3>
            <p class="text-gray-600">
                Les contenus (textes, images, logos, etc.) présentés sur ce site sont la propriété exclusive de auline Bourdarias. Toute reproduction, représentation ou diffusion, en tout ou partie, du contenu de ce site est strictement interdite sans autorisation écrite préalable.
            </p>
        </article>

        <article class="mb-8">
            <h3 class="text-2xl font-semibold text-gray-700 mb-4">
                Protection des données personnelles
            </h3>
            <p class="text-gray-600">
                Conformément à la loi Informatique et Libertés et au RGPD (Règlement Général sur la Protection des Données), les informations personnelles collectées sur ce site sont strictement confidentielles. Vous disposez d'un droit d'accès, de rectification, d'effacement et d'opposition à vos données personnelles. Pour exercer ces droits, vous pouvez contacter : pauline.bourdarias@gmail.com.
            </p>
        </article>

        <article>
            <h3 class="text-2xl font-semibold text-gray-700 mb-4">
                Responsabilité
            </h3>
            <p class="text-gray-600">
                Pauline Bourdarias met tout en œuvre pour garantir l'exactitude et la mise à jour des informations présentes sur ce site. Toutefois, aucune garantie n'est donnée quant à leur exhaustivité ou leur précision. Pauline Bourdarias décline toute responsabilité en cas de dommage direct ou indirect lié à l'utilisation du site.
            </p>
        </article>
    </section>
    </div>
</template>

<script setup>
import BannierPagesComp from '@/components/BannierPagesComp.vue';
</script>


<style scoped>
.taille {
    max-width: 1000px
}
</style>