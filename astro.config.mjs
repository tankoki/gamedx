// astro.config.mjs - 🏆 恢复到静态 SSG 模式和文件系统路由

import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";

// 移除 import node from "@astrojs/node"; 

// https://astro.build/config
export default defineConfig({
  // 移除 output: 'server' 和 adapter: node({...})
  
  integrations: [
    tailwind(),
  ],
  
  // 启用 Astro 内置 I18N 路由支持
  // Astro 将根据 /pages/en/ 文件夹自动生成 /en 路由。
  i18n: {
    defaultLocale: 'zh',
    locales: ['zh', 'en'],
    routing: {
      prefixDefaultLocale: false, 
    },
  },
});