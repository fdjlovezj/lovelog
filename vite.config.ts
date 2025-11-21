import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, (process as any).cwd(), '');
  return {
    // 重要：这里必须换成你的 GitHub 仓库名，前后都要有斜杠
    // 如果你的仓库是 username.github.io 这种特殊仓库，则改为 base: '/'
    base: '/fdjlovezj/', 
    plugins: [react()],
    define: {
      'process.env.API_KEY': JSON.stringify(env.API_KEY),
    },
  };
});