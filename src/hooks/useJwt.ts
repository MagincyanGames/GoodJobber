import { useState } from 'react';

export default function useJwt() {
  const [jwt, _setJwt] = useState<string | undefined>(undefined);

  return [jwt];
}
