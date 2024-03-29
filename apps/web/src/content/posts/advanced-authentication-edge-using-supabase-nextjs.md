---
title: "Advanced authentication at the Edge using Supabase & Next.JS"
description: "Applying httpOnly cookies to a Next.JS app using Supabase at the Edge"
date: 2022-09-09
updated: 2022-09-09
image: "./images/supab.png"
tags: ["next", "NextJS", "next.js", "edge", "supabase", "authentication", "JWT"]
---

# Advanced authentication at the Edge using Supabase & Next.JS

## Introduction

In this article, we will be taking what would be a simple client side authentication and moving it to the edge. This will allow us to have a more secure authentication system that is not reliant on the client to keep the user logged in. We will be using Supabase as our auth provider & Next.JS as our fullstack framework. The end product will be an admin dashboard using request based authentication with cookies. Lets get started.

## Technological overview

Below is a quick overview of the technologies we will be using in this article. Feel free to skip to the next section if you are already familiar with these technologies.

### What is Supabase?

Supabase is an open source alternative to Firebase. It is a hosted backend that provides a Postgres database, realtime subscriptions, authentication, storage, and more. It is a great alternative to Firebase for those who want to self host their backend.

### What is Next.JS?

Next.JS is a fullstack framework that allows you to build server rendered React applications. It is a great alternative to Gatsby for those who want to use React. Over the years Next has become incredibly powerful and is now a direct contender to frameworks like Rails, Django, and Laravel.

### What is the Edge?

Think of it as your closest grocery store. These are usually quite small and don't have everything you need, but they are close and convenient. The edge is the same way. It is a small server that is close to the user and can provide a lot of the functionality that you need. In this case, we will be using the edge to handle authentication. Next.js provides two different Edge systems. Next.js edge middleware and Next.js Edge API routes. To build our we will have to utilize both of these systems.

## Getting started

I've created a boilerplate [repository](https://github.com/sannajammeh/nextjs-supabase-middleware-auth-example) using Next.js, Supabase & TailwindCSS. You can download it using the follow command.

```bash
git clone https://github.com/sannajammeh/nextjs-supabase-middleware-auth-example middleware-auth
```

Once you have downloaded the boilerplate, you will need to create a Supabase project. You can do this by going to [supabase.io](https://supabase.io) and clicking on the "Create a new project" button. Next you must fill in the correct environment variables. You can do this by creating a .env.local file in the root of your project. The .env.local file should look like this.

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_KEY=
```

You can find the values for these variables by going to your Supabase project and clicking on the "Settings" tab. You will find the values for the first two variables under the "API" tab. The third variable can be found under the "Service Accounts" tab.

The supabase client can be found under `<root>/lib/supabase.ts`. You can use this client to make requests to your Supabase project. The client is already configured to use the environment variables we just added. This client is ready for both server and browser usage.

## Setting up the Authentication

Now the fun begins! We will apply two different authentication patterns to our application.

- Client side authentication (using the supabase-js client)
- Request based authentication (using the JWT token from the supabase-js client and cookies)

### Client side authentication

> GITHUB BRANCH: `client-auth`

Client side authentication is performed by sending a request to Supabase's API, getting a `JWT access token` and storing this in `localStorage`. The supabase-js client does this out of the box. We are going to be using [Valtio](https://github.com/pmndrs/valtio) as the global state provider due to its dead simple state management.

Add this file to your project and call the `useInitAuth()` hook in `_app.tsx`.

```ts
// /context/auth.tsx
import type { Session } from "@supabase/supabase-js";
import { onAuthStateChange } from "../lib/supabase";
import { proxy, useSnapshot } from "valtio";
import { useEffect } from "react";

export interface AuthStore {
  user: null | Session["user"];
  session: null | Session;
  loaded: boolean;
}

export const authStore = proxy<AuthStore>({
  user: null,
  session: null,
  loaded: false,
});

export const useInitAuth = () => {
  useEffect(() => {
    const { data: subscription } = onAuthStateChange((event, session) => {
      authStore.user = session?.user ?? null;
      authStore.session = session ?? null;
      authStore.loaded = true;
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, []);
};

// State hooks
export const useSession = () => useSnapshot(authStore).session;
export const useUser = () => useSnapshot(authStore).user;
```

##### What is happening here?

We are creating a global state object using Valtio. We are then using the `onAuthStateChange` function from the supabase-js client to listen for changes to the user's session. When the user's session changes, we update the global state object. We are then using the `useInitAuth` hook in `_app.tsx` to start listening to auth changes.

> Note: `onAuthStateChange` is a custom wrapper because Supabase refuses to resolve the issue of calling `onAuthStateChange` with the user on initial load. See [this issue](https://github.com/supabase/gotrue-js/issues/313)

#### Limit access to /dashboard on the client

Inside of `/components/dashboard-layout.tsx` we will add a check to see if the user is logged in. If the user is not logged in, we will redirect them to the login page. Addionally, we will render nothing if the user is not logged in.

```tsx
// /pages/dashboard/index.tsx
import { useUser } from "context/auth";

const Dashboard = () => {
  //... previous code

  // Make sure we have confirmed the user is logged out
  // otherwise redirect will happen on first render.
  const loaded = useAuthLoaded();
  const router = useRouter();
  const user = useUser();

  useEffect(() => {
    if (!user && loaded) {
      router.push("/login");
    }
  }, [loaded, user, router]);

  if (!user) return null;

  // ...
};
```

Now every dashboard page is "protected" by the client. If the user is not logged in, they will be redirected to the login page.

#### The problem here:

This is a great solution for protecting SPA only apps. However, it does not protect these other factors:

- The user is able to download the full client bundle (So any react components not rendered will see be available)
- API Routes are not protected
- Sensitive HTML (server rendered content, email lists, secret data) is not protected.
  This includes any HTML or JSON that is rendered on the server. This is a big problem because it means that the user is able to inspect the page and view sensitive data regardless if they are logged in or not.

## Next.js Edge Middleware to the resque

> GITHUB BRANCH: `final-product`

The edge middleware is a great solution for this problem. The middleware fill fire for _every_ requests to the endpoints we configure it to. We can use the edge to handle authentication and handle authorization accordingly. This will allow us to protect our API routes and and content under `/dashboard`.

Additionally, this setup saves us from:

- Having to manually wrap all our routes with the client side protection code.
- Implement SSR protection for each endpoint
- Skipping static generation to avoid sharing sensitive data.

### Create the middleware

Here the advanced code starts. We are going to create a middleware that will check if the user is logged in. If the user is not logged in, we will redirect them to the login page. Additionally, we will have to manage the setting and removal of JWT cookies, this will be done using an Edge API Route.

The workflow is as follows:

- The user logs in on the client
- The client sends a request to the `/api/auth` endpoint with the `Session` object
- The `/api/auth` endpoint sets a JWT cookie on the user's browser
- The user makes a request to an API route or a page under `/dashboard`
- The edge middleware checks if the user is logged in
- If the user is logged in, the request is passed to the API route or page
- If the user is not logged in, the request is redirected to the login page

Lets start with the `/api/auth` endpoint. For this we will only use the short lived access_token for 3600 seconds. This is only to keep everything simple. In a production application, you would want to use the refresh token to get a new access token when the current one expires.

#### Setting and deleting the cookies

Lets define a new environment variable called `SUPABASE_COOKIE_KEY`

```bash
SUPABASE_COOKIE_KEY="sb-auth-token"
```

```ts
// /pages/api/auth.ts
import { NextRequest } from "next/server";

const cookieKey = process.env.SUPABASE_COOKIE_KEY!;

// This is an edge API route, thus we are using modern Request and Response objects
// instead of the express syntax.
const handler = async (request: NextRequest) => {
  const { method } = request;
  const body = await request.json();

  if (method !== "post" || !body)
    return new Response("Bad Request", { status: 400 });

  const {
    event, // This is the event type, either "SIGNED_IN" or "SIGNED_OUT" (from supabase-js)
    session,
  } = body;

  // Validate request body
  if (!event) return new Response("Bad Request", { status: 400 });

  switch (event) {
    case "SIGNED_IN":
      // Here we need the session thus we must validate if it exists
      if (!session) return new Response("Bad Request", { status: 400 });

      // We are using the NextResponse object to gain access to the cookie methods
      const response = new NextResponse(null, {
        status: 200,
        statusText: "OK",
      });

      // Set the JWT cookie
      response.cookies.set(cookieKey, session.access_token, {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        maxAge: 3600,
      });

      return response; // Return the response to the user
    case "SIGNED_OUT":
      // Delete the JWT cookie
      return new Response("OK", {
        status: 200,
        statusText: "OK",
        headers: {
          "Set-Cookie": `${cookieKey}=; Path=/; HttpOnly; SameSite=Lax; Expires=Thu, 01 Jan 1970 00:00:00 GMT; Secure`, // Manually delete the cookie.
        },
      });
    default:
      return new Response("Bad Request", { status: 400 });
  }
};

export default handler;

export const config = {
  runtime: "experimental-edge",
};
```

In the client we now need to make some minor modifications to the `useInitAuth` hook.
We must call this API route when the user logs in and out.

```tsx
// /context/auth.tsx
// ...

const setAuthCookie = (event: AuthChangeEvent, session: Session | null) => {
  return fetch("/api/auth", {
    method: "POST",
    headers: new Headers({ "Content-Type": "application/json" }),
    credentials: "same-origin",
    body: JSON.stringify({ event, session }),
  });
};

export const useInitAuth = () => {
  const router = useRouter();
  useEffect(() => {
    const { data: subscription } = onAuthStateChange((event, session) => {
      authStore.user = session?.user ?? null;
      authStore.session = session ?? null;
      authStore.loaded = true;

      // Send the JWT access token to the server.
      setAuthCookie(
        authStore.session ? event : "SIGNED_OUT", // Sign the user out if the session is null (ignore other events)
        authStore.session
      ).then((res) => {
        if (!res.ok) return;

        // If the user is signed in and we are on the login page, redirect to the dashboard.
        // This is because the cookie is set AFTER the page is rendered.
        if (authStore.user && router.pathname === "/login") {
          router.push("/dashboard");
        }
      });
    });

    return () => {
      subscription?.unsubscribe();
    };

    // We are getting the latest pathname state regardless here as we are using object notion for the router. Disable eslint for this line.

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

// ...
```

#### Authorization with the Edge Middleware

Now that we are able to successfully set and delete the JWT cookie we can begin writing our edge middleware.

```ts
// <root>/middleware.ts
import { supabase } from "lib/supabase";
import { NextRequest, NextResponse } from "next/server";

const middleware = async (request: NextRequest) => {
  // Get the cookie from the request
  const access_token = request.cookies.get(process.env.SUPABASE_COOKIE_KEY!);

  // If the cookie is not set, redirect to the login page
  if (!access_token) {
    return NextResponse.redirect("/login");
  }

  // If the cookie is set, make sure the JWT is valid
  const { data: user, error } = await supabase.auth.api.getUser(access_token);

  // If the JWT is not valid, redirect to the login page
  if (error || !user) {
    // Here we MUST wipe the access token as well. Otherwise the user will be stuck in a redirect loop.

    return NextResponse.redirect("/login", {
      headers: {
        "Set-Cookie": `${process.env.SUPABASE_COOKIE_KEY}=; Path=/; HttpOnly; SameSite=Lax; Expires=Thu, 01 Jan 1970 00:00:00 GMT; Secure`, // Manually delete the cookie.
      },
    });
  }

  // If the JWT is valid, pass the request to the API route or page
  return NextResponse.next();
};

export default middleware;

export const config = {
  matcher: ["/dashboard/:path*", "/api/dashboard/:path*"], // This is the path we want to protect
};
```

Finally. Remove all the hooks inside `/components/dashboard-layout` as they were only needed during client side authentication.

#### Testing the middleware

Now that we have our middleware set up, we can test it out. If you go to the dashboard page, you will be redirected to the login page. If you log in, you will be redirected back to the dashboard page. If you log out, you will be redirected back to the login page.

Well done! You have successfully implemented authentication at the Edge with Supabase and Next.js.

## Whats next?

This is not a complete example. We only use an access_token JWT and not a refresh_token JWT. This means that the user will be logged out after 1 hour. This is something you will have to implement yourself. Here is a list of further improvements you can make for a production app:

- Implement a `refresh_token` flow inside the `Set cookie route` & `Edge middleware`.
- Handle redirect from `/login` to `/dashboard` if the user is already logged in with the `Edge middleware` instead of the client side react code.
- Add stricter validation of JWT inside of the `Set cookie route` (Check validity using supabase-js).
