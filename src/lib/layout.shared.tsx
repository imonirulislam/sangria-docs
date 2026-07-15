import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { Wine } from 'lucide-react';
import { appName, gitConfig } from './shared';

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: (
        <span className="inline-flex items-center gap-2">
          <span className="flex size-6 items-center justify-center rounded-md bg-fd-primary/10 text-fd-primary">
            <Wine className="size-4" />
          </span>
          <span className="font-display text-lg font-semibold tracking-tight text-fd-foreground">
            {appName}
          </span>
          <span className="text-sm text-fd-muted-foreground">docs</span>
        </span>
      ),
    },
    githubUrl: `https://github.com/${gitConfig.user}/${gitConfig.repo}`,
  };
}
