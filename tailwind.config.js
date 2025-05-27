/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}"
    ],
    theme: {
        extend: {
            keyframes: {
                typing: {
                    from: { width: "0" },
                    to: { width: "100%" }
                },
                blink: {
                    "50%": { borderColor: "transparent" },
                    "100%": { borderColor: "#e6d769" }
                }
            },
            animation: {
                typing: "typing 3s steps(30, end) forwards",
                blink: "blink 0.8s step-end infinite"
            }
        }
    },
    plugins: [require("daisyui")]
}
