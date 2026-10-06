# Freznel  - Frontend Assessment

Hi! This is my submission for the Freznel frontend developer assessment. I have built a web application inspired by Steam's design, using real movie data.

## Features I Added
- **Authentication:** Used Firebase for Email/Password login and signup.
- **Movie Data:** Connected with TMDB API to fetch popular movies and new releases.
- **Live Search:** Added a search bar that gives live movie suggestions while typing.
- **Wishlist:** Users can add/remove movies to their Wishlist. Data is saved in `localStorage` so it doesn't get lost on refresh.
- **Age Verification:** Added a custom Steam-like age check modal before users can see certain pages.
- **Offline Support (PWA):** Configured a Service Worker (`sw.js`) and `manifest.json` so the app can be installed and load basic pages even without internet.
- **Fully Responsive:** Works perfectly on mobile, tablet, and desktop screens.

## Tech Stack Used
- React.js (Vite)
- Tailwind CSS for styling
- Firebase Authentication
- TMDB API
- Vercel for hosting

## How to Run Locally
1. Clone this repository
2. Run `npm install` to download all packages
3. Run `npm run dev` to start the local server
4. Open `http://localhost:5173` in your browser

---
*Created as part of the Freznel Assessment.*
