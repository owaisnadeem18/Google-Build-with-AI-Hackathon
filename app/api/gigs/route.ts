// app/api/gigs/route.ts
import { NextResponse } from 'next/server';

let gigStore: any[] = []; // 🛑 Replace with database logic (MongoDB, Firestore, Supabase, etc.)

export async function POST(request: Request) {
  try {
    const data = await request.json();

    // Save the gig
    const newGig = {
      ...data,
      id: Date.now(), // Temporary ID
      createdAt: new Date(),
    };

    gigStore.push(newGig); // Replace with real DB logic
    return NextResponse.json({ success: true, gig: newGig });
  } catch (error) {
    console.error('Error saving gig:', error);
    return NextResponse.json({ success: false, error: 'Failed to save gig' }, { status: 500 });
  }
}
