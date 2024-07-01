import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    global: {}, // global 변수를 정의하여 AWS SDK에서 발생하는 에러를 방지
  },
  server: {
    port: 5173, // 개발 서버 포트 설정
  },
  resolve: {
    alias: {
      './runtimeConfig': './runtimeConfig.browser', // 브라우저 환경을 위한 runtimeConfig 설정
    },
  },
})
