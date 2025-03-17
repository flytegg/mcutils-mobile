import '../global.css';

import '@/global.css';
import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Stack } from 'expo-router';

export default function Layout() {
  const queryClient = new QueryClient();

  return (
    <GluestackUIProvider mode="light">
      <QueryClientProvider client={queryClient}>
        <Stack />
      </QueryClientProvider>
    </GluestackUIProvider>
  );
}
