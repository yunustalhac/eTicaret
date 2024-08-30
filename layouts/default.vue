<template>
  <div class="p-2">
    <div class="border h-full rounded-lg p-3 flex flex-col gap-10">
      <!-- Overlay Katmanı -->
      <div v-if="sideBar||search"
           class="fixed inset-0 bg-gray-600 bg-opacity-50 backdrop-blur-[1.5px] z-10 blurAnimation"></div>

      <!-- Sidebar -->
      <div :class="[
      'z-50 bg-white w-[75%] border fixed left-0 top-0 h-screen rounded-lg transition-transform duration-300 ease-in-out',
      sideBar ? 'translate-x-0' : '-translate-x-full lg:hidden'
    ]">
        <div class="">
          <img @click="toggleSidebar" class="h-7 w-7 m-2 cursor-pointer" src="@/assets/icon/exit.svg" alt="Close">
          <div class="flex flex-col">
            <div class="flex justify-evenly border-b lg:border-0 p-1">
              <span class="text-sidebarTextColor">Erkek</span>
              <span>Kadın</span>
            </div>


            <div class="flex flex-wrap gap-2 w-full p-2">
              <div v-for="i in 4" :key="i" class="flex flex-col w-[48%]">
                <div class="w-full">
                  <img class="rounded-lg" src="https://tailwindui.com/img/ecommerce-images/mega-menu-01-men-category-01.jpg">
                </div>
                <div class="flex flex-col">
                  <span>Kıyafetler</span>
                  <small class="text-gray-500">Alışverişe Git</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--search-->

      <div class="relative w-[90%] ml-auto mr-auto py-3 ">

        <div v-if="search" class="absolute w-full bg-black z-50 rounded-full">
          <input class="bg-gray-200 border rounded-full p-2 w-full pl-10 inputAnimation" placeholder="Search"/>
          <img
              @click="exitSearch"
              class="absolute right-2 top-1/2 transform -translate-y-1/2 w-6 h-6 cursor-pointer"
              src="@/assets/icon/exit.svg"
              alt="Exit Icon"
          />
        </div>

        <!--dropDown-->




        <!-- İçerik -->

        <div class="flex justify-between flex-row relative border-b pb-5">
          <div class="flex gap-2">
            <img @click="toggleSidebar" class="h-7 w-7 cursor-pointer lg:hidden" src="@/assets/icon/menu.svg"
                 alt="Menu">
            <img @click="openSearch" class="lg:hidden h-7 w-7 cursor-pointer" src="@/assets/icon/search.svg"
                 alt="Search">

            <div class="flex gap-5">
              <span class="text-sidebarTextColor hidden lg:block hover:border-b-2">Kategoriler</span>
              <span class="text-sidebarTextColor hidden lg:block hover:border-b-2">Filtre</span>
              <!--              <span class="text-sidebarTextColor hidden lg:block hover:border-b-2">Şirket</span>-->
              <!--              <span class="text-sidebarTextColor hidden lg:block hover:border-b-2">Mağazalar</span>-->
            </div>

          </div>


          <div class="flex gap-2">
            <span class="hidden lg:block">TR</span>
            <img @click="openSearch" class="hidden lg:block h-7 w-7 cursor-pointer" src="@/assets/icon/search.svg"
                 alt="Search">
            <!--            <img class="h-7 w-7 cursor-pointer" src="@/assets/icon/user.svg" alt="User">-->
            <nuxt-link class="" to="/shoppingCard">
              <img class="h-7 w-7 max-w-none cursor-pointer" src="@/assets/icon/bag.svg" alt="Bag">
            </nuxt-link>
            <span class="hidden lg:block">0</span>
          </div>
        </div>
      </div>
      <NuxtPage class=" w-[90%] ml-auto mr-auto py-10"/>


      <div class="w-full">

        <div class="flex ml-auto mr-auto">

          <div class="bg-gray-50 w-full py-5 rounded-lg">
            <div class="w-[90%] ml-auto mr-auto text-gray-500">
              <div class="flex flex-wrap justify-between gap-8">
                <div class="flex flex-col">
                  <h3 class="font-bold">Ürünler</h3>
                  <span>Çantalar</span>
                  <span>Tişörtler</span>
                  <span>Nesneler</span>
                  <span>Ev Eşyaları</span>
                  <span>Ev Aksesuarları</span>
                </div>
                <div class="flex flex-col">
                  <h3 class="font-bold">Müşteri Hizmetleri</h3>
                  <span>Nakliye</span>
                  <span>İade</span>
                  <span>Garanti</span>
                  <span>Güvenli Ödemeler</span>
                  <span>SSS</span>
                  <span>Bir Mağaza Bulun</span>
                </div>

                <div class="flex flex-col">
                  <h3 class="font-bold">Şirket</h3>
                  <span>Biz Kimiz</span>
                  <span>Sürdürebilirlik</span>
                  <span>Basmak</span>
                  <span>Kariyer</span>
                  <span>Şartlar Ve Koşullar</span>
                  <span>Mahremiyet</span>
                </div>

              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import {ref} from 'vue';

const sideBar = ref(false);
const toggleSidebar = () => {
  sideBar.value = !sideBar.value;
};

const search = ref(false)
const openSearch = () => {
  search.value = !search.value
}

const exitSearch = () => {
  search.value = false
}


</script>

<style scoped>
/* Sidebar başlangıç durumu ve animasyon */
.sidebar {
  transform: translateX(-100%);
  transition: transform 0.3s ease;
}

/* Sidebar görünür olduğunda */
.sidebar.visible {
  transform: translateX(0);
}


/* Arama kutusunun açılma animasyonu */
@keyframes slideIn {
  from {
    transform: scaleX(0);
    opacity: 0;
  }
  to {
    transform: scaleX(1);
    opacity: 1;
  }
}

/* Arama kutusunun kapanma animasyonu */
@keyframes slideOut {
  from {
    transform: scaleX(1);
    opacity: 1;
  }
  to {
    transform: scaleX(0);
    opacity: 0;
  }
}

.inputAnimation {
  display: inline-block;
  animation: slideIn 0.5s ease-in-out;
}

/* Kapanma animasyonu */
.inputAnimation.closed {
  animation: slideOut 0.5s ease-in-out;
}

</style>
