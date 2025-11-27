import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { context_seed } = await request.json();

    if (!context_seed) {
      return NextResponse.json(
        { error: 'context_seed is required' },
        { status: 400 }
      );
    }

    const apiKey = process.env.TAVUS_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'TAVUS_API_KEY not configured' },
        { status: 500 }
      );
    }

    const response = await fetch('https://tavusapi.com/v2/conversations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
      },
      body: JSON.stringify({
        replica_id: process.env.TAVUS_REPLICA_ID,
        conversational_context: JSON.stringify(context_seed),
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      return NextResponse.json(
        { error: `Tavus API error: ${error}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    );
  }
}
