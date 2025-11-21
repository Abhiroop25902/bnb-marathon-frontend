# PCOD Nourish – Frontend

A modern React-based web application designed to support nutrition, meal logging, and AI-powered recommendations for
users managing PCOD (Polycystic Ovarian Disorder).

Link for Backend Repo: https://github.com/Abhiroop25902/bnb-marathon-backend

## 🚀 Tech Stack

Frontend Framework: React (Vite + Bun)

UI Library: Material-UI (MUI)

State Management: Zustand

Routing: React Router

Auth & Storage: Firebase Web SDK (Email/Password Auth, Cloud Storage)

API Client: Axios + Zod validation

AI Integration: Uses backend Genkit → Gemini 2.5 Flash for recommendations

## 📦 Features

1. Authentication:
    - Firebase Auth
    - Redirect to onboarding if first login
2. Onboarding
    - Cycle history
    - Dietary preferences
    - Sensitivities
    - Saves via backend PATCH /user
3. Home Dashboard
    - Left: Scheduled meals from backend
    - Right: AI meal recommendations
    - Locking recommendations creates scheduled meals
    - Generate Recommendations button integrated with backend
4. Log Meal
    - Upload meal photo to Firebase Storage
    - Submit meal details to backend via /scheduled
5. Theming
    - Custom MUI theme
    - Soft pastel palette for user-friendly experience
    - Shared card layouts (HomeCard, RecommendationCard)

## Project Structure (Summary)

- src/
- components/
    - NavBar.tsx
    - HomeCard.tsx
    - RecommendationCard.tsx
    - AIRecommend.tsx
    - NewMealLogModal.tsx
- pages/
    - HomePage.tsx
    - OnboardingPage.tsx
    - LoginPage.tsx
    - HistoryPage.tsx
    - ProfilePage.tsx
- helper/
    - GlobalState.ts
- schema/
    - RecommendationSchema.ts
    - ScheduledItemSchema.ts
    - UserPatchSchema.ts
    - LogSchema.ts
- services/
    - firebase.ts
- App.tsx
- main.tsx

## Running the Project

1. Install dependencies (Make sure [bun](https://bun.com/) is installed )
   ```bun install```

2. Start development server
   ```bun run dev```

3. Build
   ```bun run build```

## Backend

This frontend communicates with the backend hosted on Google Cloud
Run and Cloud Build via Trigger: https://github.com/Abhiroop25902/bnb-marathon-backend

- AI Meal Recommendations based on preference using [Genkit](https://genkit.dev/)
- NoSQL Database via [FireStore](https://cloud.google.com/products/firestore)

