'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client'
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister'
// import { useState } from 'react';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1000 * 60 * 60 * 24, // 24 hours
    },
  },
})

const persister = createSyncStoragePersister({
  storage: 
    // Client-side-only code
    typeof window !== "undefined" 
    ? window.localStorage : undefined
  , 
})

export function Providers({ children }: { children: React.ReactNode }) {
  // const [queryClient] = useState(() => new QueryClient());

  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister }}
    >
      {children}
    </PersistQueryClientProvider>
  );
}