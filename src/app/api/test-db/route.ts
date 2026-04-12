import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

/**
 * Test API route to verify Supabase connection
 * Access at: http://localhost:9002/api/test-db
 */
export async function GET() {
  try {
    // Test connection by performing a simple query
    const { data, error } = await supabase
      .from('_test_connection')
      .select('*')
      .limit(1);

    // If we get a "table doesn't exist" error, connection is working!
    if (error) {
      const errorMsg = error.message.toLowerCase();
      if (errorMsg.includes('does not exist') || 
          errorMsg.includes('could not find') || 
          errorMsg.includes('schema cache')) {
        return NextResponse.json({
          success: true,
          message: '✅ Supabase connected successfully!',
          status: 'Connection verified - No tables created yet',
          url: process.env.NEXT_PUBLIC_SUPABASE_URL,
          instructions: 'Run the SQL from supabase-schema.sql in your Supabase SQL Editor to create tables'
        });
      }
      throw error;
    }

    return NextResponse.json({
      success: true,
      message: '✅ Supabase connected successfully!',
      data: data,
      url: process.env.NEXT_PUBLIC_SUPABASE_URL
    });

  } catch (error: any) {
    console.error('Supabase connection error:', error);
    
    return NextResponse.json({
      success: false,
      message: '❌ Failed to connect to Supabase',
      error: error.message,
      hint: 'Check your environment variables in .env file'
    }, { status: 500 });
  }
}
