'use client';

import { useState, useTransition } from 'react';
import { Bot, Loader2, Sparkles } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import type { SuggestModulesOutput } from '@/ai/flows/suggest-modules-based-on-company-info';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

type AIEngineProps = {
  getSuggestionsAction: (companyInfo: string) => Promise<{
    success: boolean;
    data?: SuggestModulesOutput;
    error?: string;
  }>;
};

export function AIEngine({ getSuggestionsAction }: AIEngineProps) {
  const [companyInfo, setCompanyInfo] = useState('');
  const [suggestions, setSuggestions] = useState<SuggestModulesOutput | null>(null);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSuggestions(null);
    startTransition(async () => {
      const result = await getSuggestionsAction(companyInfo);
      if (result.success && result.data) {
        if(result.data.suggestedModules.length === 0) {
           toast({
            title: 'Not enough information',
            description: 'Please provide more details about your company for a suggestion.',
            variant: 'destructive',
          });
        } else {
          setSuggestions(result.data);
          toast({
            title: 'Suggestions Ready!',
            description: 'We have some recommendations for you.',
          });
        }
      } else {
        toast({
          title: 'Error',
          description: result.error || 'An unknown error occurred.',
          variant: 'destructive',
        });
      }
    });
  };

  return (
    <Card className="bg-card/50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          <Sparkles className="h-6 w-6 text-primary" />
          AI-Powered Suggestion Tool
        </CardTitle>
        <CardDescription>
          Not sure where to start? Describe your company, and our AI will recommend the best modules for you.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Textarea
            placeholder="e.g., We are a 50-person tech startup in the e-commerce space. We need to manage customer data, handle employee visas, and track project expenses..."
            value={companyInfo}
            onChange={(e) => setCompanyInfo(e.target.value)}
            rows={4}
            disabled={isPending}
          />
          <Button type="submit" disabled={isPending || !companyInfo.trim()}>
            {isPending ? (
              <Loader2 className="animate-spin" />
            ) : (
              <Sparkles />
            )}
            Get Suggestions
          </Button>
        </form>

        {isPending && (
          <div className="mt-6 flex items-center justify-center gap-2 text-muted-foreground">
            <Loader2 className="h-5 w-5 animate-spin" />
            <span>AI is thinking...</span>
          </div>
        )}

        {suggestions && (
          <Alert className="mt-6">
            <Bot className="h-4 w-4" />
            <AlertTitle>AI Recommendation</AlertTitle>
            <AlertDescription>
              <p className="font-semibold mt-2 mb-1">Suggested Modules: {suggestions.suggestedModules.join(', ')}</p>
              <p className="text-muted-foreground">{suggestions.reasoning}</p>
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
}
