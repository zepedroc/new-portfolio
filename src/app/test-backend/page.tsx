'use client';

import { useState } from 'react';

import type { Route } from 'next';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

import { api } from '@/lib/api';

export default function TestBackendPage() {
  const [data, setData] = useState<Record<string, unknown> | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const testConnection = async () => {
    setLoading(true);
    setError(null);
    setData(null);

    try {
      // Call the root endpoint of your FastAPI backend
      const result = await api.get<Record<string, unknown>>('');
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to connect to backend');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-16 grid-pattern">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="mb-8">
          <Link href={'/' as Route}>
            <Button variant="outline" className="mb-4">
              ← Back to Home
            </Button>
          </Link>
          <h1 className="text-4xl font-bold mb-2">FastAPI Backend Test</h1>
          <p className="text-muted-foreground">Test the connection to your FastAPI backend</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Backend Connection Test</CardTitle>
            <CardDescription>Click the button below to test the connection to the FastAPI backend</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button onClick={testConnection} disabled={loading} className="w-full">
              {loading ? 'Testing Connection...' : 'Test Backend Connection'}
            </Button>

            {error && (
              <div className="p-4 rounded-lg bg-destructive/10 border border-destructive">
                <p className="text-sm font-semibold text-destructive mb-1">Error</p>
                <p className="text-sm text-destructive/90">{error}</p>
              </div>
            )}

            {data && (
              <div className="p-4 rounded-lg bg-primary/10 border border-primary">
                <p className="text-sm font-semibold mb-2">Response from Backend:</p>
                <pre className="text-sm overflow-auto p-3 rounded bg-background">{JSON.stringify(data, null, 2)}</pre>
              </div>
            )}

            {!data && !error && !loading && (
              <div className="p-4 rounded-lg bg-muted border border-border">
                <p className="text-sm text-muted-foreground">No response yet. Make sure your FastAPI backend is running.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
