<template>
    <div class="flex flex-col items-center justify-center text-white">
        <!-- Div avec dégradé dynamique et coin arrondi -->
        <div class="background-div  ">
             <div class="flex items-center justify-center flex-wrap-reverse gap-10 md:gap-44 w-full mt-32  relative z-10">
            <div class="text-center md:text-left md:w-1/3 w-full">
                <h1 class="text-xl md:text-3xl  font-bold fontTitle md:p-0 px-5"><slot name="title"></slot></h1>
                <h3 class="text-base md:text-xl mt-2 font-light"><slot name="name"></slot></h3>
                <p class="mt-4 text-base sp fontSubTitle w-full break-words md:p-0 px-5"><slot name="description"></slot></p>
            </div>
            <div class="flex flex-col items-center">
                <div :style="`background-image:url('${url}${image}')`" class="file-upload"></div>
                <p class="p-2 mt-5 bg-white text-black w-56 rounded-xl text-center">Qui suis-je ?</p>
            </div>
        </div>
        </div>

       
    </div>
</template>

<script setup>
const url = `${process.env.VUE_APP_IP_ADDRESS}/uploads/`;

defineProps({
  image: {
    type: String,
  },
});

</script>

<style scoped>

.file-upload {
  width: 250px;
  height: 300px;
  display: flex;
  background-position: center;
  background-size: cover;
 
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 35px;
  margin: auto;
}

.file-upload input[type="file"] {
  display: none;
}

.uploadPicture {
  width: 60px;
  height: 60px;
}


/* Appliquer les polices via les variables */
.fontTitle {
  font-family: var(--font-title);
}

.fontSubTitle {
  font-family: var(--font-subtitle);
}

.fontText {
  font-family: var(--font-text);
}

/* Dégradé dynamique dans la div avec un coin arrondi */
.background-div {
  
  top: 0;
  left: 0;
  width: 100%;
  height: auto;
  padding-bottom: 100px;
  background: linear-gradient(to right, var(--primary-color), var(--secondary-color));
  /* Forme avec un coin arrondi en bas à droite */
  border-bottom-right-radius: 50%; /* Arrondi du coin inférieur droit */
  z-index: -1;
  /* Appliquer un dégradé avec un coin arrondi */
  overflow: hidden;
}

@media (max-width: 768px) {
    .background-div {
        border-bottom-right-radius: 0px;
        
    }
}
</style>
