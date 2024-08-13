import React from 'react';

type NavigatorProps = {
  path: string;
  styles?:string;
  children: React.ReactNode;
};

const Navigator = ({ path, children,styles }: NavigatorProps) => {
  return (
    <a href={path} className={styles}>
      {children}
    </a>
  );
};

export default Navigator;
