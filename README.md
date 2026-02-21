An application to manage bookmarks across different browsers and devices, built
using Next.js, Supabase, and Tailwind CSS. Employs Auth.js for authentication
with Google sign-in.

Application link: [Bookmark App](https://getmybookmarks.vercel.app).

## Prerequisites for running the application locally:

- A Supabase backend with the following tables (assume each table has an 'id'
  and 'created_at' column by default):

```javascript
users: {
  fullName: text;
  email: text;
}

bookmarks: {
  title: text;
  url: text;
  user: int8 (foreign key to the 'users' table)
}
```

- Forked and cloned repository to run locally

- A .env.local file in the project's root folder containing the following
  environment variables:

```bash
SUPABASE_URL=<Your Supabase project URL>
SUPABASE_PUBLISHABLE_KEY=<Your Supabase project's publishable public key>

NEXTAUTH_URL=http://localhost:3000 (to be changed to the URL of the deployed project on Vercel)
NEXTAUTH_SECRET=<Any secure string that can serve as a secret>

AUTH_GOOGLE_ID=<Your Google Dev Console project client ID>
AUTH_GOOGLE_SECRET=<Your Google Dev Console project client secret>
```

- A Google Developer Console project with correct configurations to use Google
  as the auth provider

- Install all the packages by running the following command in the project root
  directory:

```bash
npm install
```

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the
result.

You can start editing the page by modifying `app/page.tsx`. The page
auto-updates as you edit the file.

This project uses
[`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts)
to automatically optimize and load [Geist](https://vercel.com/font), a new font
family for Vercel.

Test the production build of the project by runing:

```bash
npm run prod:pseudo
```

## Challenge/s Faced:

### TypeScript Integration:

Using strict TypeScript lengthened the duration of the development process. It
also made development more complex by enforcing the use of correct types in
components, functions, hooks, etc. Although intimidating at first, with some
searching and learning, it became achievable.

### Setting Up Google sign-in Using Auth.js:

Auth.js was a no-brainer choice for implementing authentication with Google
sign-in. However, because Auth.js was previously known as NextAuth, then
acquired by BetterAuth, who turned it into Auth.js, it has different versions of
documentation. Figuring out the ideal version to use and the documentation to
refer was messy. Learning about how to use Google Developer Console to create an
auth provider client for Google sign-in was another challenge. But I was able to
figure everything out by reading about how to set up a NextAuth/BetterAuth
authentication flow with Google.

### Flexible Components:

Building flexible components with the required props combinations with
TypeScript was challenging. I used discriminated unions with type narrowing to
implement truly flexible components. Example: A button component that can either
be a <button> or a Next.js <Link /> component depending on the passed props.

### Forms in Modals:

Creating a wrapper modal component to open forms in a modal was challenging and
required a lot of logical thinking. Figuring out the logic to add the modal to
the body only when it is opened and to remove the modal from the DOM when the
page is reloaded while the modal is open was challenging. With iterative
development of the component/feature, I was gradually able to reach the optimal
solution/logic.

### Synchronizing Bookmarks' Data Across Different Browser Tabs:

Implementing this feature took some time since I had never done it before. There
were different options such as using the BroadcastChannel API, local storage
with the "storage" event, etc. However, upon searching and learning, I realized
that using Supabase realtime updates with a Supabase channel in an effect inside
a custom hook that can be called in a top-level, stable client component in the
tree was a straightforward and optimal solution (See
/app/hooks/useSyncBookmarks.ts, /app/\_components/CrossTabSessionSync.tsx, and
/app/layout.tsx for implementation).

### Synchronizing Auth Session Across Browser Tabs:

This took some time to figure out. I searched the NextAuth (Auth.js)
documentation for answers but wasn't convinced with the solutions provided by
the library as they required me to turn huge chunks of the app into client
components, mitigating the benefits of partial pre-rendering, SSR, SSG, etc. But
again, with some searching and learning I was able to implement it using the
BroadcastChannel API in a pair of top-level client components wrapped with an
Auth.js SessionProvider.
