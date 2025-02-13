import { PathEnum } from '@/lib/enums';
import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="flex justify-center items-center h-full w-full flex-col my-auto min-h-screen gap-4">
      <h2 className={`font-semibold sm:max-w-xl max-w-xs text-3xl lg:text-5xl`}>
        404 Page not found
      </h2>

      <Link
        href={PathEnum.Dashboard}
        className="rounded-full hover:bg-white hover:text-primary bg-primary text-white hover:text-black px-[35px] py-[10px] ease-in-out duration-200 font-bold text-[18px]"
      >
        Go to Dashboard
      </Link>
    </section>
  );
}
