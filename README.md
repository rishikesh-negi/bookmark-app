An application to manage bookmarks across different browsers and devices, built
using Next.js, Supabase, and Tailwind CSS. Employs Auth.js for authentication
with Google sign-in.

Application link: [Bookmark App](https://getmybookmarks.vercel.app).

## Prerequisites for running the application locally:

- A Supabase backend with the following tables:

```postgres
-- The following is not the code to create the tables; just the definition of the tables and their columns:
users:
  id: UUID; (first delete the existing int8-type "id" column)
  created_at: timestamptz; (exists by default)
  fullName: text;
  email: text;

bookmarks:
  id: int8; (exists by default)
  created_at: timestamptz; (exists by default)
  title: text;
  url: text;
  user: int8 (foreign key to the 'users' table)
```

- A database trigger to add a new user to the public.users table on first login:

```sql
create or replace function public.handle_new_user () returns trigger as $$
begin
  insert into public.users (id, created_at, "fullName", email)
  values (
    new.id,
    new.created_at,
    new.raw_user_meta_data->>'full_name',
    new.email
  );
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;

create trigger on_auth_user_created
after insert on auth.users for each row
execute procedure public.handle_new_user ();
```

- "REPLICA IDENTITY" set to "full" on the "bookmarks" table:

```sql
alter table bookmarks REPLICA IDENTITY full;
```

- Supabase Realtime enabled on the "bookmarks" table.

- A Permissive RLS policy for each type of DB operation on the "bookmarks" table
  with `(auth.uid() = owner)` as the check expression and "authenticated"
  selected as the target role.

- SELECT, UPDATE, and DELETE RLS policies on the "public"."users" table with the
  check expression `(auth.uid() = id)`.

- Google enabled as the auth provider on the Supabase project with the required
  credentials correctly added (Supabase Dashboard -> Authentication -> Sign In /
  Providers).

- [Supabase Auth for Next.js](https://supabase.com/docs/guides/auth/quickstarts/nextjs)

- [Supabase Client for SSR](https://supabase.com/docs/guides/auth/server-side/creating-a-client?queryGroups=framework&framework=nextjs)

- [Google Cloud Console project with a correctly configured client for OAuth](https://console.cloud.google.com/apis/dashboard)

- [Google OAuth with Supabase Auth](https://supabase.com/docs/guides/auth/social-login/auth-google?queryGroups=framework&framework=nextjs)

- In Supabase Dashboard -> Authentication -> URL Configuration, add the
  following:
  - `Site URL` set to `http://localhost:300` during development, and to the
    production URL later during production.
  - Redirect URLs: `http://localhost:3000/auth/callback` and
    `https://<your deployment domain>/auth/callback`. Add **both**.

- Forked and cloned repository to run the project locally

- A .env.local file in the project's root folder containing the following
  environment variables:

```bash
NEXT_PUBLIC_SUPABASE_URL=<Your Supabase project URL>
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=<Supabase project`s publishable key>

AUTH_GOOGLE_ID=<Your Google Dev Console project`s client ID>
SUPABASE_AUTH_EXTERNAL_GOOGLE_CLIENT_SECRET=<Your Google Dev Console project`s client secret>
```

- Install all the packages by running `npm install` in the following command in
  the project's root directory.

## Getting Started

Run the development server:

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

Test the production build of the project by runing:

```bash
npm run prod:pseudo
```

## Challenge/s Faced During Implementation:

### TypeScript Integration:

Using strict TypeScript lengthened the duration of the development process. It
also made development more complex through enforcement of correct types in
components, functions, hooks, server actions, form actions, etc. However, it
made the project less susceptible to production bugs by catching them at compile
time. Although intimidating at first, with some searching and learning, it
became achievable.

### Setting Up Supabase Auth with Google OAuth:

Having implemented OAuth using NextAuth (Auth.js) in my previous projects, I had
no experience setting up Supabase Auth with Google as the provider. But I was
able to implement it by reading the Supabase Auth documentation.

### Forms in Modals:

Creating a wrapper modal component to open forms in a modal was challenging and
required some logical thinking. Figuring out the logic to add the modal to the
document body only when it is opened, and to remove it from the DOM when it is
closed or the page is reloaded was challenging. With iterative development of
the component/feature, I was gradually able to reach the optimal solution, which
involved using the modal state in an effect and exposing the state setter
function as API using a context and a custom useModal hook.

### Synchronizing Bookmarks Across Different Browser Tabs:

Implementing this feature was time-intensive, since I had never done it before.
There were different options, such as using the BroadcastChannel API, local
storage with the "storage" event, etc.

Upon searching and learning, I discovered that using a Supabase Realtime channel
to listen to "postgres_changes" in an effect inside a custom hook that can be
called in a JSX-less client component on the bookmarks page was a
straightforward and optimal solution.

At first it didn't work because the "REPLICA IDENTITY" of the "bookmarks" table
was set to "DEFAULT", which meant that Postgres was only including the primary
key (id column) of the bookmark in the replication events. After setting REPLICA
IDENTITY to "full", it started working in development. Later, I discovered that
even though the bookmarks were synced across browser tabs in development, that
was not the case in production. The tabs that opened later were not updating the
bookmarks after data change.

This was a production bug that occurred because I was not checking for the
existence of a session or an already created channel before creating the channel
in the effect. As a result, either the channel was being dropped due to the
WebSocket not finding an access token, or a new channel was being created for
each new tab, resulting in the tabs not receiving the event from the correct
channel.

To solve this, I created a custom hook to access the session user's data and a
ref to keep a track of an already existing channel. The effect now creates a
channel only when the session exists and no existing channel is found. As a
result, the corresponding WebSockets now get a valid access token, they listen
for events on the same channel, and the bookmarks are synchronized across tabs.

See the **@/app/hooks/useSyncBookmarksState.ts**,
**@/app/\_components/CrossTabBookmarksSync.tsx**, and
**@/app/account/bookmarks/page.tsx** files for implementation.

### Synchronizing Auth Session Across Browser Tabs:

Figuring out how to sync session state across tabs to simultaneously log the
user in or out in all tabs took some time.

After some experimentation and reading, I discovered that handling
authentication on the client and using the `.auth.onAuthStateChange()` method on
the Supabase browser client allows for listening to auth events across all tabs
via a dedicated WebSocket. So, I used a ref to detect session state changes
whenever a "SIGNED_IN" or "SIGNED_OUT" event occurred by comparing the current
ref value with the new auth event, and called `router.refresh()` whenever the
state changed, which made the user log in or out of the application in all tabs
even if the action happened in one tab.

See the **@/app/hooks/useSyncSessionState.ts** file for implementation.
