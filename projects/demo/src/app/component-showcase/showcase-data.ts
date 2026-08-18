import {MenuItem, TreeNode} from 'primeng/api';

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

export const ORG_NODES: TreeNode[] = [{label: 'CEO', expanded: true, children: [
  {label: 'Design lead'}, {label: 'Engineering lead'}
]}];

export const TIMELINE_EVENTS = [
  {status: 'Theme created', date: '10:30', icon: 'pi pi-palette'},
  {status: 'Review completed', date: '12:15', icon: 'pi pi-check'}
];
