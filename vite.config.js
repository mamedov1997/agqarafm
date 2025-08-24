import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// IMPORTANT: Replace 'USERNAME' and 'REPO_NAME' below if deploying to GitHub Pages.
// If your repo is named 'agqarafm-video-site', set base to '/agqarafm-video-site/'.
// If using a custom domain or root (user/organization site), set base to '/'
export default defineConfig({
  plugins: [react()],
  base: '/agqarafm-video-site/'
})
