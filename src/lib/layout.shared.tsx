import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { appName, gitConfig } from './shared';

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: (
        <span className="inline-flex items-center gap-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo-mark.svg" alt="" className="size-6 rounded-md" />
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
