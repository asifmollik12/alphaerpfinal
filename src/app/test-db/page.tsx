'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, XCircle, Loader2, Database, ExternalLink } from 'lucide-react';

export default function TestDatabasePage() {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [result, setResult] = useState<any>(null);

  const testConnection = async () => {
    setStatus('loading');
    try {
      const response = await fetch('/api/test-db');
      const data = await response.json();
      setResult(data);
      setStatus(data.success ? 'success' : 'error');
    } catch (error) {
      setResult({ message: 'Failed to connect', error: String(error) });
      setStatus('error');
    }
  };

  useEffect(() => {
    testConnection();
  }, []);

  return (
    <div className="container mx-auto py-10 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Database Connection Test</h1>
        <p className="text-muted-foreground">
          Test your Supabase database connection and setup
        </p>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              Connection Status
            </CardTitle>
            <Button onClick={testConnection} size="sm" disabled={status === 'loading'}>
              {status === 'loading' ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Testing...
                </>
              ) : (
                'Test Again'
              )}
            </Button>
          </div>
          <CardDescription>
            Testing connection to Supabase PostgreSQL database
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Status Badge */}
            <div className="flex items-center gap-2">
              {status === 'loading' && (
                <>
                  <Loader2 className="h-5 w-5 animate-spin text-blue-500" />
                  <span className="text-sm">Testing connection...</span>
                </>
              )}
              {status === 'success' && (
                <>
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                  <Badge variant="default" className="bg-green-500">Connected</Badge>
                </>
              )}
              {status === 'error' && (
                <>
                  <XCircle className="h-5 w-5 text-red-500" />
                  <Badge variant="destructive">Connection Failed</Badge>
                </>
              )}
            </div>

            {/* Result */}
            {result && (
              <div className="bg-muted p-4 rounded-lg space-y-3">
                <div>
                  <p className="font-semibold text-sm mb-1">Message:</p>
                  <p className="text-sm">{result.message}</p>
                </div>

                {result.status && (
                  <div>
                    <p className="font-semibold text-sm mb-1">Status:</p>
                    <p className="text-sm">{result.status}</p>
                  </div>
                )}

                {result.url && (
                  <div>
                    <p className="font-semibold text-sm mb-1">Supabase URL:</p>
                    <a 
                      href={result.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-sm text-blue-500 hover:underline flex items-center gap-1"
                    >
                      {result.url}
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                )}

                {result.instructions && (
                  <div className="bg-yellow-50 dark:bg-yellow-950 border border-yellow-200 dark:border-yellow-800 p-3 rounded">
                    <p className="font-semibold text-sm mb-1">⚠️ Next Steps:</p>
                    <p className="text-sm">{result.instructions}</p>
                  </div>
                )}

                {result.error && (
                  <div className="bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 p-3 rounded">
                    <p className="font-semibold text-sm mb-1">Error:</p>
                    <p className="text-sm font-mono">{result.error}</p>
                  </div>
                )}

                {result.hint && (
                  <div>
                    <p className="font-semibold text-sm mb-1">Hint:</p>
                    <p className="text-sm">{result.hint}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Setup Instructions */}
      <Card>
        <CardHeader>
          <CardTitle>Setup Instructions</CardTitle>
          <CardDescription>Follow these steps to complete your Supabase setup</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">
                1
              </div>
              <div>
                <h4 className="font-semibold mb-1">Get Service Role Key</h4>
                <p className="text-sm text-muted-foreground">
                  Go to Supabase Dashboard → Settings → API → Copy service_role key
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  Add to <code className="bg-muted px-1 rounded">.env</code>: <code className="bg-muted px-1 rounded">SUPABASE_SERVICE_ROLE_KEY=...</code>
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">
                2
              </div>
              <div>
                <h4 className="font-semibold mb-1">Create Database Tables</h4>
                <p className="text-sm text-muted-foreground">
                  Go to Supabase Dashboard → SQL Editor
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  Run the SQL from <code className="bg-muted px-1 rounded">supabase-schema.sql</code>
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">
                3
              </div>
              <div>
                <h4 className="font-semibold mb-1">Deploy to Vercel</h4>
                <p className="text-sm text-muted-foreground">
                  Add environment variables to Vercel:
                </p>
                <ul className="text-sm text-muted-foreground mt-1 list-disc list-inside">
                  <li><code className="bg-muted px-1 rounded text-xs">NEXT_PUBLIC_SUPABASE_URL</code></li>
                  <li><code className="bg-muted px-1 rounded text-xs">NEXT_PUBLIC_SUPABASE_ANON_KEY</code></li>
                  <li><code className="bg-muted px-1 rounded text-xs">SUPABASE_SERVICE_ROLE_KEY</code></li>
                </ul>
              </div>
            </div>

            <div className="pt-4 border-t">
              <a 
                href={result?.url || 'https://supabase.com/dashboard'}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="w-full" variant="default">
                  Open Supabase Dashboard
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </a>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
