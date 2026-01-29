import type { LucideProps } from 'lucide-react';

export type MenuItem = {
  label: string;
  icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>
  >;
  onClick: () => void;
};
