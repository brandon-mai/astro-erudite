'use client'

import { useState, useEffect, Fragment } from 'react'
import { Button } from '@/components/ui/button'
import { NAV_LINKS } from '@/consts'
import { Menu as MenuIcon } from 'lucide-react'
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const handleViewTransitionStart = () => {
      setIsOpen(false)
    }

    document.addEventListener('astro:before-swap', handleViewTransitionStart)

    return () => {
      document.removeEventListener(
        'astro:before-swap',
        handleViewTransitionStart,
      )
    }
  }, [])

  return (
    <DropdownMenu open={isOpen} onOpenChange={(val) => setIsOpen(val)}>
      <DropdownMenuTrigger asChild
        onClick={() => {
          setIsOpen((val) => !val);
        }}
      >
        <Button
          variant="outline"
          size="icon"
          className="md:hidden"
          title="Menu"
        >
          <MenuIcon className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-background">
        {NAV_LINKS.map((item) => (
          <DropdownMenuItem key={item.href} asChild>
            <a
              href={item.href}
              className="w-full text-lg font-medium capitalize"
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </a>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

const MobileMenuV2 = () => {
  return (
    <Menu as="div" className="relative inline-block text-left md:hidden">
      <MenuButton
        as={Button}
        variant="outline"
        size="icon"
        className="md:hidden"
        title="Menu"
      >
        <MenuIcon className="h-5 w-5" />
        <span className="sr-only">Toggle menu</span>
      </MenuButton>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <MenuItems className="absolute right-0 mt-2 w-32 origin-top-right rounded-md bg-background border shadow-lg focus:outline-none">
          <div className="px-1 py-1">
            {NAV_LINKS.map((item) => (
              <MenuItem key={item.href}>
                {({ focus }) => (
                  <a
                    href={item.href}
                    className={`${
                      focus ? 'bg-secondary/50' : ''
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm font-medium capitalize`}
                  >
                    {item.label}
                  </a>
                )}
              </MenuItem>
            ))}
          </div>
        </MenuItems>
      </Transition>
    </Menu>
  )
}

export { MobileMenuV2, MobileMenu }
