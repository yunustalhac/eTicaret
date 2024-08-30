<template>
  <transition name="fade" @before-enter="beforeEnter" @enter="enter" @leave="leave">
    <div v-if="details" class="fixed inset-0 bg-gray-600 bg-opacity-50 backdrop-blur-[1.5px] z-10"></div>
  </transition>

  <transition name="slide">
    <div v-if="details" class="fixed w-full left-0 top-0 flex flex-col items-center justify-center h-screen z-50">
      <div class="relative w-full max-w-md lg:max-w-2xl p-4 bg-gray-100 rounded-lg shadow-lg overflow-auto mx-4 lg:flex">
        <div class="p-4">
          <img
              src="@/assets/icon/exit.svg"
              class="absolute right-2 top-2 w-6 h-6 cursor-pointer"
              @click="closeDetails"
          >
        </div>
        <div class="lg:w-full">
          <img
              src="https://tailwindui.com/img/ecommerce-images/category-page-01-image-card-02.jpg"
              class="object-cover w-full h-44 lg:h-auto rounded-lg"
          >
        </div>

        <div class="mt-4">
          <div class="flex flex-col items-center justify-center h-full px-5 gap-2">
            <span class="text-xl font-bold">Not Kağıdı</span>
            <span class="text-xl font-bold">100₺</span>
            <span class="text-center mt-2">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid corporis excepturi nisi quae similique, vel veniam? Explicabo necessitatibus quos veritatis.</span>

            <div class="flex gap-4">
              <input type="radio" id="color1" name="color" class="hidden peer" />
              <label for="color1" class="relative h-8 w-8 bg-blue-950 rounded-full cursor-pointer flex items-center justify-center transition-all peer-checked:before:content-[''] peer-checked:before:absolute peer-checked:before:top-0 peer-checked:before:left-0 peer-checked:before:w-full peer-checked:before:h-full peer-checked:before:border peer-checked:before:border-blue-500 peer-checked:before:rounded-full peer-checked:before:-z-10 peer-checked:before:inset-[-2px]"></label>

              <input type="radio" id="color2" name="color" class="hidden peer" />
              <label for="color2" class="relative h-8 w-8 bg-gray-950 rounded-full cursor-pointer flex items-center justify-center transition-all peer-checked:before:content-[''] peer-checked:before:absolute peer-checked:before:top-0 peer-checked:before:left-0 peer-checked:before:w-full peer-checked:before:h-full peer-checked:before:border peer-checked:before:border-blue-500 peer-checked:before:rounded-full peer-checked:before:-z-10 peer-checked:before:inset-[-2px]"></label>

              <input type="radio" id="color3" name="color" class="hidden peer" />
              <label for="color3" class="relative h-8 w-8 bg-blue-950 rounded-full cursor-pointer flex items-center justify-center transition-all peer-checked:before:content-[''] peer-checked:before:absolute peer-checked:before:top-0 peer-checked:before:left-0 peer-checked:before:w-full peer-checked:before:h-full peer-checked:before:border peer-checked:before:border-blue-500 peer-checked:before:rounded-full peer-checked:before:-z-10 peer-checked:before:inset-[-2px]"></label>
            </div>

            <button class="bg-ligtPurple text-white py-2 px-4 rounded-lg w-full">Sepete Ekle</button>
          </div>
        </div>
      </div>
    </div>
  </transition>

  <div @click="details = !details" class="flex flex-wrap flex-col lg:flex-row sm:flex-row justify-around gap-10 sm:gap-10">
    <div v-for="i in 15" :key="i" class="lg:w-1/4 sm:w-1/3 w-full flex flex-col gap-3">
      <div>
        <img
            class="w-full h-auto object-cover rounded-lg transition-all duration-150 hover:grayscale"
            src="https://tailwindui.com/img/ecommerce-images/category-page-01-image-card-02.jpg"
        >
      </div>
      <div class="flex flex-col gap-1">
        <div class="flex justify-between">
          <span>Not Kağıdı</span>
          <span class="">100₺</span>
        </div>
        <small class="text-gray-500">3 Boyutta Mevcuttur</small>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue';

definePageMeta({
  layout: 'default'
});

const details = ref(false);

const closeDetails = () => {
  details.value = false;
};

// Animasyonlar için ek fonksiyonlar
const beforeEnter = (el: HTMLElement) => {
  el.style.transform = 'translateY(-100%)';
  el.style.opacity = '0';
};

const enter = (el: HTMLElement) => {
  el.offsetHeight; // trigger reflow
  el.style.transition = 'transform 0.3s ease-out, opacity 0.3s ease-out';
  el.style.transform = 'translateY(0)';
  el.style.opacity = '1';
};

const leave = (el: HTMLElement) => {
  el.style.transition = 'transform 0.3s ease-in, opacity 0.3s ease-in';
  el.style.transform = 'translateY(-100%)';
  el.style.opacity = '0';
};
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

.slide-enter-active, .slide-leave-active {
  transition: transform 0.3s ease, opacity 0.3s ease;
}
.slide-enter, .slide-leave-to {
  transform: translateY(-100%);
  opacity: 0;
}

/* Radio button seçili olduğunda stil uygulanır */
input:checked + label {
  @apply border-4 border-blue-500 outline outline-blue-500 outline-offset-2 rounded-full;
}
</style>
