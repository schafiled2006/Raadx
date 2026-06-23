# Raad

Raad is a music streaming web app built with vanilla HTML, CSS, and JavaScript on the frontend, with Supabase handling the backend — database, authentication, and file storage.

The idea was to build something close to what a real streaming platform feels like, with a clean dark UI, a music player, artist pages, and an admin panel for uploading tracks directly from the browser.

## Features

- Home page with curated sections: Recommendation, Picked for you, New releases, and Latest Uploads
- Individual pages for artists and albums
- Music player with audio controls
- Admin panel to upload songs and cover images to Supabase Storage
- Songs stored in a PostgreSQL database via Supabase with RLS policies
- User authentication pages (login, signup, profile)

## Tech Stack

- HTML / CSS / JavaScript (no frameworks)
- Supabase (PostgreSQL database, Storage, Auth)
- Node.js with Express for backend routes and validators
- Custom fonts and responsive design for mobile

## Project Structure
├── Views/

│   ├── index.html

│   ├── pages/

│   │   ├── admin.html

│   │   ├── auth.html

│   │   └── music-pages/

│   ├── styles/

│   └── js/

├── controllers/

├── models/

├── routes/

└── validators/
## Getting Started

Clone the repo, create a `.env` file with your Supabase URL and anon key, then run:

```bash
npm install
node index.js
```

Open `Views/index.html` in your browser or serve it through the Express server.

## Database

Songs table requires these columns: `title`, `artist`, `album`, `genre`, `audio_url`, `cover_url`, `created_at`

Storage buckets needed: `music-files` for audio and `covers` for images, both with public read access.
