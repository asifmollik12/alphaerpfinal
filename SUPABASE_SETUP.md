# Supabase Integration Guide

## ✅ Setup Complete!

Your Next.js project is now connected to Supabase.

### 📁 Files Created:
- `src/lib/supabase.ts` - Supabase client configuration
- `src/lib/db.ts` - Database utility functions
- `src/app/api/test-db/route.ts` - API endpoint to test connection
- `supabase-schema.sql` - Example database schema

### 🔑 Environment Variables Added:
```env
NEXT_PUBLIC_SUPABASE_URL=https://pftnfyqulmwhmlnwvdel.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_UTCgp1t3S8T8iP5-v7x1Cg_2PyC496w
```

---

## 🚀 Next Steps:

### 1. Get Service Role Key (Important for admin operations)
1. Go to: https://pftnfyqulmwhmlnwvdel.supabase.co
2. Click **Settings** → **API**
3. Copy the **service_role** key (keep it secret!)
4. Add to `.env`:
   ```env
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
   ```

### 2. Create Database Tables
1. Go to: https://pftnfyqulmwhmlnwvdel.supabase.co
2. Click **SQL Editor**
3. Copy contents from `supabase-schema.sql`
4. Run the SQL script

### 3. Test Connection
```bash
# Make sure dev server is running
npm run dev

# Visit:
http://localhost:9002/api/test-db
```

---

## 📖 Usage Examples:

### Client-Side (React Component)
```tsx
'use client';

import { supabase } from '@/lib/supabase';
import { useEffect, useState } from 'react';

export default function UsersPage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchUsers() {
      const { data } = await supabase
        .from('users')
        .select('*');
      
      if (data) setUsers(data);
    }
    
    fetchUsers();
  }, []);

  return (
    <div>
      {users.map(user => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  );
}
```

### Server-Side (API Route)
```tsx
import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  const { data, error } = await supabase
    .from('users')
    .select('*');

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ users: data });
}
```

### Using Database Utilities
```tsx
import { getUsers, createUser } from '@/lib/db';

// Fetch users
const users = await getUsers();

// Create user
const newUser = await createUser({
  email: 'user@example.com',
  name: 'John Doe',
  role: 'admin'
});
```

---

## 🔒 Multi-Tenant Architecture

For your SaaS ERP, use the `company_id` field to isolate data:

```tsx
// Get data for specific company
const { data } = await supabase
  .from('users')
  .select('*')
  .eq('company_id', companyId);

// Insert with company association
const { data } = await supabase
  .from('users')
  .insert({
    email: 'user@company.com',
    name: 'John Doe',
    company_id: companyId
  });
```

---

## 📊 Vercel Deployment

Add these to your Vercel project environment variables:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://pftnfyqulmwhmlnwvdel.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_UTCgp1t3S8T8iP5-v7x1Cg_2PyC496w
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

---

## 🔗 Useful Links
- Supabase Dashboard: https://pftnfyqulmwhmlnwvdel.supabase.co
- Supabase Docs: https://supabase.com/docs
- JavaScript Client: https://supabase.com/docs/reference/javascript

---

## 🆘 Troubleshooting

**Connection Error?**
- Check if environment variables are set correctly
- Verify Supabase project is active
- Check network connectivity

**RLS Errors?**
- Row Level Security might be blocking queries
- Disable RLS for testing: `ALTER TABLE tablename DISABLE ROW LEVEL SECURITY;`
- Or create proper policies in Supabase dashboard

**Type Errors?**
- Run: `npx supabase gen types typescript --project-id pftnfyqulmwhmlnwvdel > src/types/database.ts`
