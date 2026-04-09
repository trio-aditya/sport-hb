# Sport-HB (React + Laravel)
Aplikasi web untuk menampilkan daftar liga, tim, pertandingan, dan klasemen menggunakan **React (Frontend)** dan **Laravel (Backend API)**.

🚀 Fitur Utama
Menampilkan daftar liga
Menampilkan daftar tim berdasarkan liga
Detail tim (logo, nama, liga)
Previous match (pertandingan terakhir)
Klasemen liga
Authentication (Login & Register)
Favorite tim

🛠️ Teknologi yang Digunakan
Frontend
React JS
React Router DOM
Bootstrap

Backend
Laravel
REST API
HTTP Client (TheSportsDB API)

⚙️ Instalasi & Menjalankan Project
1. Clone Repository
git clone https://github.com/trio-aditya/sport-hb.git
cd sport-hb

🛠️ BACKEND (Laravel)
📥 Install Dependency
cd sport-hb
composer install

⚙️ Setup Environment
Copy file .env:
cp .env.example .env

Edit .env:

SPORTSDB_API_KEY=123
SPORTSDB_BASE_URL=https://www.thesportsdb.com/api/v1/json

🔑 Generate Key
php artisan key:generate

🔑 Migrate Database
php artisan migrate

▶️ Jalankan Server
php artisan serve

Backend berjalan di:
http://127.0.0.1:8000

💻 FRONTEND (React)
📥 Install Dependency
cd frontend
npm install

▶️ Jalankan Aplikasi
npm run dev

Frontend berjalan di:
http://localhost:5173

🔗 Koneksi API
Pastikan file API (axios) mengarah ke:
http://127.0.0.1:8000/api

📌 Catatan
Pastikan backend berjalan sebelum frontend
Gunakan API Key "123" untuk TheSportsDB
Beberapa liga mungkin tidak memiliki data klasemen

📷 Screenshot
<img width="1337" height="890" alt="image" src="https://github.com/user-attachments/assets/03a52aba-fdb8-4632-a66c-015237963590" />
<img width="1920" height="1664" alt="image" src="https://github.com/user-attachments/assets/7db4c461-5d0a-4883-89d2-e273e68e56e1" />
<img width="1920" height="996" alt="image" src="https://github.com/user-attachments/assets/07146868-d19c-40fb-a6bb-9443dc92d946" />
<img width="1920" height="959" alt="image" src="https://github.com/user-attachments/assets/aab77ccb-91ac-42ec-a10d-407f32784393" />
<img width="1920" height="959" alt="image" src="https://github.com/user-attachments/assets/c2e5c022-c713-43fe-bc7b-ce584fdb45c7" />
<img width="1920" height="935" alt="image" src="https://github.com/user-attachments/assets/975599c8-4362-462d-9cec-8035fffba394" />

👨‍💻 Author
Trio Aditya | Software Developer

⭐ Penutup
Project ini dibuat menggunakan Laravel (Backend) dan React (Frontend).
