import {MenuItem, ToastMessageOptions, TreeNode} from 'primeng/api';

export interface Product { code: string; name: string; category: string; price: number; inventoryStatus: string; }

export const PRODUCTS: Product[] = [
  {code: 'P-100', name: 'Aurora mug', category: 'Accessories', price: 18, inventoryStatus: 'INSTOCK'},
  {code: 'P-200', name: 'Nebula keyboard', category: 'Electronics', price: 89, inventoryStatus: 'LOWSTOCK'},
  {code: 'P-300', name: 'Orbit notebook', category: 'Stationery', price: 12, inventoryStatus: 'OUTOFSTOCK'}
];

export const CITIES = [
  {name: 'Prague', code: 'PRG'}, {name: 'Brno', code: 'BRQ'}, {name: 'Ostrava', code: 'OSR'}
];

export const MENU_ITEMS: MenuItem[] = [
  {label: 'New', icon: 'pi pi-plus'},
  {label: 'Edit', icon: 'pi pi-pencil'},
  {separator: true},
  {label: 'Delete', icon: 'pi pi-trash'}
];

export const TREE_NODES: TreeNode[] = [
  {key: '0', label: 'Documents', icon: 'pi pi-folder', expanded: true, children: [
    {key: '0-0', label: 'Design.pdf', icon: 'pi pi-file-pdf'},
    {key: '0-1', label: 'Theme.json', icon: 'pi pi-file'}
  ]},
  {key: '1', label: 'Images', icon: 'pi pi-images', children: [{key: '1-0', label: 'preview.png', icon: 'pi pi-image'}]}
];

export const TREE_TABLE_NODES: TreeNode[] = [
  {key: '0', data: {name: 'Documents', type: 'Folder'}, expanded: true, children: [
    {key: '0-0', data: {name: 'Design.pdf', type: 'PDF'}},
    {key: '0-1', data: {name: 'Theme.json', type: 'JSON'}}
  ]},
  {key: '1', data: {name: 'Images', type: 'Folder'}, children: [{key: '1-0', data: {name: 'preview.png', type: 'PNG'}}]}
];

export const ORG_NODES: TreeNode[] = [{label: 'CEO', expanded: true, children: [
  {label: 'Design lead'}, {label: 'Engineering lead'}
]}];

export const TIMELINE_EVENTS = [
  {status: 'Theme created', date: '10:30', icon: 'pi pi-palette'},
  {status: 'Review completed', date: '12:15', icon: 'pi pi-check'}
];

export const TOAST_MESSAGES: ToastMessageOptions[] = [
  {severity: 'success', summary: 'Success', detail: 'Mock notification'},
  {severity: 'info', summary: 'Info', detail: 'Mock notification'},
  {severity: 'warn', summary: 'Warn', detail: 'Mock notification'},
  {severity: 'error', summary: 'Error', detail: 'Mock notification'},
  {severity: 'secondary', summary: 'Secondary', detail: 'Mock notification'},
  {severity: 'contrast', summary: 'Contrast', detail: 'Mock notification'}
];

export const SCROLL_TOP_COPY: string[] = [
  'Scroll this box to reveal the global control. It sticks to the bottom-right corner once you pass the threshold.',
  'PrimeNG theme tokens cascade from primitive values through semantic aliases down to per-component overrides.',
  'The theme designer lets you edit any of those layers live and preview the result across the whole component set.',
  'Once the scroll position clears the configured threshold, the ScrollTop button fades in and stays pinned in view.',
  'Palettes, radii and spacing scales all flow from the same primitive layer, keeping every component visually consistent.',
  'Semantic tokens map those primitives to roles like primary, surface and text, so a single edit ripples everywhere.',
  'Component-level overrides let you fine-tune one widget without touching the shared semantic layer underneath.',
  'Keep scrolling to see it settle near the middle of this panel, right where the default scroll position lands.'
];
