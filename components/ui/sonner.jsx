"use client"

import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";

const Toaster = (props) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme}
      className="toaster group"
      toastOptions={{
        swipeClose: true,
        classNames: {
          toast: "group toast flex items-start gap-3 p-4 bg-white border border-gray-200 rounded-lg shadow-sm group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground text-xs text-gray-500",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground text-xs px-3 py-1 h-auto",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
          icon: '!w-[1.5rem] !h-[1.5rem] mt-0.5 flex-shrink-0 group-data-[type=error]:text-red-500 group-data-[type=success]:text-green-500 group-data-[type=warning]:text-amber-500 group-data-[type=info]:text-blue-500',
          success: 'text-green-600',
          error: 'text-red-600',
          warning: 'text-yellow-500',
          info: 'text-blue-600',
          loading: 'text-gray-500',
        },
        // Sin icons: Sonner usará los iconos por defecto
      }}
      
      {...props}
    />
  );
};

export { Toaster };
