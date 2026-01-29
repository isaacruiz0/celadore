import { useState } from 'react';
import { AlertDialog } from '@base-ui/react/alert-dialog';
import { SquarePlus, SquareMinus, ChevronsRight, XIcon } from 'lucide-react';
import Ellipses from '@/ui/markup/Ellipses';
import './styles.css';
import { Link } from '@tanstack/react-router';
import { Menu } from '@base-ui/react/menu';
import type { Theme, ViewMode } from './types';

/**
 * @returns If the view mode is show then it displays a list of themes to select from. If the view mode is remove then it allows you to delete that theme
 */
function MyThemesList({
  myThemes,
  viewMode,
  onRemove,
}: {
  myThemes: Theme[];
  viewMode: ViewMode;
  onRemove: (themeId: number) => void;
}) {
  const renderThemeItem = (
    theme: Theme,
    viewMode: ViewMode,
    onRemove: (themeId: number) => void,
  ) => {
    switch (viewMode) {
      case 'remove':
        return (
          <div
            className="w-full flex justify-between items-center px-6 py-8 bg-transparent backdrop-blur-md text-3xl text-[#224] border-b-2 border-[#1a1a1a]/20 hover:border-[#1a1a1a]/50 transition-all duration-500 relative overflow-hidden"
            style={{
              boxShadow:
                '0 0 25px rgba(26, 26, 26, 0.12), inset 0 0 25px rgba(242, 213, 166, 0.2)',
            }}
          >
            <div className="group-hover:translate-x-1 transition-transform duration-300">
              {theme.label}
            </div>
            <AlertDialog.Root>
              <AlertDialog.Trigger>
                <XIcon className="text-[#224]/70 w-8 h-8 cursor-pointer" />
              </AlertDialog.Trigger>
              <AlertDialog.Portal>
                <AlertDialog.Backdrop className="fixed inset-0 min-h-dvh bg-black opacity-20 transition-all duration-150 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0 dark:opacity-70 supports-[-webkit-touch-callout:none]:absolute" />
                <AlertDialog.Popup className="fixed top-1/2 left-1/2 -mt-8 w-96 max-w-[calc(100vw-3rem)] -translate-x-1/2 -translate-y-1/2 rounded-lg bg-gray-50 p-6 text-gray-900 outline outline-1 outline-gray-200 transition-all duration-150 data-[ending-style]:scale-90 data-[ending-style]:opacity-0 data-[starting-style]:scale-90 data-[starting-style]:opacity-0 dark:outline-gray-300">
                  <AlertDialog.Title className="-mt-1.5 mb-1 text-lg font-medium">
                    Delete theme?
                  </AlertDialog.Title>
                  <AlertDialog.Description className="mb-6 text-base text-gray-600">
                    You can’t undo this action.
                  </AlertDialog.Description>
                  <div className="flex justify-end gap-4">
                    <AlertDialog.Close className="cursor-pointer flex h-10 items-center justify-center rounded-md border border-gray-200 bg-gray-50 px-3.5 text-base font-medium text-gray-900 select-none hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-blue-800 active:bg-gray-100">
                      Cancel
                    </AlertDialog.Close>
                    <AlertDialog.Close
                      onClick={() => onRemove(theme.id)}
                      className="cursor-pointer flex h-10 items-center justify-center rounded-md border border-red-200 bg-red-50 px-3.5 text-base font-medium text-red-800 select-none hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-blue-800 active:bg-gray-100"
                    >
                      Delete
                    </AlertDialog.Close>
                  </div>
                </AlertDialog.Popup>
              </AlertDialog.Portal>
            </AlertDialog.Root>
          </div>
        );

      case 'show':
        return (
          <Link
            to={'/experiences/youtube'}
            className="flex justify-between items-center px-6 py-8 bg-transparent backdrop-blur-md text-3xl text-[#224] border-b-2 border-[#1a1a1a]/20 hover:border-[#1a1a1a]/50 transition-all duration-500 relative overflow-hidden"
            style={{
              boxShadow:
                '0 0 25px rgba(26, 26, 26, 0.12), inset 0 0 25px rgba(242, 213, 166, 0.2)',
            }}
          >
            <div className="group-hover:translate-x-1 transition-transform duration-300">
              {theme.label}
            </div>
            <ChevronsRight className="text-[#224]/70 w-8 h-8" />
          </Link>
        );
      default:
        null;
    }
  };

  return (
    <div className="flex flex-col">
      {myThemes.map((theme, index) => (
        <div
          key={theme.id}
          className="relative"
          style={{
            animation: 'fadeInUp 0.5s ease-out forwards',
            animationDelay: `${index * 0.1}s`,
            opacity: 0,
          }}
        >
          {renderThemeItem(theme, viewMode, onRemove)}
        </div>
      ))}
    </div>
  );
}

export default function ThemeListManager() {
  const [viewMode, setViewMode] = useState<ViewMode>('show');
  const [themeList, setThemeList] = useState<Theme[]>([]);
  const [showAddThemeDialog, setShowAddThemeDialog] = useState<boolean>(false);
  const [createThemeInputValue, setCreateThemeInputValue] =
    useState<string>('');

  const menuItems = [
    {
      label: 'Create theme',
      icon: SquarePlus,
      onClick: () => setShowAddThemeDialog(true),
    },
    {
      label: 'Remove',
      icon: SquareMinus,
      onClick: () => setViewMode('remove'),
    },
  ];

  // Event Handlers
  function deleteTheme(themeId: number) {
    setThemeList(themeList.filter((theme) => theme.id !== themeId));
  }
  function addTheme(name: string) {
    setThemeList([...themeList, { label: name, id: Math.random() }]);
    setShowAddThemeDialog(false);
  }

  return (
    <div className="w-full">
      <div className="w-full animate-fade-in px-6 py-4 bg-transparent backdrop-blur-md flex items-center justify-between border-x-0 border-2 border-[#1a1a1a]/20">
        <div className="text-left relative">
          <div className="font-semibold text-2xl text-[#224]">Themes</div>
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
      <MyThemesList
        myThemes={themeList}
        viewMode={viewMode}
        onRemove={deleteTheme}
      />
      {viewMode === 'remove' && (
        <div
          className="absolute bottom-10 w-full flex justify-center
            "
        >
          <button
            onClick={() => setViewMode('show')}
            className=" cursor-pointer animate-fade-in mt-4 px-8 py-4 bg-transparent backdrop-blur-md border-2 border-[#1a1a1a]/30 rounded-2xl overflow-hidden transition-all duration-500 hover:border-[#1a1a1a]/50 active:scale-95 hover:shadow-2xl hover:shadow-[#1a1a1a]/10"
          >
            <span className=" z-10 text-lg font-semibold tracking-wide text-[#224]/80 group-hover:text-[#1a1a1a] transition-colors duration-300">
              Done
            </span>
          </button>
        </div>
      )}
      <AlertDialog.Root open={showAddThemeDialog}>
        <AlertDialog.Portal>
          <AlertDialog.Backdrop className="fixed inset-0 min-h-dvh bg-black opacity-20 transition-all duration-150 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0 dark:opacity-70 supports-[-webkit-touch-callout:none]:absolute" />
          <AlertDialog.Popup className="fixed top-1/2 left-1/2 -mt-8 w-96 max-w-[calc(100vw-3rem)] -translate-x-1/2 -translate-y-1/2 rounded-lg bg-gray-50 p-6 text-gray-900 outline outline-1 outline-gray-200 transition-all duration-150 data-[ending-style]:scale-90 data-[ending-style]:opacity-0 data-[starting-style]:scale-90 data-[starting-style]:opacity-0 dark:outline-gray-300">
            <AlertDialog.Title className="-mt-1.5 mb-1 text-lg font-medium">
              Create theme
            </AlertDialog.Title>
            <form
              className=" flex flex-col"
              onSubmit={(e) => {
                e.preventDefault();
                addTheme(createThemeInputValue);
              }}
            >
              <input
                required
                className="my-4 h-fit w-full rounded-md border border-gray-200 px-3.5 py-2 text-base text-gray-900 focus:outline focus:outline-2 focus:-outline-offset-1 focus:outline-blue-800"
                placeholder="Label your theme feed"
                onChange={(event) =>
                  setCreateThemeInputValue(event.target.value)
                }
              />
              <div className="flex justify-start gap-4">
                <AlertDialog.Close
                  onClick={() => setShowAddThemeDialog(false)}
                  className="cursor-pointer flex h-10 items-center justify-center rounded-md border border-gray-200 bg-gray-50 px-3.5 text-base font-medium text-gray-900 select-none hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-blue-800 active:bg-gray-100"
                >
                  Cancel
                </AlertDialog.Close>
                <input
                  type="submit"
                  className="cursor-pointer flex h-10 items-center justify-center rounded-md border border-blue-200 bg-blue-50 px-3.5 text-base font-medium text-blue-700 select-none hover:bg-blue-100 focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-blue-600 active:bg-blue-100"
                  value="Create"
                />
              </div>
            </form>
          </AlertDialog.Popup>
        </AlertDialog.Portal>
      </AlertDialog.Root>
    </div>
  );
}
