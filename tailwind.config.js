import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.tsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
                poppins_semibold: 'poppins_semibold',
                poppins_medium: 'poppins_medium',
                poppins_regular: 'poppins_regular',
            },
            colors: {
                gray: "#F0F0F0",
                primary: "#277BF8",
            }
        },
    },

    plugins: [],
};
