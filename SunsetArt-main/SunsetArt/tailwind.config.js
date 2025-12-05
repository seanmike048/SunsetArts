/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                sunset: {
                    peach: '#FFDAB9',
                    blush: '#FFB6C1',
                    lavender: '#E6E6FA',
                    orange: '#FFCC99',
                    coral: '#FF9B8A',
                },
                light: {
                    bg: '#FDF7EF',
                    card: '#FFFCF9',
                    text: '#201611',
                    textSecondary: '#5A4A42',
                    border: '#E8DDD0',
                },
                dark: {
                    bg: '#17110F',
                    card: '#231814',
                    text: '#F6ECE2',
                    textSecondary: '#C9B9AD',
                    border: '#3A2F2A',
                }
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
            },
            animation: {
                'fade-in': 'fadeIn 0.5s ease-out',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                }
            }
        },
    },
    plugins: [],
}
