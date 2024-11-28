<template>
    <div class="card-container relative w-72 h-96 " @mouseover="isFlipped = true" @mouseleave="isFlipped = false">
      <div class="card-inner transform transition-transform duration-500 ease-in-out" :class="{ 'is-flipped': isFlipped }">
       
        <div class="card-front absolute w-full h-full bg-white rounded-lg shadow-lg overflow-hidden">
          
          <img :src="bgimage" alt="Card image" class="w-full h-full object-cover" />
         
          <div class="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <h3 class="text-lg font-bold text-white text-center px-4">{{ title }}</h3>
          </div>
        </div>
  
      
        <div class="card-back absolute  flex-col w-full h-full bg-pink-100 text-black rounded-lg shadow-lg flex items-center justify-center p-4">
          <p class="text-center text-2xl line-clamp-6">{{ description }}   
          </p><p><br>Cliquez pour plus info</p>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const isFlipped = ref(false);
  
  defineProps({
    bgimage: String,
    title: String,
    description: String,
  });
  </script>
  
  <style scoped>
  .card-container {
    perspective: 1000px; /* Ajout de perspective pour l'effet de rotation */
  }
  
  .card-inner {
    position: relative;
    width: 100%;
    height: 100%;
    transform-style: preserve-3d;
  }
  
  .card-inner.is-flipped {
    transform: rotateY(180deg); /* Retourne la carte */
  }
  
  .card-front,
  .card-back {
    backface-visibility: hidden; /* Cache l'autre face lors de la rotation */
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 1rem;
  }
  
  .card-back {
    transform: rotateY(180deg); /* Retourne la face arrière */
  }
  </style>
  