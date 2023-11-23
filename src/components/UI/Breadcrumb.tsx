import Link from 'next/link';

export interface BreadCrumbProps {
  routers: {
    label: string;
    path: string;
  }[];
}

function Breadcrumb({ routers = [] }: BreadCrumbProps) {
  if (routers.length === 0) return null;
  return (
    <ul className='flex py-2'>
      {routers.map((_router, index, _arr) => {
        const isLast = index === _arr.length - 1;
        const textColor = isLast ? 'text-primary' : 'text-text-secondary';
        const cursor = isLast ? 'cursor-auto' : 'cursor-pointer';
        return (
          <li key={_router.label} className={`flex ${textColor}`}>
            <Link href={_router.path} className={`${cursor}`}>
              {_router.label}
            </Link>
            {isLast ? null : <div className='px-2'>/</div>}
          </li>
        );
      })}
    </ul>
  );
}

export default Breadcrumb;