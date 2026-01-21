<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1ioEjtTuhUc3Q87-g9Z_x6T8X5tuBwc4q

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set environment values in [.env.local](.env.local):
   - `VITE_FIREBASE_*` values
   - `VITE_ADMIN_EMAIL`
   - `VITE_CLOUDINARY_CLOUD_NAME`
   - `VITE_CLOUDINARY_UPLOAD_PRESET` (if using unsigned uploads)
   - `VITE_USE_SERVER_UPLOAD=true` (to force server-side uploads)
   - `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` (server-side uploads)
3. Run the app:
   `npm run dev`
