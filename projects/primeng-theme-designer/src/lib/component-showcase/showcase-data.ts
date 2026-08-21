import {MegaMenuItem, MenuItem, ToastMessageOptions, TreeNode} from 'primeng/api';

export interface Product { code: string; name: string; category: string; price: number; inventoryStatus: string; }

/** Fixture/proper-noun mock data - deliberately not translated (see component-showcase.component.ts). */
export const PRODUCTS: Product[] = [
  {code: 'P-100', name: 'Aurora mug', category: 'Accessories', price: 18, inventoryStatus: 'INSTOCK'},
  {code: 'P-200', name: 'Nebula keyboard', category: 'Electronics', price: 89, inventoryStatus: 'LOWSTOCK'},
  {code: 'P-300', name: 'Orbit notebook', category: 'Stationery', price: 12, inventoryStatus: 'OUTOFSTOCK'}
];

export const CITIES = [
  {name: 'Prague', code: 'PRG'}, {name: 'Brno', code: 'BRQ'}, {name: 'Ostrava', code: 'OSR'}
];

/**
 * The functions below build UI-copy mock data (menu labels, tree labels, toast text, ...) from
 * translation keys instead of hardcoded English, via the `t` translate function the caller
 * supplies (see `component-showcase.component.ts`'s `t` computed signal). File/format names
 * (`Design.pdf`, `PDF`, ...) and proper nouns (`Material`, `Button`, `CEO`, ...) are left literal.
 */

export function buildMenuItems(t: (key: string) => string): MenuItem[] {
  return [
    {label: t('showcase.shared.actions.new'), icon: 'pi pi-plus'},
    {label: t('showcase.shared.actions.edit'), icon: 'pi pi-pencil'},
    {separator: true},
    {label: t('showcase.shared.actions.delete'), icon: 'pi pi-trash'}
  ];
}

export function buildTreeNodes(t: (key: string) => string): TreeNode[] {
  return [
    {key: '0', label: t('showcase.tree.documents'), icon: 'pi pi-folder', expanded: true, children: [
      {key: '0-0', label: 'Design.pdf', icon: 'pi pi-file-pdf'},
      {key: '0-1', label: 'Theme.json', icon: 'pi pi-file'}
    ]},
    {key: '1', label: t('showcase.tree.images'), icon: 'pi pi-images', children: [{key: '1-0', label: 'preview.png', icon: 'pi pi-image'}]}
  ];
}

export function buildTreeTableNodes(t: (key: string) => string): TreeNode[] {
  const folder = t('showcase.tree.folder');
  return [
    {key: '0', data: {name: t('showcase.tree.documents'), type: folder}, expanded: true, children: [
      {key: '0-0', data: {name: 'Design.pdf', type: 'PDF'}},
      {key: '0-1', data: {name: 'Theme.json', type: 'JSON'}}
    ]},
    {key: '1', data: {name: t('showcase.tree.images'), type: folder}, children: [{key: '1-0', data: {name: 'preview.png', type: 'PNG'}}]}
  ];
}

export function buildOrgNodes(t: (key: string) => string): TreeNode[] {
  return [{label: 'CEO', expanded: true, children: [
    {label: t('showcase.org.designLead')}, {label: t('showcase.org.engineeringLead')}
  ]}];
}

export function buildTimelineEvents(t: (key: string) => string) {
  return [
    {status: t('showcase.timeline.themeCreated'), date: '10:30', icon: 'pi pi-palette'},
    {status: t('showcase.timeline.reviewCompleted'), date: '12:15', icon: 'pi pi-check'}
  ];
}

export function buildToastMessages(t: (key: string) => string): ToastMessageOptions[] {
  const detail = t('showcase.toast.detail');
  return [
    {severity: 'success', summary: t('showcase.toast.success'), detail},
    {severity: 'info', summary: t('showcase.toast.info'), detail},
    {severity: 'warn', summary: t('showcase.toast.warn'), detail},
    {severity: 'error', summary: t('showcase.toast.error'), detail},
    {severity: 'secondary', summary: t('showcase.toast.secondary'), detail},
    {severity: 'contrast', summary: t('showcase.toast.contrast'), detail}
  ];
}

export function buildScrollTopCopy(t: (key: string) => string): string[] {
  return [1, 2, 3, 4, 5, 6, 7, 8].map(n => t(`showcase.scrolltop.p${n}`));
}

export function buildBreadcrumbItems(t: (key: string) => string): MenuItem[] {
  return [{label: t('showcase.breadcrumb.themes')}, {label: 'Material'}, {label: t('showcase.breadcrumb.components')}];
}

export function buildMegaMenuItems(t: (key: string) => string): MegaMenuItem[] {
  return [
    {label: t('showcase.megamenu.themes'), icon: 'pi pi-palette', items: [[{items: [{label: 'Material'}, {label: 'Aura'}]}]]},
    {label: t('showcase.megamenu.designer'), icon: 'pi pi-sliders-h'}
  ];
}

export function buildPanelMenuItems(t: (key: string) => string): MenuItem[] {
  return [
    {label: t('showcase.panelmenu.colors'), icon: 'pi pi-palette', items: [
      {label: t('showcase.panelmenu.primary')}, {label: t('showcase.panelmenu.surface')}
    ]},
    {label: t('showcase.panelmenu.typography'), icon: 'pi pi-align-left'}
  ];
}

export function buildTieredMenuItems(t: (key: string) => string): MenuItem[] {
  return [
    {label: t('showcase.tieredmenu.components'), icon: 'pi pi-box', items: [{label: 'Button'}, {label: 'Card'}]},
    {label: t('showcase.tieredmenu.semantic'), icon: 'pi pi-sitemap'}
  ];
}

export function buildMeterValues(t: (key: string) => string) {
  return [
    {label: t('showcase.metergroup.primary'), value: 45, color: '#3b82f6'},
    {label: t('showcase.metergroup.surface'), value: 30, color: '#64748b'}
  ];
}

export function buildChartData(t: (key: string) => string) {
  return {
    labels: [t('showcase.chart.primary'), t('showcase.chart.surface'), t('showcase.chart.accent')],
    datasets: [{label: 'Tokens', data: [65, 42, 78], backgroundColor: ['#3b82f6', '#64748b', '#a855f7']}]
  };
}

export function buildCountries(t: (key: string) => string) {
  return [{name: t('showcase.shared.countryCzechia'), cities: CITIES}];
}

export function buildGalleryImages(t: (key: string) => string) {
  return [
    {itemImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria1.jpg', thumbnailImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria1s.jpg', alt: t('showcase.shared.altMountain')},
    {itemImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria2.jpg', thumbnailImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria2s.jpg', alt: t('showcase.galleria.altLandscape')}
  ];
}
