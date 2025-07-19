To achieve your requirement of creating a database entry after login and blocking access until admin approval, you'll need to implement a two-step authentication flow:

## 1. Modified Middleware for User Sync and Approval Check

```typescript
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
```

[(1)](https://clerk.com/nextjs-authentication) , [(2)](https://clerk.com/docs/ai-prompts/nextjs#prompt)

The issue with using `currentUser()` in middleware is a known limitation [(3)](https://github.com/clerk/javascript/issues/2710) . Instead, use the `auth` object which provides the necessary user information:

```typescript
const isProtectedRoute = createRouteMatcher(["/admin/dashboard(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    const { userId, sessionClaims } = await auth();

    if (!userId) {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }

    // Check if user exists and is approved in your database
    const userStatus = await checkUserStatus(userId);

    if (!userStatus.exists) {
      // Create user entry - this is where you sync the user
      await createPendingUser(userId, sessionClaims);
      return NextResponse.redirect(new URL("/admin/pending-approval", req.url));
    }

    if (!userStatus.approved) {
      return NextResponse.redirect(new URL("/admin/pending-approval", req.url));
    }

    const role = sessionClaims?.metadata?.role;
    if (role !== "admin" && role !== "moderator") {
      return NextResponse.redirect(new URL("/403", req.url));
    }
  }
});
```

[(4)](https://clerk.com/blog/what-is-middleware-in-nextjs) , [(1)](https://clerk.com/nextjs-authentication)

## 2. Database Helper Functions

Since middleware has limitations, create lightweight database functions that work within the Edge Runtime constraints [(4)](https://clerk.com/blog/what-is-middleware-in-nextjs) :

```typescript
// utils/userSync.ts
async function checkUserStatus(clerkId: string) {
  // Lightweight database check
  const user = await db.query.users.findFirst({
    where: eq(users.clerkId, clerkId),
  });

  return {
    exists: !!user,
    approved: user?.approved || false,
  };
}

async function createPendingUser(clerkId: string, sessionClaims: any) {
  // Create user with pending status
  await db.insert(users).values({
    clerkId,
    approved: false,
    createdAt: new Date(),
  });
}
```

[(5)](https://clerk.com/docs/integrations/databases/neon)

## 3. Complete User Sync After Authentication

Create a server action or API route to complete the full user synchronization:

```typescript
// app/api/sync-user/route.ts
import { auth, currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST() {
  const { userId } = await auth();
  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const user = await currentUser();

  await syncUser({
    clerkId: userId,
    name: `${user.firstName || ""} ${user.lastName || ""}`,
    email: user.emailAddresses[0].emailAddress,
    image: user.imageUrl,
  });

  return NextResponse.json({ success: true });
}
```

[(6)](https://clerk.com/blog/nextjs-authentication)

## 4. Pending Approval Page

Create a page that users see while waiting for approval:

```typescript
// app/admin/pending-approval/page.tsx
export default function PendingApproval() {
  return (
    <div>
      <h1>Account Pending Approval</h1>
      <p>Your account is being reviewed by an administrator.</p>
    </div>
  )
}
```

This approach ensures that:

- Users are redirected to login if unauthenticated [(4)](https://clerk.com/blog/what-is-middleware-in-nextjs)
- Database entries are created immediately after authentication
- Protected routes are blocked until admin approval
- Full user sync happens outside middleware to avoid Edge Runtime limitations

The middleware handles the core authentication and approval logic, while detailed user synchronization happens in dedicated API routes or server actions where `currentUser()` can be safely used [(6)](https://clerk.com/blog/nextjs-authentication) , [(3)](https://github.com/clerk/javascript/issues/2710) .
