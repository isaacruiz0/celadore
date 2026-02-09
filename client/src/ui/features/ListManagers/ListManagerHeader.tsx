import { Menu } from '@base-ui/react/menu';
import Ellipses from '@/ui/markup/Ellipses';
import type { MenuItem } from './types';

export default function ListManagerHeader({
  title,
  menuItems,
}: {
  title: string;
  menuItems: MenuItem[];
}) {
  return (
    <div className="w-full animate-fade-in px-6 py-4 bg-transparent backdrop-blur-md flex items-center justify-between border-x-0 border-2 border-[#1a1a1a]/20">
      <div className="text-left relative">
        <div className="font-semibold text-2xl text-[#224]">{title}</div>
      </div>
      <div className="self-start">
        <Menu.Root>
          <Menu.Trigger>
            <div className="cursor-pointer">
              <Ellipses />
            </div>
          </Menu.Trigger>
          <Menu.Portal>
            <Menu.Positioner className="outline-none" sideOffset={8}>
              <Menu.Popup className="`origin-(--transform-origin rounded-md bg-white py-1 text-[#224] shadow-lg shadow-gray-200 outline-1 outline-gray-200 transition-[transform,scale,opacity] data-ending-style:scale-90 data-ending-style:opacity-0 data-starting-style:scale-90 data-starting-style:opacity-0 dark:shadow-none dark:-outline-offset-1 dark:outline-gray-300">
                {menuItems.map((menuItem) => {
                  const Icon = menuItem.icon;

                  return (
                    <Menu.Item
                      key={menuItem.label}
                      onClick={menuItem.onClick}
                      className="flex gap-1 items-center cursor-pointer py-2 pr-8 pl-4 text-sm leading-4 outline-none select-none data-highlighted:relative data-highlighted:z-0 data-highlighted:text-gray-50 data-highlighted:before:absolute data-highlighted:before:inset-x-1 data-highlighted:before:inset-y-0 data-highlighted:before:z-[-1] data-highlighted:before:rounded-sm data-highlighted:before:bg-[#224]"
                    >
                      <span className="text-lg">{menuItem.label}</span>
                      <Icon className="h-4 w-4" />
                    </Menu.Item>
                  );
                })}
              </Menu.Popup>
            </Menu.Positioner>
          </Menu.Portal>
        </Menu.Root>
      </div>
    </div>
  );
}
