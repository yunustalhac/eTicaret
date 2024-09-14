<template>

  <div :class="['relative', (sideBar || kategories || search || filters) ? '' : '']">

    <div class="rounded-lg flex flex-col gap-10">

      <div v-if="sideBar"
           @click="sideBar=false,kategories=false,filters=false"
           :class="['absolute w-full inset-0 bg-gray-600 bg-opacity-50 backdrop-blur-[1.5px] z-30 blurAnimation pointer-events-none',kategories||filters||sideBar ? 'pointer-events-auto' : 'pointer-events-none']"></div>

      <div :class="[
        'z-50 overflow-auto bg-white w-[75%] lg:w-[40%] border fixed left-0 top-0 h-full rounded-lg transition-transform duration-300 ease-in-out',
        sideBar ? 'translate-x-0' : '-translate-x-full']">

        <div>

          <img @click="toggleSidebar" class="h-7 w-7 m-2 cursor-pointer lg:hidden" src="@/assets/icon/exit.svg"
               alt="Close">

          <div class="flex flex-col">

            <div class="flex justify-evenly border-b p-1 lg:py-5">

              <span @click="openKategories"
                    :class="['cursor-pointer',!filters?'text-ligtPurple border-b-2 border-ligtPurple':'']">Kategori</span>
              <span :class="['cursor-pointer',filters?'text-ligtPurple border-b-2 border-ligtPurple':'']"
                    @click="openFilters">Filtre</span>

            </div>

            <div v-if="filters" class="p-4">

              <div class="flex flex-col gap-4">

                <div class="flex gap-5">

                  <button @click="filterReset"
                          class="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors w-full">
                    İşlemleri Temizle
                  </button>

                  <button @click="sideBar=false ,kategories=false,filters=false"
                          class="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors w-full">
                    kapat
                  </button>

                </div>

                <span class="border rounded-lg">Marka</span>

                <div v-for="marka in Object.keys(markaCounts)" :key="marka">
                  <label :for="marka" class="flex gap-2 hover:text-ligtPurple">
                    <input
                        :id="marka"
                        type="checkbox"
                        v-model="selectedMarka"
                        :value="marka"
                        @change="changeMarka"
                    >
                    <p class="mt-1.5">{{ marka }}
                      <small>:({{ markaCounts[marka] }})</small>
                    </p>
                  </label>
                </div>

                <span class="border rounded-lg">Tür</span>

                <div v-for="tur in Object.keys(turCounts)" :key="tur">
                  <label :for="tur" class="flex gap-2 hover:text-ligtPurple">
                    <input
                        :id="tur"
                        type="checkbox"
                        v-model="selectedTur"
                        :value="tur"
                        @change="changeTur"
                    >
                    <p class="mt-1.5">{{ tur }}
                      <small>:({{ turCounts[tur] }})</small>
                    </p>
                  </label>
                </div>

                <span class="border rounded-lg">Boyut</span>

                <div v-for="boyut in Object.keys(boyutCounts)" :key="boyut">
                  <label :for="boyut" class="flex gap-2 hover:text-ligtPurple">
                    <input
                        :id="boyut"
                        type="checkbox"
                        v-model="selectedBoy"
                        :value="boyut"
                        @change="changeBoy"
                    >
                    <p class="mt-1.5">{{ boyut }}
                      <small>:({{ boyutCounts[boyut] }})</small>
                    </p>
                  </label>
                </div>

                <span class="border rounded-lg">Renk</span>

                <div v-for="renk in Object.keys(renkCounts)" :key="renk">
                  <label :for="renk" class="flex gap-2 hover:text-ligtPurple">
                    <input
                        :id="renk"
                        type="checkbox"
                        v-model="selectedColors"
                        :value="renk"
                        @change="changeRenk"
                    >
                    <p class="mt-1.5">{{ renk }}
                      <small>:({{ renkCounts[renk] }})</small>
                    </p>
                  </label>
                </div>


              </div>

            </div>

            <div v-if="!filters" class="p-4">

              <div class="flex flex-col gap-4">

                <div class="flex gap-5">

                  <button @click="filterReset"
                          class="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors w-full">
                    İşlemleri Temizle
                  </button>

                  <button @click="sideBar=false ,kategories=false,filters=false"
                          class="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors w-full">
                    kapat
                  </button>

                </div>

                <div
                    v-for="category in categories"
                    :key="category.id"
                    @click="kategoriesSelect(category)"
                    :class="{'bg-purple-300 text-black': selectedCategories.includes(category.title),'bg-gray-200': !selectedCategories.includes(category.title)}"
                    class="p-4 rounded cursor-pointer transition-colors duration-300">

                  {{ category.title }}

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

      <div class="ml-auto mr-auto pt-3 w-full">

        <div class="relative w-[90%] ml-auto mr-auto py-3">

          <div v-if="search"
               class="fixed left-0 top-0 w-full z-50 rounded-lg bg-white shadow-lg p-4 flex flex-col gap-4">

            <!-- Search Input -->
            <div class="relative inputAnimation">
              <input
                  v-model="searchValue"
                  @keydown.enter="enterSearch"
                  autofocus
                  class=" text-center bg-gray-200 border rounded-full p-2 pl-10 w-full transition-all duration-300 ease-in-out focus:bg-white focus:border-purple-500 focus:ring-2 focus:ring-purple-300"
                  placeholder="Search"
              />
              <img
                  @click="exitSearch"
                  class="absolute right-4 top-1/2 transform -translate-y-1/2 w-6 h-6 cursor-pointer text-gray-500 hover:text-gray-700 transition-colors"
                  src="@/assets/icon/exit.svg"
                  alt="Exit Icon"
              />
            </div>

            <!-- Clear Button -->
            <button
                @click="filterReset"
                class="w-full bg-purple-600 text-white py-2 px-4 rounded-full hover:bg-purple-700 transition-colors"
            >
              İşlemleri Temizle
            </button>

          </div>

          <!-- Overlay -->
          <div v-if="search" @click="search = false" class="fixed inset-0 bg-gray-400 bg-opacity-50 z-40"></div>

          <div class="relative border-b py-3 flex justify-between items-center px-4 mb-8 lg:z-30">

            <div class="flex gap-3 w-1/4">

              <img @click="toggleSidebar" class="h-7 w-7 cursor-pointer lg:hidden hover:scale-110 hover:grayscale"
                   src="@/assets/icon/menu.svg"
                 alt="Menu">
              <img @click="openSearch" class="lg:hidden h-7 w-7 hover:scale-110  cursor-pointer hover:grayscale"
                   src="@/assets/icon/search.svg"
                 alt="Search">

              <div class="flex gap-1 w-full">

              <span @click="toggleSidebar"
                    :class="['text-sm text-[#374151] hover:text-black cursor-pointer hidden lg:block px-3 py-2 rounded-lg ', kategories ? 'bg-gray-200 hover:text-ligtPurple text-ligtPurple border-b-2 border-ligtPurple z-40' : '']">
                Kategories
              </span>
                <span @click="sideBar=true,filters=true"
                      :class="['text-sm text-[#374151] hover:text-black cursor-pointer hidden lg:block px-3 py-2 rounded-lg ', filters ? 'bg-gray-200 hover:text-ligtPurple text-ligtPurple border-b-2 border-ligtPurple z-40' : 'text-sidebarTextColor']">
                filter
              </span>
                <span
                    :class="['text-sm text-[#374151] hover:text-black cursor-pointer hidden lg:block px-3 py-2 rounded-lg ']">
                Company
              </span>
                <span
                    :class="['text-sm text-[#374151] hover:text-black cursor-pointer hidden lg:block px-3 py-2 rounded-lg ']">
                Stores
              </span>

              </div>

            </div>

            <div class="flex justify-center w-1/3">

              <img class="w-8 cursor-pointer" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600">

            </div>

            <div class="flex justify-end gap-8 w-1/4">

              <div class="flex items-center gap-1 cursor-pointer">

                <img class="w-6 h-4 hidden lg:block" src="@/assets/icon/turkey.svg">
                <span class="text-sm text-[#374151] hidden lg:block">TR</span>

              </div>

              <div class="flex items-center justify-center">

                <img @click="openSearch" class=" hover:scale-110 hidden lg:block h-6 w-6 cursor-pointer hover:grayscale"
                     src="@/assets/icon/search.svg"
                     alt="Search">

              </div>

              <img class=" hover:scale-110 hidden lg:block h-6 w-6 cursor-pointer"
                   src="@/assets/icon/user.svg">

              <nuxt-link class="flex hover:scale-110 gap-2" to="/shoppingCard">
                <img class="h-6 w-6 max-w-none cursor-pointer" src="@/assets/icon/bag.svg" alt="Bag">
                <span class="hidden lg:block">2</span>
            </nuxt-link>

            </div>

          </div>

          <!-- Filtreleme Bölümü -->
          <div v-if="route.query.Marka || route.query.Tur || route.query.Boyut || route.query.Renk"
               class=" bg-white py-4 px-6 rounded-lg shadow-sm flex flex-wrap gap-4 mb-1">
            <!-- Her bir filtre etiketi -->
            <div v-for="(value, key) in route.query" :key="key" class="flex flex-col items-start">
              <!-- Seçenekler -->
              <div class="flex flex-wrap gap-2">
                <div v-for="(item, index) in (Array.isArray(value) ? value : [value])" v-show="kutuGizleme(item)" class="flex items-center bg-purple-100 text-gray-800 py-1 px-3 rounded-lg">
                  <span class="font-semibold text-sm capitalize">{{ item }}</span>
                  <button @click="removeFilter(key, item)" class="ml-2 text-red-500 hover:text-red-700">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            <button @click="filterReset" class="bg-purple-600 text-white py-2 px-4 rounded-lg ml-auto hover:bg-purple-700 transition-colors">Temizle</button>
          </div>


          <NuxtPage class="w-[90%] ml-auto mr-auto py-10 z-10"/>

        </div>

        <div class="w-full pt-16">

          <div class="max-w-7xl mx-auto bg-[#f9fafb] rounded-lg shadow-lg">

            <div class="w-full py-20 px-8">

              <div class="w-full text-gray-700 lg:flex">

                <img class="lg:hidden mb-10 w-9 h-9"
                     src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600">

                <div class="grid grid-cols-2 lg:grid-cols-3 gap-8 w-full text-sm">

                  <div class="flex flex-col lg:flex-row gap-9">

                    <div class="hidden lg:block mx-5">

                      <img class="mb-10 w-9 h-9" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600">

                    </div>

                    <div class="flex flex-col">

                      <h3 class="font-medium text-[#111927]">Ürünler</h3>
                      <nuxt-link class="hover:text-[#4b5563] mt-6 text-[#6b727f]">Çantalar</nuxt-link>
                      <nuxt-link class="hover:text-[#4b5563] mt-6 text-[#6b727f]" to="#">Tişörtler</nuxt-link>
                      <nuxt-link class="hover:text-[#4b5563] mt-6 text-[#6b727f]" to="#">Nesneler</nuxt-link>
                      <nuxt-link class="hover:text-[#4b5563] mt-6 text-[#6b727f]" to="#">Ev Eşyaları</nuxt-link>
                      <nuxt-link class="hover:text-[#4b5563] mt-6 text-[#6b727f]" to="#">Ev Aksesuarları</nuxt-link>

                    </div>

                  </div>

                  <div class="flex flex-col">

                    <h3 class="font-medium text-[#111927]">Müşteri Hizmetleri</h3>
                    <nuxt-link class="hover:text-[#4b5563] mt-6 text-[#6b727f]" to="#">Nakliye</nuxt-link>
                    <nuxt-link class="hover:text-[#4b5563] mt-6 text-[#6b727f]" to="#">İade</nuxt-link>
                    <nuxt-link class="hover:text-[#4b5563] mt-6 text-[#6b727f]" to="#">Garanti</nuxt-link>
                    <nuxt-link class="hover:text-[#4b5563] mt-6 text-[#6b727f]" to="#">Güvenli Ödemeler</nuxt-link>
                    <nuxt-link class="hover:text-[#4b5563] mt-6 text-[#6b727f]" to="#">SSS</nuxt-link>
                    <nuxt-link class="hover:text-[#4b5563] mt-6 text-[#6b727f]" to="#">Bir Mağaza Bulun</nuxt-link>

                  </div>

                  <div class="flex flex-col">

                    <h3 class="font-medium text-[#111927]">Şirket</h3>
                    <nuxt-link class="hover:text-[#4b5563] mt-6 text-[#6b727f]" to="#">Biz Kimiz</nuxt-link>
                    <nuxt-link class="hover:text-[#4b5563] mt-6 text-[#6b727f]" to="#">Sürdürebilirlik</nuxt-link>
                    <nuxt-link class="hover:text-[#4b5563] mt-6 text-[#6b727f]" to="#">Basın</nuxt-link>
                    <nuxt-link class="hover:text-[#4b5563] mt-6 text-[#6b727f]" to="#">Kariyer</nuxt-link>
                    <nuxt-link class="hover:text-[#4b5563] mt-6 text-[#6b727f]" to="#">Şartlar ve Koşullar</nuxt-link>
                    <nuxt-link class="hover:text-[#4b5563] mt-6 text-[#6b727f]" to="#">Gizlilik</nuxt-link>

                  </div>

                </div>

                <div class="flex flex-col w-full mt-12 lg:w-1/3">

                  <span class="w-fit font-medium text-sm">Bültenimize kaydolun</span>
                  <span
                      class="w-full text-[#6b7280] mt-6 text-sm font-[Inter, ui-sans-serif, system-ui, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji]">
The latest deals and savings, sent to your inbox weekly.
            </span>

                  <div class="flex mt-2">

                    <input class="border rounded-lg p-2 w-full" type="text">
                    <button class="ml-4 flex py-2 text-base px-4 bg-ligtPurple text-white rounded-lg whitespace-nowrap">
                      Sign Up
                    </button>

                  </div>

                </div>

              </div>

            </div>

            <div class="text-sm flex justify-center border-t w-[90%] mx-auto py-10 border-[#f3f4f6]">

              <span
                  class="text-[6b727f] mt-6 text-sm font-[Inter, ui-sans-serif, system-ui, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji]">© 2024 Your Company, Inc. Tüm hakları saklıdır.</span>

            </div>

          </div>

        </div>

      </div>

    </div>

  </div>

</template>

<script setup lang="ts">

import {ref} from 'vue';
import {useImagesStore} from "~/stores/imgData.js";

const imagesStore = useImagesStore()
const route = useRoute()
const router = useRouter()

const categories = imagesStore.kategories
const images = imagesStore.images

const sideBar = ref(false);
const search = ref(false);
const kategories = ref(false);
const filters = ref(false);


const selectedMarka = ref([])
const selectedTur = ref([])
const selectedBoy = ref([])
const selectedColors = ref([])
const selectedCategories = ref([])

const searchValue = ref('');
const query = route.query;


if (query.Marka) {
  selectedMarka.value = query.Marka.split(',');
}

if (query.Tur) {
  selectedTur.value = query.Tur.split(',');
}

if (query.Boyut) {
  selectedBoy.value = query.Boyut.split(',');
}

if (query.Renk) {
  selectedColors.value = query.Renk.split(',');
}


const toggleSidebar = () => {
  sideBar.value = !sideBar.value;
  kategories.value = true

  if (sideBar.value === false) {
    kategories.value = false;
    filters.value = false;
  }
};

const openKategories = () => {
  kategories.value = !kategories.value;
  filters.value = false;
};

const openFilters = () => {
  filters.value = true
};

const openSearch = () => {
  search.value = true;
  searchValue.value = ""
  kategories.value = false;
  filters.value = false;
  sideBar.value = false;
  const myInput = document.querySelector('.kapat');
  myInput.onfocus();
};

const exitSearch = () => {
  search.value = false;
};

const enterSearch = () => {
  router.push({query: {search: searchValue.value.toLowerCase()}});
  search.value = false
};

const kategoriesSelect = (category: { title: string }) => {
  // Seçilen kategori zaten seçili mi kontrol edelim
  if (selectedCategories.value.includes(category.title)) {
    // Eğer seçiliyse, onu listeden çıkar
    selectedCategories.value = selectedCategories.value.filter(cat => cat !== category.title);
    router.push({query: {category: undefined}});
  } else {
    // Eğer seçili değilse, listeye ekle
    selectedCategories.value = [category.title]; // Sadece bir kategori seçileceği için listeyi sıfırlıyoruz ve yeni kategori ekliyoruz
    router.push({query: {category: category.title.toLowerCase()}});
  }

  // Sidebar'ı kapat
  sideBar.value = false;
  kategories.value = false;
};

const changeMarka = () => {
  updateQueryParams('Marka', selectedMarka.value);
  console.log(selectedMarka.value, "rwgejgelsşgheşrljgeilsjgş")
};

const changeTur = () => {
  updateQueryParams('Tur', selectedTur.value);
};

const changeBoy = () => {
  updateQueryParams('Boyut', selectedBoy.value);
};

const changeRenk = () => {
  updateQueryParams('Renk', selectedColors.value);
};

const filterReset = () => {
  router.push({query: {}});

  selectedMarka.value = [];
  selectedTur.value = [];
  selectedBoy.value = [];
  selectedColors.value = [];
  selectedCategories.value = [];

  sideBar.value = false;
  kategories.value = false;
  filters.value = false;
  search.value = false;
};

const updateQueryParams = (key: string, value: string | string[]) => {
  // Mevcut query parametrelerini alıyoruz
  const currentQuery = {...router.currentRoute.value.query};

  // Anahtarın var olup olmadığını kontrol edip varsa sil
  if (key in currentQuery) {
    delete currentQuery[key];
  }

  // Yeni query parametresini ekle
  if (Array.isArray(value)) {
    currentQuery[key] = value.join(',');
  } else {
    currentQuery[key] = value;
  }

  // Güncellenmiş query parametreleri ile router.push çağırıyoruz
  router.push({query: currentQuery});
};

const markaCounts = computed(() => {
  const counts: Record<string, number> = {};
  images.forEach(item => {
    const marka = item.filtreleme.marka;
    counts[marka] = (counts[marka] || 0) + 1;
  });
  return counts;
});

const turCounts = computed(() => {
  const counts: Record<string, number> = {};
  images.forEach(item => {
    const secilenDeger = route.query.Marka === undefined || route.query.Marka === "" || route.query.Marka?.includes(item.filtreleme.marka)
    if (secilenDeger) {
      const tur = item.filtreleme.tur;
      counts[tur] = (counts[tur] || 0) + 1;
    } else {
      const tur = item.filtreleme.tur;
      counts[tur] = (counts[tur] || 0);
    }
  });
  return counts;
});

const boyutCounts = computed(() => {
  const counts: Record<string, number> = {};
  images.forEach(item => {

    const secilenDegerMarka = route.query.Marka === undefined || route.query.Marka === "" || route.query.Marka?.includes(item.filtreleme.marka)
    const secilenDegerTur = route.query.Tur === undefined || route.query.Tur === "" || route.query.Tur?.includes(item.filtreleme.tur)
    if (secilenDegerMarka && secilenDegerTur) {
      const boyut = item.filtreleme.boyut;
      counts[boyut] = (counts[boyut] || 0) + 1;
    } else {
      const boyut = item.filtreleme.boyut;
      counts[boyut] = (counts[boyut] || 0);
    }

  });
  return counts;
});

const renkCounts = computed(() => {
  const counts: Record<string, number> = {};
  images.forEach(item => {

    const secilenDegerMarka = route.query.Marka === undefined || route.query.Marka === "" || route.query.Marka?.includes(item.filtreleme.marka)
    const secilenDegerTur = route.query.Tur === undefined || route.query.Tur === "" || route.query.Tur?.includes(item.filtreleme.tur)
    const secilenDegerBoyut = route.query.Boyut === undefined || route.query.Boyut === "" || route.query.Boyut?.includes(item.filtreleme.boyut)
    if (secilenDegerMarka && secilenDegerTur) {
      const renk = item.filtreleme.renk;
      counts[renk] = (counts[renk] || 0) + 1;
    } else {
      const renk = item.filtreleme.renk;
      counts[renk] = (counts[renk] || 0)
    }

  });
  return counts;
});

const removeFilter = (key: string) => {
  // Mevcut query parametrelerini alın
  const query = {...router.currentRoute.value.query};

  // Belirtilen anahtarı kaldırın
  delete query[key];

  // Güncellenmiş query ile URL'yi güncelleyin
  router.push({query});

  setTimeout(() => {
    location.reload()
  }, 300);

}

const kutuGizleme = (item) => {
  if (item.length > 0) {
    return true
  }
}
</script>

<style scoped>
.sidebar {
  transform: translateX(-100%);
  transition: transform 0.3s ease;
}

.sidebar.visible {
  transform: translateX(0);
}

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

@keyframes kategoriesSlideIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}



.inputAnimation {
  transition: background-color 0.3s ease, border-color 0.3s ease;
}

.ani {
  transition: all 0.3s ease;
}

/* Tailwind utility classes can be used for styling */


.kategoriAnimation {
  animation: kategoriesSlideIn 0.5s ease-in-out;
}

.kapat::before {
}
</style>
