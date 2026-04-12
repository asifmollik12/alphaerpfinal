import '@/lib/polyfills';
import {genkit, type Genkit} from 'genkit';
import {googleAI} from '@genkit-ai/google-genai';

let aiInstance: Genkit | null = null;

// Lazy initialization to avoid localStorage issues during module import
export const getAI = () => {
  if (!aiInstance) {
    // Mock localStorage if it doesn't exist (server-side)
    if (typeof localStorage === 'undefined') {
      (global as any).localStorage = {
        getItem: () => null,
        setItem: () => {},
        removeItem: () => {},
        clear: () => {},
        length: 0,
        key: () => null,
      };
    }

    aiInstance = genkit({
      plugins: [googleAI()],
      model: 'googleai/gemini-2.5-flash',
      enableTracingAndMetrics: false,
      telemetry: {
        instrumentation: 'none',
        logger: 'none',
      },
    });
  }
  return aiInstance;
};

export const ai = getAI();
