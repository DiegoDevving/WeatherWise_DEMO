'use client'

import * as React from 'react'
import * as DrawerPrimitive from '@radix-ui/react-dialog'

import { cn } from '@/lib/utils'

type DrawerDirection = 'top' | 'right' | 'bottom' | 'left'

function Drawer({ ...props }: React.ComponentProps<typeof DrawerPrimitive.Root>) {
  return <DrawerPrimitive.Root data-slot="drawer" {...props} />
}

function DrawerTrigger({ ...props }: React.ComponentProps<typeof DrawerPrimitive.Trigger>) {
  return <DrawerPrimitive.Trigger data-slot="drawer-trigger" {...props} />
}

function DrawerPortal({ ...props }: React.ComponentProps<typeof DrawerPrimitive.Portal>) {
  return <DrawerPrimitive.Portal data-slot="drawer-portal" {...props} />
}

function DrawerClose({ ...props }: React.ComponentProps<typeof DrawerPrimitive.Close>) {
  return <DrawerPrimitive.Close data-slot="drawer-close" {...props} />
}

function DrawerOverlay({ className, ...props }: React.ComponentProps<typeof DrawerPrimitive.Overlay>) {
  return (
    <DrawerPrimitive.Overlay
      data-slot="drawer-overlay"
      className={cn(
        'fixed inset-0 z-50 bg-black/50 data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=open]:animate-in',
        className,
      )}
      {...props}
    />
  )
}

type DrawerContentProps = React.ComponentProps<typeof DrawerPrimitive.Content> & {
  direction?: DrawerDirection
}

function DrawerContent({ className, children, direction = 'bottom', ...props }: DrawerContentProps) {
  return (
    <DrawerPortal data-slot="drawer-portal">
      <DrawerOverlay />
      <DrawerPrimitive.Content
        data-slot="drawer-content"
        data-direction={direction}
        className={cn(
          'group/drawer-content fixed z-50 flex h-auto flex-col bg-background',
          direction === 'top' &&
            'inset-x-0 top-0 mb-24 max-h-[80vh] rounded-b-lg border-b md:max-h-[85vh]',
          direction === 'bottom' &&
            'inset-x-0 bottom-0 mt-24 max-h-[80vh] rounded-t-lg border-t md:max-h-[85vh]',
          direction === 'right' &&
            'inset-y-0 right-0 w-3/4 border-l sm:max-w-sm',
          direction === 'left' &&
            'inset-y-0 left-0 w-3/4 border-r sm:max-w-sm',
          className,
        )}
        {...props}
      >
        {direction === 'bottom' && (
          <div className="mx-auto mt-4 hidden h-2 w-[100px] shrink-0 rounded-full bg-muted group-data-[direction=bottom]/drawer-content:block" />
        )}
        {children}
      </DrawerPrimitive.Content>
    </DrawerPortal>
  )
}

function DrawerHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="drawer-header"
      className={cn(
        'flex flex-col gap-0.5 p-4 md:gap-1.5 md:text-left',
        'group-data-[direction=bottom]/drawer-content:text-center group-data-[direction=top]/drawer-content:text-center',
        className,
      )}
      {...props}
    />
  )
}

function DrawerFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div data-slot="drawer-footer" className={cn('mt-auto flex flex-col gap-2 p-4', className)} {...props} />
  )
}

function DrawerTitle({ className, ...props }: React.ComponentProps<typeof DrawerPrimitive.Title>) {
  return (
    <DrawerPrimitive.Title data-slot="drawer-title" className={cn('font-semibold text-foreground', className)} {...props} />
  )
}

function DrawerDescription({ className, ...props }: React.ComponentProps<typeof DrawerPrimitive.Description>) {
  return (
    <DrawerPrimitive.Description
      data-slot="drawer-description"
      className={cn('text-sm text-muted-foreground', className)}
      {...props}
    />
  )
}

export {
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
}
