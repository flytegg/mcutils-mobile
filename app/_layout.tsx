import { ThemeProvider } from '@/components/ThemeProvider';
import '../global.css';

import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import '@/global.css';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Stack } from 'expo-router';

export default function Layout() {
  const queryClient = new QueryClient();

  return (
    <ThemeProvider>
      <GluestackUIProvider mode="dark">
        <QueryClientProvider client={queryClient}>
          <Stack />
        </QueryClientProvider>
      </GluestackUIProvider>
    </ThemeProvider>
  );
}
