'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Upload, X, File } from 'lucide-react';

interface FileUploadProps {
  companyId?: string;
  folder?: string;
  onUploadComplete?: (url: string, path: string) => void;
  accept?: string;
  maxSize?: number; // in MB
}

export function FileUpload({
  companyId,
  folder = '',
  onUploadComplete,
  accept,
  maxSize = 10
}: FileUploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string>('');
  const [uploadedUrl, setUploadedUrl] = useState<string>('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    // Check file size
    if (selectedFile.size > maxSize * 1024 * 1024) {
      setError(`File size must be less than ${maxSize}MB`);
      return;
    }

    setFile(selectedFile);
    setError('');
  };

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('file', file);
      if (companyId) formData.append('companyId', companyId);
      if (folder) formData.append('folder', folder);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Upload failed');
      }

      setUploadedUrl(data.url);
      if (onUploadComplete) {
        onUploadComplete(data.url, data.path);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  };

  const handleClear = () => {
    setFile(null);
    setUploadedUrl('');
    setError('');
  };

  return (
    <div className="space-y-4">
      {!uploadedUrl ? (
        <>
          <div className="flex items-center gap-4">
            <input
              type="file"
              onChange={handleFileChange}
              accept={accept}
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="flex items-center gap-2 px-4 py-2 border rounded-md cursor-pointer hover:bg-accent"
            >
              <File className="w-4 h-4" />
              {file ? file.name : 'Choose file'}
            </label>
            {file && (
              <Button
                onClick={handleClear}
                variant="ghost"
                size="sm"
              >
                <X className="w-4 h-4" />
              </Button>
            )}
          </div>

          {file && (
            <Button
              onClick={handleUpload}
              disabled={uploading}
              className="w-full"
            >
              <Upload className="w-4 h-4 mr-2" />
              {uploading ? 'Uploading...' : 'Upload'}
            </Button>
          )}

          {error && (
            <p className="text-sm text-red-500">{error}</p>
          )}
        </>
      ) : (
        <div className="p-4 border rounded-md bg-green-50 dark:bg-green-900/20">
          <p className="text-sm text-green-600 dark:text-green-400">
            File uploaded successfully!
          </p>
          <a
            href={uploadedUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-blue-600 hover:underline"
          >
            View file
          </a>
          <Button
            onClick={handleClear}
            variant="ghost"
            size="sm"
            className="ml-4"
          >
            Upload another
          </Button>
        </div>
      )}
    </div>
  );
}
