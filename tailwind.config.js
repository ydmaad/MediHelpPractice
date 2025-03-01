/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      // 시스템 컬러
      colors: {
        success: "#00D37B",
        danger: "#F66555",
        bg: "#FBFBFB",
        "gray/50": "#F5F6F7",
        "gray/200": "#E0E2E4",
        "gray/400": "#BCBFC1",
        "gray/600": "#7C7F86",
        "gray/800": "#40444C",
        "gray/1000": "#18181B",
        "primary/50": "#E9F5FE",
        "primary/100": "#BCE1FD",
        "primary/200": "#9CD2FC",
        "primary/300": "#6EBEFB",
        "primary/400": "#52B1FA",
        "primary/500": "#279EF9",
        "primary/600": "#2390E3",
        "primary/700": "#1C70B2",
        "primary/800": "#155189",
        "primary/900": "#103769",
      },
      // 시스템 폰트
      fontFamily: {
        pretendard: ["Pretendard", "sans-serif"],
      },
      // 폰트 사이즈
      fontSize: {
        // Header styles
        "header-32": ["32px", { lineHeight: "135%", fontWeight: "700" }],
        "header-30": ["30px", { lineHeight: "135%", fontWeight: "700" }],
        "header-28": ["28px", { lineHeight: "135%", fontWeight: "700" }],
        "header-24": ["24px", { lineHeight: "135%", fontWeight: "700" }],
        "header-20": ["20px", { lineHeight: "140%", fontWeight: "700" }],
        "header-18": ["18px", { lineHeight: "140%", fontWeight: "700" }],
        "header-16": ["16px", { lineHeight: "140%", fontWeight: "700" }],
        "header-14": ["14px", { lineHeight: "140%", fontWeight: "700" }],

        // Body styles
        "body-18": ["18px", { lineHeight: "140%", fontWeight: "400" }],
        "body-16": ["16px", { lineHeight: "140%", fontWeight: "400" }],
        "body-14": ["14px", { lineHeight: "140%", fontWeight: "400" }],
        "body-12": ["12px", { lineHeight: "140%", fontWeight: "400" }],
        "body-10": ["10px", { lineHeight: "140%", fontWeight: "400" }],
      },
      // 자간
      letterSpacing: {
        tight: "-0.015em",
      },
      // 반응형 브레이크 포인트
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
    },
  },
  plugins: [],
};
