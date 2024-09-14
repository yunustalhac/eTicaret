<template>

  <div v-if="urunBulunamdi" class="w-full flex justify-center">
    <h1 class="text-white bg-red-600 w-fit text-2xl text-center rounded-lg py-2 px-4">Aradığınız Ürün Bulunamadı..</h1>
  </div>

  <transition name="fade" @before-enter="beforeEnter" @enter="enter" @leave="leave">

    <div v-if="details"
         class="fixed inset-0 bg-gray-600 bg-opacity-50 backdrop-blur-[1.5px] z-40 pointer-events-none">
    </div>

  </transition>

  <transition name="slide">

    <div v-if="details"
         class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">

      <div class="relative max-w-md w-full bg-white rounded-lg shadow-xl overflow-hidden mx-4 lg:max-w-2xl lg:flex">

        <button class="absolute right-4 top-4 text-gray-500 hover:text-gray-700 focus:outline-none"
                @click="closeDetails">
          <img src="@/assets/icon/exit.svg" alt="Close" class="w-6 h-6">
        </button>

        <div class="w-full lg:w-1/2 p-4">

          <img :src="selectedImage.img"
               class="object-cover w-full h-64 lg:h-auto rounded-lg shadow-md">

        </div>

        <div class="w-full lg:w-1/2 p-4 flex flex-col justify-between">

          <div class="flex flex-col gap-4">

            <h2 class="text-2xl font-bold text-gray-800">{{ selectedImage.title }}</h2>
            <p class="text-xl text-gray-700 font-medium">{{ selectedImage.money }}</p>
            <p class="text-gray-600">{{ selectedImage.description }}</p>

            <div class="border-t border-gray-200 py-2">
              <div class="flex justify-between text-gray-600 font-semibold">
                <span>Marka: {{ selectedImage.marka }}</span>
                <span>Tür: {{ selectedImage.tur }}</span>
              </div>
              <div class="flex justify-between text-gray-600 font-semibold mt-2">
                <span>Boyut: {{ selectedImage.boyut }}</span>
                <span>Renk: {{ selectedImage.renk }}</span>
              </div>
            </div>

            <div class="flex gap-4 mt-4">
              <input type="radio" id="color1" name="color" class="hidden peer" />
              <label for="color1"
                     :style="{ backgroundColor: selectedImage.color }"
                     class="shadow-sm shadow-black w-8 h-8 rounded-full cursor-pointer flex items-center justify-center peer-checked:ring-2 peer-checked:ring-blue-500 transition-all">
              </label>

            </div>

          </div>


          <button
              v-if="!sepetVarmi()"
              @click="sepeteEkle()"
              class="bg-purple-600 text-white py-2 px-4 rounded-lg w-full mt-4 hover:bg-purple-700 transition-colors">
            Sepete Ekle
          </button>

          <button
              v-if="sepetVarmi()"
              @click="sepettenCikar()"
              class="bg-red-600 text-white py-2 px-4 rounded-lg w-full mt-4 hover:bg-red-700 transition-colors">
            Sepetten Çıkar
          </button>

        </div>

      </div>

    </div>

  </transition>

  <div class="flex w-full">

    <div v-if="!urunBulunamdi" class="flex w-full">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full gap-7 gap-y-10">
        <div
            v-for="(item, index) in filteredImages"
            :key="index"
            class="flex flex-col cursor-pointer justify-between"
            @click="selectImage(item)"
        >
          <div class="flex-">
            <div class="group transition-all duration-150 rounded-lg">
              <div class="">
                <img
                    :src="item.img"
                    class="object-cover rounded-lg transition-all duration-150 w-full group-hover:opacity-70 group-hover:bg-white"
                >
              </div>
              <div class="flex flex-col mt-4">
                <div class="flex flex-col justify-between gap-1">
                  <span class="text-gray-500 text-sm">{{ item.title }}</span>
                  <span class="text-xl font-normal">{{ item.money }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>

  <button class="z-50 absolute" @click="sepetVarmi">tıkla</button>

</template>
<script setup lang="ts">
import {ref, onMounted} from 'vue';
import {useImagesStore} from "~/stores/imgData";
import axios from "axios";


const route = useRoute();
const imageStore = useImagesStore()
const images = imageStore.images


const details = ref(false);

const urunBulunamdi = ref(false)

const openDetails = () => {
  details.value = true
}

const closeDetails = () => {
  details.value = false;
};

const selectedImage = ref({
  id: null,
  img: null,
  title: null,
  money: null,
  description: null,
  color: null,
  marka: null,
  tur: null,
  boyut: null,
  renk: null,
});

const selectImage = (item: any) => {
  selectedImage.value = {
    id: null,
    img: null,
    title: null,
    money: null,
    description: null,
    color: null,
  };

  requestAnimationFrame(() => {
    selectedImage.value = {
      id: item.id,
      img: item.img,
      title: item.title,
      money: item.money,
      color: item.color,
      description: item.description,
      marka: item.filtreleme.marka,
      tur: item.filtreleme.tur,
      boyut: item.filtreleme.boyut,
      renk: item.filtreleme.renk,
    };
    details.value = true; // Detay sayfasını açıyoruz
  });
};

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

const filtre = (item: any) => {
  return (
      (route.query.category === undefined || item.kategori.toLowerCase().includes(route.query.category.toLowerCase())) &&
      (route.query.search === undefined || item.title.toLowerCase().includes(route.query.search.toLowerCase())) &&
      (route.query.Marka === undefined || route.query.Marka === "" || route.query.Marka?.includes(item.filtreleme.marka)) &&
      (route.query.Tur === undefined || route.query.Tur === "" || route.query.Tur?.includes(item.filtreleme.tur)) &&
      (route.query.Boyut === undefined || route.query.Boyut === "" || route.query.Boyut?.includes(item.filtreleme.boyut)) &&
      (route.query.Renk === undefined || route.query.Renk === "" || route.query.Renk?.includes(item.filtreleme.renk))
  )

}


const filteredImages = computed(() => images.filter(filtre));

// watch route.query to update urunBulunamdi
watch(() => route.query, () => {
  urunBulunamdi.value = filteredImages.value.length === 0;
}, {immediate: true});
definePageMeta({
  layout: 'default'
});


const sepeteEkle = () => {
  axios.post("http://localhost:3000/sepetim/", {
    id: selectedImage.value.id,
    title: selectedImage.value.title,
    img: selectedImage.value.img,
    fiyat: selectedImage.value.money,
    boyut: selectedImage.value.boyut,
    color: selectedImage.value.color,
    renk: selectedImage.value.renk,
  })

  details.value = false;

  console.log(data.value.map(item => item.title), "data.id")
  console.log(selectedImage.value.id, "selectedImage.id")


  setTimeout(() => {
    location.reload()
  }, 300)
};


const sepettenCikar = () => {
  axios.delete("http://localhost:3000/sepetim/" + selectedImage.value.id)
      .then(() => {
        // Silinen ürünü products listesinden çıkar
        data.value = data.value.filter(product => product.id !== selectedImage.value.id);

        // Detayları kapat
        details.value = false;
      })
      .catch(error => {
        console.error("Hata:", error);
      });
};

const data = ref([])

onMounted(() => {
  axios.get('http://localhost:3000/sepetim/')
      .then(response => {
        data.value = response.data; // Gelen veriyi reaktif olarak ata
      })
      .catch(error => {
        console.error('Hata:', error);
      });
});


const tik = () => {
  console.log(data.value.map(item => item.id) !== selectedImage.value.id)
}

const sepetVarmi = () => {
  return data.value.map(item => item.id).includes(selectedImage.value.id)
}




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
