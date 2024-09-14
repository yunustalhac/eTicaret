<template>
  <div class="bg-bgPhoto">
    <div class="flex flex-col gap-5 p-6 lg:py-0 lg:px-0">
      <nuxt-link to="/" class="self-end mb-4">
        <button
            class="bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition duration-300 ease-in-out">
          Ana Menü
        </button>
      </nuxt-link>


      <div class="relative">
        <div class="flex flex-col lg:flex-row">

          <div>
            <!--          <h1 class="text-3xl lg:text-4xl font-semibold border-b border-gray-300 pb-4 mb-6">Alışveriş Sepeti</h1>-->

            <div v-for="(item, index) in products" :key="index"
                 class="relative flex flex-col md:flex-row gap-4 p-4 border-b border-gray-200 lg:w-2/3">
              <!-- Çarpı simgesi burada konumlandırıldı -->
              <img src="@/assets/icon/exit.svg"
                   @click="deleteCard(item)"
                   class="absolute right-4 w-6 h-6 cursor-pointer hover:opacity-80 transition-opacity duration-200 active:scale-90 z-10">

              <div class="w-full md:w-full rounded-lg">
                <img
                    :src="item.img"
                    :data-id="index"
                    class=" object-cover rounded-lg transition-all hover:grayscale h-fit w-fit"
                >
              </div>
              <div class="flex flex-col w-full md:w-3/4 gap-3">
                <span class="text-lg lg:text-xl font-semibold text-gray-800">{{ item.title }}</span>
                <div class="flex flex-col md:flex-row items-start lg:items-center justify-between">
                  <div class="flex flex-col gap-1">
                    <div class="flex gap-2">
                      <small class="text-gray-600 bg-gray-100 px-2 py-1 rounded-full">{{ item.boyut }}</small>
                      <small class="text-gray-600 bg-gray-100 px-2 py-1 rounded-full">{{ item.renk }}</small>
                    </div>
                    <span class="text-xl font-bold text-gray-900">{{ item.fiyat }}₺</span>
                  </div>
                  <select
                      class="cursor-pointer block appearance-none bg-gray-100 border border-gray-300 rounded-lg px-3 py-1 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500 mt-2 md:mt-0 md:ml-4">
                    <option v-for="i in 10" :key="i">{{ i }}</option>
                  </select>
                </div>

                <div class="mt-2">
                  <span v-if="true" class="text-green-500 font-semibold">Stokta Var</span>
                  <span v-else class="text-red-500 font-semibold">Stokta Yok</span>
                </div>
              </div>
            </div>

          </div>
          <div class="">
            <div
                class="bg-gray-100 relative rounded-lg shadow-md flex flex-col gap-4 p-2 max-w-md mx-auto mt-6 lg:mt-0 lg:fixed w-full lg:h-lvh lg:bottom-0 lg:right-0 lg:border-2 lg:border-gray-200 lg:w-1/3 z-50 justify-center">
              <div class="h-fit bg-white p-6 rounded-lg shadow-2xl shadow-gray-600">
                <h1 class="text-xl lg:text-2xl font-bold text-gray-800 mb-5">Sipariş Özeti</h1>
                <div class="flex flex-col gap-4">
                  <div v-for="item in products"
                       class="flex justify-between text-gray-700 border-b border-gray-300 pb-2">
                    <span>{{ item.title }} Fiyatı</span>
                    <span>{{ item.fiyat }}₺</span>
                  </div>

                  <!--                  <div class="flex justify-between text-gray-700 border-b border-gray-300 pb-2">-->
                  <!--                    <span>Kargo Tutarı</span>-->
                  <!--                    <span>200₺</span>-->
                  <!--                  </div>-->

                  <div class="flex justify-between font-bold text-gray-900">
                    <span>Sipariş Toplam</span>
                    <span>{{ totalPrice }}₺</span>
                  </div>
                  <button
                      class="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg transition duration-300 ease-in-out">
                    Ödeme Yap
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">


import axios from "axios";

definePageMeta({
  layout: 'master'
});


const products = ref([]); // Reaktif bir array tanımla

onMounted(() => {
  axios.get('http://localhost:3000/sepetim/')
      .then(response => {
        products.value = response.data; // Gelen veriyi reaktif olarak ata
      })
      .catch(error => {
        console.error('Hata:', error);
      });
});

const deleteCard = (item) => {
  axios.delete("http://localhost:3000/sepetim/" + item.id)
      .then(() => {
        // Ürünü products listesinden çıkarıyoruz
        products.value = products.value.filter(product => product.id !== item.id);
      })
      .catch(error => {
        console.error("Hata:", error);
      });
};



const totalPrice = computed(() => {
  return products.value.reduce((total, product) => {
    return total + Number(product.fiyat);
  }, 0);
});
</script>
