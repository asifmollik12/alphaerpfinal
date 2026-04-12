'use server';

import { suggestModules } from '@/ai/flows/suggest-modules-based-on-company-info';

export async function getSuggestions(companyInfo: string) {
  if (!companyInfo) {
    return { success: false, error: 'Please provide company information.' };
  }
  try {
    const result = await suggestModules({ companyInfo });
    return { success: true, data: result };
  } catch (error) {
    console.error('AI Error:', error);
    return { success: false, error: 'Failed to get AI suggestions.' };
  }
}
