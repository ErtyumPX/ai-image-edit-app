import { memo, SVGProps } from 'react';

const ArrowIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg preserveAspectRatio='none' viewBox='0 0 168 42' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
    <path d='M168 21L133 0.79274V41.2073L168 21ZM0 24.5H136.5V17.5H0V24.5Z' fill='white' />
  </svg>
);
const Memo = memo(ArrowIcon);
export { Memo as ArrowIcon };
