'use client';

import { createContext } from 'react';

export const RoleContext = createContext({
  activeRole: 'Super Admin',
  setActiveRole: () => {},
});
