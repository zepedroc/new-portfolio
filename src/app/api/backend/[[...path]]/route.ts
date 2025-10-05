import { NextRequest, NextResponse } from 'next/server';

// This proxy route forwards GET requests to your FastAPI backend
// Usage: Call /api/backend or /api/backend/{endpoint} and it will forward to FastAPI
// The double brackets [[...path]] make this an optional catch-all route

export async function GET(request: NextRequest, { params }: { params: Promise<{ path?: string[] }> }) {
  const FASTAPI_URL = process.env.FASTAPI_URL || 'http://localhost:8000';

  // Construct the full path to FastAPI endpoint
  // params.path will be undefined for root, or an array for nested paths
  const resolvedParams = await params;
  const endpoint = resolvedParams.path && resolvedParams.path.length > 0 ? resolvedParams.path.join('/') : '';
  const url = endpoint ? `${FASTAPI_URL}/${endpoint}` : FASTAPI_URL;

  // Get query parameters from the original request
  const searchParams = request.nextUrl.searchParams.toString();
  const fullUrl = searchParams ? `${url}?${searchParams}` : url;

  try {
    // Prepare headers
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    // Copy relevant headers from the original request (if needed)
    const authHeader = request.headers.get('authorization');
    if (authHeader) {
      headers['Authorization'] = authHeader;
    }

    // Make the GET request to FastAPI
    const response = await fetch(fullUrl, {
      method: 'GET',
      headers,
    });

    // Get the response data and preserve content type
    const contentType = response.headers.get('content-type');

    if (contentType?.includes('application/json')) {
      // Return JSON response
      const data = await response.json();
      return NextResponse.json(data, {
        status: response.status,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } else {
      // Return non-JSON response (text, HTML, etc.) with original content type
      const data = await response.text();
      return new NextResponse(data, {
        status: response.status,
        headers: {
          'Content-Type': contentType || 'text/plain',
        },
      });
    }
  } catch (error) {
    console.error('[FastAPI Proxy] Error:', error);
    return NextResponse.json(
      { error: 'Failed to connect to backend', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 },
    );
  }
}
