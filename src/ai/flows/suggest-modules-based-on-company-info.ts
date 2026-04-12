
// @ts-nocheck
'use server';
/**
 * @fileOverview AI-powered module suggestion tool based on company information.
 *
 * - suggestModules - A function that suggests relevant modules based on company information.
 * - SuggestModulesInput - The input type for the suggestModules function.
 * - SuggestModulesOutput - The return type for the suggestModules function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestModulesInputSchema = z.object({
  companyInfo: z
    .string()
    .describe('Detailed information about the company, including its industry, size, and specific needs.'),
});
export type SuggestModulesInput = z.infer<typeof SuggestModulesInputSchema>;

const SuggestModulesOutputSchema = z.object({
  suggestedModules: z
    .array(z.string())
    .describe('An array of module names that are recommended for the company.'),
  reasoning: z
    .string()
    .describe('Explanation of why each module is suggested based on the company information.'),
});
export type SuggestModulesOutput = z.infer<typeof SuggestModulesOutputSchema>;

export async function suggestModules(input: SuggestModulesInput): Promise<SuggestModulesOutput> {
  return suggestModulesFlow(input);
}

const suggestModulesPrompt = ai.definePrompt({
  name: 'suggestModulesPrompt',
  input: {schema: SuggestModulesInputSchema},
  output: {schema: SuggestModulesOutputSchema},
  prompt: `Based on the following company information:\n\n{{companyInfo}}\n\nSuggest a list of modules (HRM, CRM, Visaprocess, Expense, POS, LMS) that would be most beneficial for the company, along with a brief explanation for each suggestion.\n\nEnsure that the suggestedModules and reasoning in the output are properly populated based on the company information. The output should have one or more modules recommended, if the company information provided is sufficient to provide a meaningful recommendation. If there is not enough information, you can return an empty array for suggestedModules.\n\nConsider these modules:\n- HRM (Human Resources Management)\n- CRM (Customer Relationship Management)\n- Visaprocess\n- Expense\n- POS (Point of Sale)\n- LMS (Learning Management System)`,
});

const suggestModulesFlow = ai.defineFlow(
  {
    name: 'suggestModulesFlow',
    inputSchema: SuggestModulesInputSchema,
    outputSchema: SuggestModulesOutputSchema,
  },
  async input => {
    const {output} = await suggestModulesPrompt(input);
    return output!;
  }
);
