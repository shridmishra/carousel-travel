"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Sun01Icon, Moon02Icon } from "hugeicons-react";
import { Button } from "@/components/ui/button";

const emptySubscribe = () => () => {};

function useMounted() {
  return React.useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const mounted = useMounted();

  if (!mounted) {
    return (
      <Button
        variant="outline"
        size="icon"
        className="size-9 rounded-lg"
        aria-label="Toggle theme"
      >
        <span className="size-4" />
      </Button>
    );
  }

  const isDark = resolvedTheme === "dark" || theme === "dark";

  return (
    <Button
      variant="outline"
      size="icon"
      className="size-9 rounded-lg"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label="Toggle theme"
    >
      {isDark ? (
        <Sun01Icon className="size-4 text-foreground transition-transform duration-200 rotate-0 [@media(hover:hover)_and_(pointer:fine)]:hover:rotate-45" />
      ) : (
        <Moon02Icon className="size-4 text-foreground transition-transform duration-200 -rotate-12 [@media(hover:hover)_and_(pointer:fine)]:hover:rotate-0" />
      )}
    </Button>
  );
}
