import { PropsWithChildren } from 'react';

export const ChipLabel = ({ children }: PropsWithChildren) => {
  return (
    <span style={{ fontSize: '14px', color: 'inherit', lineHeight: '18px', letterSpacing: 0 }}>
      {children}
    </span>
  );
};
