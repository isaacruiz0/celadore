import type { LucideProps } from 'lucide-react';

export type MenuItem = {
  label: string;
  icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>
  >;
  onClick: () => void;
};

export type VideoItem = {
  title: string;
  channelName: string;
  description: string;
  thumbnailURL: string;
  id: string;
};
