import { ChangeDetectionStrategy, Component, OnInit, input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';
import { TooltipModule } from 'primeng/tooltip';

/** One deployed demo build, as listed in the `versions.json` the GitHub Pages workflow generates. */
export interface DemoVersion {
  /** Display text, e.g. `22.1.0 (main)`. */
  label: string;
  /** Absolute URL path of that build's root, always with a trailing slash, e.g. `/primeng-theme-designer/21/`. */
  path: string;
}

/**
 * Lets the visitor jump between the demo builds of the individual release lines deployed side by
 * side on GitHub Pages (main at the site root, every `release/*` branch in its own subfolder).
 *
 * The list is not compiled in: the deploy workflow writes the same `versions.json` next to every
 * build's `index.html`, so even an older build offers versions released after it. Without that
 * file (`ng serve`, a single local build) the switcher stays hidden.
 */
@Component({
  selector: 'app-version-switcher',
  imports: [SelectModule, FormsModule, TooltipModule],
  template: `
    @if (versions().length > 1) {
      <p-select class="version-switcher" [options]="versions()" optionLabel="label"
                [ngModel]="current()" (ngModelChange)="switchTo($event)"
                [pTooltip]="label()" tooltipPosition="left" [ariaLabel]="label()" />
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class VersionSwitcherComponent implements OnInit {
  readonly label = input('');

  protected readonly versions = signal<DemoVersion[]>([]);
  protected readonly current = signal<DemoVersion | undefined>(undefined);

  async ngOnInit(): Promise<void> {
    try {
      const response = await fetch(new URL('versions.json', document.baseURI), { cache: 'no-cache' });
      if (!response.ok) return;
      const versions: DemoVersion[] = (await response.json()).versions ?? [];
      this.versions.set(versions);
      this.current.set(VersionSwitcherComponent.findCurrent(versions, window.location.pathname));
    } catch {
      // No versions.json (local dev) or it is malformed - the switcher simply isn't shown.
    }
  }

  protected switchTo(version: DemoVersion): void {
    if (version.path === this.current()?.path) return;
    // The hash is the selected showcase section, which every version understands.
    window.location.href = version.path + window.location.hash;
  }

  /** The site root's path is a prefix of every other version's, so the longest matching path wins. */
  private static findCurrent(versions: DemoVersion[], pathname: string): DemoVersion | undefined {
    return versions
      .filter(v => pathname.startsWith(v.path) || pathname + '/' === v.path)
      .sort((a, b) => b.path.length - a.path.length)[0];
  }
}
