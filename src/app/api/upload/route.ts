import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;
    const companyId = formData.get('companyId') as string;
    const folder = formData.get('folder') as string || '';

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Upload to Supabase Storage
    const fileName = `${Date.now()}_${file.name}`;
    const filePath = companyId ? `${companyId}/${folder}/${fileName}` : `${folder}/${fileName}`;

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('company-files')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (uploadError) {
      console.error('Upload error:', uploadError);
      return NextResponse.json({ error: uploadError.message }, { status: 500 });
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from('company-files')
      .getPublicUrl(filePath);

    // Log to database
    const { data: dbData, error: dbError } = await supabase
      .from('files')
      .insert({
        company_id: companyId,
        file_name: file.name,
        file_path: filePath,
        file_url: urlData.publicUrl,
        file_size: file.size,
        file_type: file.type,
        folder: folder
      })
      .select()
      .single();

    if (dbError) {
      console.error('Database error:', dbError);
      // File uploaded but DB log failed - still return success
    }

    return NextResponse.json({
      success: true,
      url: urlData.publicUrl,
      path: filePath,
      file: dbData
    });
  } catch (error: any) {
    console.error('Upload exception:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const companyId = searchParams.get('companyId');
    const folder = searchParams.get('folder');

    let query = supabase.from('files').select('*');

    if (companyId) {
      query = query.eq('company_id', companyId);
    }

    if (folder) {
      query = query.eq('folder', folder);
    }

    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ files: data });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
