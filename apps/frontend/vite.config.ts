import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import typescript from 'vite-plugin-typescript';

const allRoutes = ["/scelta-anno", "/iniziativa-scaduta", "/esito"]

export default defineConfig({
  plugins: [
    react(),
    typescript(),
    {
      name: 'rewrite',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url && allRoutes.includes(req.url)) {
            res.writeHead(301, { Location: '/' });
            res.end();
            return
          } 
          next();
        });
      },
    },
    
  ],
})
