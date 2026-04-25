# File Storage Setup Guide

## Supabase Storage Configuration

### 1. Create Storage Bucket

Go to your Supabase dashboard → Storage → Create bucket:

- **Bucket name**: `company-files`
- **Public bucket**: Yes (or No if you want private files with signed URLs)
- **File size limit**: 50MB (adjust as needed)
- **Allowed MIME types**: Leave empty for all types

### 2. Set Bucket Policies

Go to Storage → Policies → `company-files` bucket:

```sql
-- Allow authenticated users to upload files
CREATE POLICY "Allow authenticated uploads"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'company-files');

-- Allow users to read their company's files
CREATE POLICY "Allow company file access"
ON storage.objects FOR SELECT
TO authenticated
USING (bucket_id = 'company-files');

-- Allow users to delete their company's files
CREATE POLICY "Allow company file deletion"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'company-files');
```

### 3. Run Database Schema

Go to SQL Editor and run the `supabase-schema.sql` file to create the `files` table.

### 4. Usage in Your App

```tsx
import { FileUpload } from '@/components/FileUpload';

// In your component
<FileUpload
  companyId="company-uuid-here"
  folder="invoices"
  onUploadComplete={(url, path) => {
    console.log('File uploaded:', url);
  }}
  accept="image/*,.pdf"
  maxSize={10}
/>
```

### 5. API Endpoints

- **POST /api/upload** - Upload file
- **GET /api/upload?companyId=xxx&folder=yyy** - List files

### File Organization

Files are organized by company:
```
company-files/
  ├── company_123/
  │   ├── invoices/
  │   ├── contracts/
  │   └── receipts/
  └── company_456/
      └── documents/
```

### Export Company Data

To export all files for a company:

```bash
# Using Supabase CLI
supabase storage download company-files company_123 --recursive
```

Or via API:
```typescript
const { data } = await supabase.storage
  .from('company-files')
  .list('company_123', { limit: 1000 });
```
