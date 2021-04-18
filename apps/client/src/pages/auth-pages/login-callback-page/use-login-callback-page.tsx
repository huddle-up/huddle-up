import { useEffect, useState } from 'react';
import { useOidc } from '../../../contexts/oidc';

export function useLoginCallbackPage() {
  const oidc = useOidc();
  const [callbackCalled, setCallbackCalled] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (callbackCalled) return;
    setCallbackCalled(true);
    oidc
      .signInCallback()
      .then((success) => {
        setIsLoading(false);
        setHasError(!success);
        return null;
      })
      .catch(() => {
        setHasError(true);
        setIsLoading(false);
      });
  }, [oidc, callbackCalled]);

  return { hasError, isLoading };
}
