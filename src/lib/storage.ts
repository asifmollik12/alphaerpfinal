import { supabase } from './supabase';

/**
 * File upload utilities for Supabase Storage
 * Supports company-specific buckets for multi-tenant isolation
 */

export interface UploadResult {
  success: boolean;
  url?: string;
  path?: string;
  error?: string;
}

/**
 * Upload file to Supabase Storage
 * @param file - File to upload
 * @param bucket - Storage bucket name (e.g., 'company-files', 'invoices')
 * @param folder - Optional folder path (e.g., 'company_123/invoices')
 */
export async function uploadFile(
  file: File,
  bucket: string = 'company-files',
  folder: string = ''
): Promise<UploadResult> {
  try {
    const fileName = `${Date.now()}_${file.name}`;
    const filePath = folder ? `${folder}/${fileName}` : fileName;

    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (error) {
      console.error('Upload error:', error);
      return { success: false, error: error.message };
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from(bucket)
      .getPublicUrl(filePath);

    return {
      success: true,
      url: urlData.publicUrl,
      path: filePath
    };
  } catch (error: any) {
    console.error('Upload exception:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Download file from Supabase Storage
 */
export async function downloadFile(bucket: string, path: string) {
  const { data, error } = await supabase.storage
    .from(bucket)
    .download(path);

  if (error) {
    console.error('Download error:', error);
    return null;
  }

  return data;
}

/**
 * Delete file from Supabase Storage
 */
export async function deleteFile(bucket: string, path: string) {
  const { error } = await supabase.storage
    .from(bucket)
    .remove([path]);

  if (error) {
    console.error('Delete error:', error);
    return false;
  }

  return true;
}

/**
 * List files in a folder
 */
export async function listFiles(bucket: string, folder: string = '') {
  const { data, error } = await supabase.storage
    .from(bucket)
    .list(folder);

  if (error) {
    console.error('List error:', error);
    return [];
  }

  return data;
}

/**
 * Get signed URL for private files (expires in 1 hour)
 */
export async function getSignedUrl(bucket: string, path: string, expiresIn: number = 3600) {
  const { data, error } = await supabase.storage
    .from(bucket)
    .createSignedUrl(path, expiresIn);

  if (error) {
    console.error('Signed URL error:', error);
    return null;
  }

  return data.signedUrl;
}
