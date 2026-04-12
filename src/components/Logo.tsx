import { LogoIcon } from '@/components/icons/LogoIcon';

export function Logo() {
  return (
    <div className="flex items-center justify-center gap-2">
      <LogoIcon className="h-8 w-8 text-primary" />
      <span className="text-2xl font-bold text-[#343364]">Alpha ERP</span>
    </div>
  );
}
