import React from 'react';
import defaultConfig, { Config } from '../../config';

export const ConfigContext = React.createContext<Config>(null);

export function ConfigProvider({ children }: { children: React.ReactNode }) {
  return <ConfigContext.Provider value={defaultConfig}>{children}</ConfigContext.Provider>;
}
