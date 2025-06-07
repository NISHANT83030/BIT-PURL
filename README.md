# BIT PURL

BIT PURL is a modern, full-stack URL shortener service built with Next.js, Clerk authentication, MongoDB, and a beautiful analytics dashboard.

---

## 🚀 Features

- **Shorten URLs:** Instantly create short links for any URL.
- **User Authentication:** Secure sign-in and sign-up with Clerk.
- **Personal Dashboard:** View all your shortened links in a modern, responsive table.
- **Analytics:**  
  - Click the **Analytics** button for any link to see:
    - Clicks per day (interactive chart)
    - Total clicks
    - Date created
    - Delete link option
- **Loading Indicators:** Smooth SVG loader animations.
- **Responsive UI:** Works great on desktop and mobile.
- **Secure:** Only you can see and manage your links.

---

## 🛠️ Tech Stack

- **Frontend:** Next.js (App Router), React, Tailwind CSS
- **Backend:** Next.js API routes, Mongoose, MongoDB Atlas
- **Auth:** Clerk
- **Charts:** [Recharts](https://recharts.org/)
- **Deployment:** Vercel

---

## 📦 Getting Started

### 1. **Clone the repository**

```sh
git clone https://github.com/yourusername/bitpurl.git
cd bitpurl
```

### 2. **Install dependencies**

```sh
npm install
```

### 3. **Set up environment variables**

Create a `.env.local` file in the root:

```env
MONGODB_URI=your_mongodb_atlas_connection_string
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
```

### 4. **Run locally**

```sh
npm run dev
```

Visit [https://bit-purl-t5u6.vercel.app/]

---

## 🏗️ Project Structure

```
app/
  (root)/(home)/links/         # User dashboard and analytics pages
  api/user-links/              # API routes for user links and analytics
  [shorturl]/                  # Dynamic redirect handler
lib/
  db.ts                        # MongoDB connection
  url.ts                       # Mongoose URL schema
public/
  favicon.png                  # Favicon (link icon)
  loading-circle.svg           # Loader SVG
middleware.ts                  # Clerk route protection
.env.local                     # Your environment variables
```

---

## 🌐 Deployment

1. **Push your code to GitHub.**
2. **Connect your repo to [Vercel](https://vercel.com/).**
3. **Set environment variables in Vercel dashboard.**
4. **Deploy!**

---

## 🖼️ Screenshots

> **Dashboard Screenshot**
> ![image](https://github.com/user-attachments/assets/0aa5511c-2f34-43f5-ad0c-c690a7170faf)

> **Analytics Screenshot**
> 
>![image](https://github.com/user-attachments/assets/06d81f1e-f562-4b03-a7ee-eac3f1c6f351)

---

## 🙋 FAQ

**Q: How do I change the favicon?**  
A: Replace `public/favicon.png` or `public/favicon.svg` with your own icon.

**Q: How do I add more analytics?**  
A: Extend the `clicksByDate` logic in the backend and update the analytics page.

---

## 📄 License

MIT

---

**Made with ❤️ for modern link sharing.**
