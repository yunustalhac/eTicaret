<template>
<!--  <nuxt-link to="/">-->
<!--    <button class="bg-ligtPurple text-white py-3 px-4 rounded-lg w-1/6 absolute top-0 right-0">Ana Menü</button>-->
<!--  </nuxt-link> -->

  <div class="flex flex-col gap-5">
    <nuxt-link to="/">
      <button class="bg-ligtPurple text-white py-2 rounded-lg w-1/3  absolute top-0 right-0">Ana Menü</button>
    </nuxt-link>

    <div class="relative">
      <h1 class="text-4xl font-semibold border-b border-gray-300 pb-4 mb-6">Alışveriş Sepeti</h1>

      <div v-for="i in 3" class="flex gap-5 p-4 border-b border-gray-200 relative">
        <img src="@/assets/icon/exit.svg"
             @click="deleteCard"
             class="absolute top-4 right-4 w-6 h-6 cursor-pointer hover:opacity-80 transition-opacity duration-200 active:scale-90">

        <div class="w-1/4">
          <img class="rounded-lg shadow-md"
               src="https://tailwindui.com/img/ecommerce-images/category-page-01-image-card-02.jpg">
        </div>
        <div class="flex flex-col w-3/4 gap-3">
          <span class="text-lg font-semibold text-gray-800 lg:text-xl">Not Kağıdı</span>
          <div class="flex gap-2">
            <small class="bg-gray-100 text-gray-600 px-2 py-1 rounded-full">Küçük Boy</small>
            <small class="bg-gray-100 text-gray-600 px-2 py-1 rounded-full">Lacivert</small>
          </div>
          <span class="text-xl font-bold text-gray-900">100₺</span>
          <select
              class="block w-full appearance-none bg-gray-100 border border-gray-300 rounded-lg py-2 px-4 pr-10 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500">
            <option v-for="i in 10" :key="i">{{ i }}</option>
          </select>

          <div class="">
            <span v-if="true" class="text-green-500 font-semibold">Stokta Var</span>
            <span v-else class="text-red-500 font-semibold">Stokta Yok</span>
          </div>
        </div>
      </div>

      <div
          class="relative bg-white rounded-lg shadow-md flex flex-col gap-4 p-6 max-w-md mx-auto lg:fixed lg:bottom-0 lg:right-0 lg:border-2 lg:border-black lg:w-1/4">
        <h1 class="text-2xl font-semibold text-gray-800">Sipariş Özeti</h1>
        <div class="flex flex-col gap-4">
          <div class="flex justify-between text-gray-700 border-b border-gray-300 pb-2">
            <span>Ürünlerinizin Fiyatı</span>
            <span>300₺</span>
          </div>

          <div class="flex justify-between text-gray-700 border-b border-gray-300 pb-2">
            <span>Kargo Tutarı</span>
            <span>200₺</span>
          </div>

          <div class="flex justify-between font-bold text-gray-900">
            <span>Sipariş Toplam</span>
            <span>500₺</span>
          </div>
          <button
              class="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg transition duration-300 ease-in-out">
            Ödeme Yap
          </button>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">

definePageMeta({
  layout: 'master'
});

const deleteCard = () => {
  deleteCard.style.display = 'none';

};
</script>
