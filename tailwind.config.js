import type {Config} from 'tailwindcss'

const config: Config = {
    content: [
    ],
    theme: {
        extend: {
            colors: { // 'color' yerine 'colors' kullanılmalı
                "navbarTextColor": "#2A3140",
                "iconColor": "#9DA3AE",
                "textGray": "#6A717E",
                "bgPhoto":" #FAFAFA",
                "ligtPurple": "#4E46DC",
            },
        },
    },
    plugins: [],
}

export default config
