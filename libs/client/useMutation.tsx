import { useState } from 'react';

interface UseMutationState {
  loading: boolean;
  data?: object;
  error?: object;
}

export default function useMutation(url: string): [(data: any) => void, UseMutationState] {
  const [state, setState] = useState<UseMutationState>({
    loading: false,
    data: undefined,
    error: undefined,
  });

  function mutation(data: any) {
    setState((prev) => {
      return { ...prev, loading: true };
    });
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json().catch(() => {}))
      .then((data) =>
        setState((prev) => {
          return { ...prev, data };
        }),
      )
      .catch((error) =>
        setState((prev) => {
          return { ...prev, error };
        }),
      )
      .finally(() =>
        setState((prev) => {
          return { ...prev, loading: false };
        }),
      );
  }

  return [mutation, state];
}