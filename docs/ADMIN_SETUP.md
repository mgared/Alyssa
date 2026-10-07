# Admin setup (Supabase)

The `/admin` page lets Alyssa sign in and manage the portfolio, home slideshow, About page and contact details. Logins, photos and content are stored in [Supabase](https://supabase.com), which has a free plan that covers a site this size.

Until steps 1–6 are done, `/admin` runs in **demo mode**: any email and password signs in, and nothing is saved.

## 1. Create the project

1. Sign up at supabase.com, ideally using Alyssa's email so she owns the account.
2. Create a new project. Pick a region near Boston (US East) and save the database password somewhere safe.

## 2. Create the tables, photo storage and access rules

1. In the dashboard, open **SQL Editor**, then **New query**.
2. Paste in all of [`supabase/schema.sql`](../supabase/schema.sql) and click **Run**.

This creates the `projects` and `site_content` tables, a public `portfolio` photo bucket, and rules that let anyone *view* the site but only admins *change* it. The script is safe to run again.

## 3. Turn off public sign-ups

**Authentication → Sign In / Providers**: turn off **Allow new users to sign up**. Only accounts you create by hand can log in.

## 4. Create Alyssa's login

1. **Authentication → Users → Add user → Create new user**.
2. Enter her email and a temporary password, and tick **Auto Confirm User**.
3. Back in the **SQL Editor**, make that account an admin (use her real email):

   ```sql
   insert into public.admins (user_id)
   select id from auth.users where email = 'alyssa@designbylabillois.com';
   ```

Accounts that are not in the `admins` table cannot change anything, even if they can sign in.

## 5. Allow password-reset emails to return to the site

**Authentication → URL Configuration**:

- **Site URL**: the live address, for example `https://designbylabillois.com`
- **Redirect URLs**: add `https://designbylabillois.com/admin` (plus any preview address, such as `https://your-site.netlify.app/admin`)

## 6. Connect the website

In **Project Settings → API** (or the **Connect** button), copy the **Project URL** and the **publishable** (also called **anon**) key. Then add them as environment variables on the host (Netlify: *Site configuration → Environment variables*; Vercel: *Settings → Environment Variables*):

```
VITE_SUPABASE_URL=https://xxxx.supabase.co
VITE_SUPABASE_KEY=<publishable key>
```

Redeploy the site. For local development, put the same two lines in `.env.local`.

> Never use the **secret** / **service_role** key in the website. It bypasses all access rules.

## 7. First sign-in

Alyssa goes to `/admin`, signs in with the temporary password, and can choose her own through **Forgot your password?**

The live site starts empty because nothing is in the database yet. The placeholder projects only appear in demo mode. Once she adds her projects, slideshow photos and bio, the site shows them right away; there is no rebuild or redeploy.

## Notes

- Photos are resized in the browser to at most 2400 px on the long side before upload, so phone and camera files stay fast to load.
- When she removes a photo and saves, the file is deleted from storage too.
- Free Supabase projects pause after a week with no activity. Visitors to the site count as activity, but if the site gets no traffic for a week, open the project in the dashboard to wake it.
