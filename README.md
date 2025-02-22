# 🎬 Cinebuster  

Cinebuster is a sleek and modern single-page application built with **Next.js**, offering users the latest updates in **film, television, and animation**. It integrates with **The Movie Database (TMDb)** to provide comprehensive movie details, ratings, reviews, and more.  

## 🚀 Features  

- 📺 **Browse Movies & TV Shows** – Discover the latest films, series, and animated projects.  
- ⭐ **User Ratings & Reviews** – Read and leave reviews and ratings for your favorite media.  
- 🔍 **Advanced Search & Filtering** – Find content easily using genre-based and keyword search.  
- 🛡️ **Authentication & User Profiles** – Secure authentication with NextAuth, enabling personalized watchlists and reviews.  
- 📊 **Drizzle ORM & Neon Database** – Efficient and scalable PostgreSQL database management.  
- 🎨 **Modern UI** – Built with Tailwind CSS and ShadCN for a sleek, responsive design.  

## 🏗️ Tech Stack  

- **Frontend**: [Next.js](https://nextjs.org/), [TypeScript](https://www.typescriptlang.org/), [ShadCN](https://ui.shadcn.com/), [Tailwind CSS](https://tailwindcss.com/)  
- **Backend & Database**: [Drizzle ORM](https://orm.drizzle.team/), [Neon PostgreSQL](https://neon.tech/)  
- **Authentication**: [NextAuth.js](https://next-auth.js.org/)  
- **External API**: [The Movie Database (TMDb)](https://www.themoviedb.org/)  

## 🛠️ Installation  

### 1️⃣ Clone the Repository  

```sh
git clone https://github.com/your-username/cinebuster.git
cd cinebuster
```

### 2️⃣ Install Dependencies  

```sh
pnpm install
# OR
npm install
```

### 3️⃣ Set Up Environment Variables  

Create a `.env.local` file in the root directory and configure the following variables:  

```env
# NextAuth
NEXTAUTH_SECRET=your_secret_key
NEXTAUTH_URL=http://localhost:3000

# Database (Neon)
DATABASE_URL=your_neon_postgres_url

# TMDb API
TMDB_API_KEY=your_tmdb_api_key
```

### 4️⃣ Run the Development Server  

```sh
pnpm dev
# OR
npm run dev
```

The app will be available at **[http://localhost:3000](http://localhost:3000)** 🚀  

## 🗃️ Database Migrations  

Cinebuster uses **Drizzle ORM** for schema management. To generate and apply migrations, use:  

```sh
pnpm drizzle:generate
pnpm drizzle:migrate
```

## 📌 Roadmap  

- [ ] Implement watchlists & favorites  
- [ ] Add a recommendation system based on user preferences  
- [ ] Enhance UI with animations and dark mode  
- [ ] Introduce real-time discussions on trending movies & shows  

## 🤝 Contributing  

Contributions are welcome! To contribute:  

1. Fork the repository  
2. Create a new branch (`feature/your-feature`)  
3. Commit your changes (`git commit -m "Added new feature"`)  
4. Push to the branch (`git push origin feature/your-feature`)  
5. Open a Pull Request  

## 📜 License  

This project is licensed under the **MIT License**.  

---

💡 *Cinebuster – Your ultimate hub for movies, TV, and animation!* 🎥🍿  