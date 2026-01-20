import { BrainCircuit, Layers, Database, Server, Code2, ShieldCheck } from 'lucide-react';

export const iconMap = {
  BrainCircuit,
  Layers,
  Database,
  Server,
  Code2,
  ShieldCheck,
};

export type IconName = keyof typeof iconMap;

export const getIconByName = (name: string) => {
  return iconMap[name as IconName] ?? BrainCircuit;
};
