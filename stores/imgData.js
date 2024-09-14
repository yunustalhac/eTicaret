import {defineStore} from 'pinia';

export const useImagesStore = defineStore('imagesStore', {
    state: () => ({
        images: [{
            id: 1,
            img: 'https://tailwindui.com/img/ecommerce-images/order-history-page-05-product-01.jpg',
            money: "100",
            title: "Kick Carrier",
            description: "on numara mal",
            kategori: "Ayakkabı Çantaları",
            kategoriResmi: "https://tailwindui.com/img/ecommerce-images/order-history-page-05-product-01.jpg",
            color: "black",
            filtreleme: {
                marka: "Adidas", tur: "ayakkabı çantası", boyut: "md", renk: "siyah",
            }
        }, {
            id: 2,
            img: 'https://tailwindui.com/img/ecommerce-images/order-history-page-05-product-02.jpg',
            money: "200",
            title: "Micro Backpack",
            description: "on numara mal",
            kategori: "El Çantaları",
            kategoriResmi: "https://tailwindui.com/img/ecommerce-images/order-history-page-05-product-01.jpg",
            color: "gray",
            filtreleme: {
                marka: "Adidas", tur: "el çantası", boyut: "sm", renk: "gri",
            }
        }, {
            id: 3,
            img: 'https://tailwindui.com/img/ecommerce-images/order-history-page-05-product-03.jpg',
            money: "250",
            title: "Drawtop Canister",
            description: "on numara mal",
            kategori: "Sırt Çantaları",
            kategoriResmi: "https://tailwindui.com/img/ecommerce-images/order-history-page-05-product-01.jpg",
            color: "darkorange",
            filtreleme: {
                marka: "Adidas", tur: "askılı çanta", boyut: "md", renk: "turuncu",
            }
        }, {
            id: 4,
            img: 'https://tailwindui.com/img/ecommerce-images/order-history-page-05-product-04.jpg',
            money: "300",
            title: "High Wall Tote",
            description: "on numara mal",
            kategori: "El Çantaları",
            kategoriResmi: "https://tailwindui.com/img/ecommerce-images/order-history-page-05-product-01.jpg",
            color: "gray",
            filtreleme: {
                marka: "Adidas", tur: "bez çanta", boyut: "lg", renk: "gri",
            }
        }, {
            id: 5,
            img: 'https://tailwindui.com/img/ecommerce-images/order-history-page-05-product-05.jpg',
            money: "450",
            title: "Laptop Sleeve",
            description: "on numara mal",
            kategori: "El Çantaları",
            kategoriResmi: "https://tailwindui.com/img/ecommerce-images/order-history-page-05-product-01.jpg",
            color: "white",
            filtreleme: {
                marka: "LCW", tur: "laptop çantası", boyut: "sm", renk: "beyaz",
            }
        }, {
            id: 6,
            img: 'https://tailwindui.com/img/ecommerce-images/order-history-page-05-product-06.jpg',
            money: "350",
            title: "Shoulder Sling",
            description: "on numara mal",
            kategori: "Bel Çantaları",
            kategoriResmi: "https://tailwindui.com/img/ecommerce-images/order-history-page-05-product-01.jpg",
            color: "gray",
            filtreleme: {
                marka: "LCW", tur: "bel çantası", boyut: "sm", renk: "gri",
            }
        }, {
            id: 7,
            img: 'https://tailwindui.com/img/ecommerce-images/order-history-page-05-product-07.jpg',
            money: "800",
            title: "Crushed Carrier",
            description: "on numara mal",
            kategori: "Sırt Çantaları",
            kategoriResmi: "https://tailwindui.com/img/ecommerce-images/order-history-page-05-product-01.jpg",
            color: "gray",
            filtreleme: {
                marka: "LCW", tur: "sırt çantası", boyut: "XL", renk: "gri",
            }
        }, {
            id: 8,
            img: 'https://tailwindui.com/img/ecommerce-images/order-history-page-05-product-08.jpg',
            money: "90",
            title: "Wrap Clutch",
            description: "on numara mal",
            kategori: "El Çantaları",
            kategoriResmi: "https://tailwindui.com/img/ecommerce-images/order-history-page-05-product-01.jpg",
            color: "lightgray",
            filtreleme: {
                marka: "LCW", tur: "cüzdan çanta", boyut: "sm", renk: "gri",
            }
        },


        ], kategories: [{
            id: 1, title: "El Çantaları", selected: false,
        }, {
            id: 2, title: "Ayakkabı Çantaları", selected: false,
        }, {
            id: 3, title: "Sırt Çantaları", selected: false,
        }, {
            id: 4, title: "Bel Çantaları", selected: false,
        },]
    }),
});
