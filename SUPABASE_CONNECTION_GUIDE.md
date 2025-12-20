# Supabase Database Configuration Guide

## Environment Variables Setup

Update your `.env.local` file with the following Supabase connection strings:

```env
# Supabase PostgreSQL Connection (Transaction Pooler - Port 6543)
DATABASE_URL="postgresql://postgres.PROJECT_REF:PASSWORD@aws-0-ap-south-1.pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1"

# Supabase Direct Connection (Session Pooler - Port 5432)
DIRECT_URL="postgresql://postgres.PROJECT_REF:PASSWORD@aws-0-ap-south-1.pooler.supabase.com:5432/postgres"
```

## Important Notes:

### 1. **Get Your Connection Strings from Supabase:**

- Go to your Supabase project dashboard
- Navigate to: **Settings** → **Database**
- Look for **Connection String** section
- You'll find two types:
  - **Transaction Mode** (Port 6543) - Use for `DATABASE_URL`
  - **Session Mode** (Port 5432) - Use for `DIRECT_URL`

### 2. **Replace Placeholders:**

- `PROJECT_REF` - Your Supabase project reference (e.g., `abcdefghijklmnop`)
- `PASSWORD` - Your database password
- Region may vary: `aws-0-ap-south-1` or `aws-1-ap-south-1` or other regions

### 3. **Connection URL Format:**

**For DATABASE_URL (Prisma Client - Transaction Pooler):**

```
postgresql://postgres.[PROJECT-REF]:[PASSWORD]@[HOST]:6543/postgres?pgbouncer=true&connection_limit=1
```

**For DIRECT_URL (Migrations - Direct Connection):**

```
postgresql://postgres.[PROJECT-REF]:[PASSWORD]@[HOST]:5432/postgres
```

### 4. **Common Connection Issues:**

**❌ Error: "Can't reach database server"**

- ✅ Check if your Supabase project is active (not paused)
- ✅ Verify the connection string format is correct
- ✅ Ensure password doesn't contain special characters that need URL encoding
- ✅ Check if your IP is allowed (Supabase allows all by default)

**❌ Error: "P1001: Can't reach database server"**

- ✅ Verify the hostname matches your Supabase region
- ✅ Make sure you're using the correct port (6543 for pooler, 5432 for direct)
- ✅ Check Supabase project status - free tier projects pause after inactivity

### 5. **URL Encoding Special Characters:**

If your password contains special characters, encode them:

- `@` → `%40`
- `#` → `%23`
- `$` → `%24`
- `%` → `%25`
- `&` → `%26`
- `+` → `%2B`
- `/` → `%2F`
- `:` → `%3A`

Example:

- Password: `My$ecure@Pass123`
- Encoded: `My%24ecure%40Pass123`

### 6. **Testing Connection:**

After updating your `.env.local`, test the connection:

```bash
# Generate Prisma Client
npx prisma generate

# Test connection and push schema
npx prisma db push

# Or run migrations
npx prisma migrate dev --name init
```

### 7. **Production Deployment (Vercel):**

In Vercel, add these environment variables:

1. Go to your Vercel project
2. Settings → Environment Variables
3. Add both `DATABASE_URL` and `DIRECT_URL`
4. Redeploy your application

### 8. **Supabase Project Wake Up:**

If your Supabase free-tier project is paused:

- Go to Supabase dashboard
- Click "Restore" or "Resume" on your project
- Wait for the project to become active (green status)

## Example .env.local

```env
# Database (Supabase)
DATABASE_URL="postgresql://postgres.abcdefghijklmnop:YourPassword123@aws-0-ap-south-1.pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1"
DIRECT_URL="postgresql://postgres.abcdefghijklmnop:YourPassword123@aws-0-ap-south-1.pooler.supabase.com:5432/postgres"

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxxxx
CLERK_SECRET_KEY=sk_test_xxxxx
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/admin/login
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/admin/dashboard

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Site
SITE_TITLE="Panchayat Samiti Wai"
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## Troubleshooting Steps:

1. **Verify Supabase Project Status:**

   ```
   - Login to Supabase dashboard
   - Check if project shows "Active" status (green)
   - If paused, click "Restore"
   ```

2. **Test with psql (if available):**

   ```bash
   psql "postgresql://postgres.PROJECT_REF:PASSWORD@aws-0-ap-south-1.pooler.supabase.com:5432/postgres"
   ```

3. **Check Prisma Configuration:**

   ```bash
   npx prisma validate
   ```

4. **Reset Prisma Client:**
   ```bash
   rm -rf node_modules/.prisma
   npx prisma generate
   ```

## Need More Help?

- Supabase Connection Docs: https://supabase.com/docs/guides/database/connecting-to-postgres
- Prisma + Supabase Guide: https://www.prisma.io/docs/guides/database/supabase
- Prisma Config: https://pris.ly/d/config-datasource
