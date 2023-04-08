
import { ReactNode } from 'react';
import Link from 'next/link';

const MenuLink = ({
  href,
  children,
  ...rest
}: {
  href: string;
  children: ReactNode;
}) => {
  return (
    <Link href={href} legacyBehavior>
      <a className='block' {...rest}>
        {children}
      </a>
    </Link>
  );
};

export default MenuLink;
