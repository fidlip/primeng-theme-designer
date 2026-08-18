import {Component, EventEmitter, Output} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {ConfirmationService, MessageService} from 'primeng/api';
import {AccordionModule} from 'primeng/accordion';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {AvatarModule} from 'primeng/avatar';
import {BadgeModule} from 'primeng/badge';
import {BlockUIModule} from 'primeng/blockui';
import {BreadcrumbModule} from 'primeng/breadcrumb';
import {ButtonModule} from 'primeng/button';
import {ButtonGroupModule} from 'primeng/buttongroup';
import {CardModule} from 'primeng/card';
import {CarouselModule} from 'primeng/carousel';
import {CascadeSelectModule} from 'primeng/cascadeselect';
import {ChartModule} from 'primeng/chart';
import {CheckboxModule} from 'primeng/checkbox';
import {ChipModule} from 'primeng/chip';
import {ColorPickerModule} from 'primeng/colorpicker';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmPopupModule} from 'primeng/confirmpopup';
import {ContextMenuModule} from 'primeng/contextmenu';
import {DataViewModule} from 'primeng/dataview';
import {DatePickerModule} from 'primeng/datepicker';
import {DialogModule} from 'primeng/dialog';
import {DividerModule} from 'primeng/divider';
import {DockModule} from 'primeng/dock';
import {DrawerModule} from 'primeng/drawer';
import {EditorModule} from 'primeng/editor';
import {FieldsetModule} from 'primeng/fieldset';
import {FileUploadModule} from 'primeng/fileupload';
import {FloatLabelModule} from 'primeng/floatlabel';
import {FluidModule} from 'primeng/fluid';
import {GalleriaModule} from 'primeng/galleria';
import {IconFieldModule} from 'primeng/iconfield';
import {InputIconModule} from 'primeng/inputicon';
import {IftaLabelModule} from 'primeng/iftalabel';
import {ImageModule} from 'primeng/image';
import {ImageCompareModule} from 'primeng/imagecompare';
import {InplaceModule} from 'primeng/inplace';
import {InputGroupModule} from 'primeng/inputgroup';
import {InputGroupAddonModule} from 'primeng/inputgroupaddon';
import {InputMaskModule} from 'primeng/inputmask';
import {InputNumberModule} from 'primeng/inputnumber';
import {InputOtpModule} from 'primeng/inputotp';
import {InputTextModule} from 'primeng/inputtext';
import {KnobModule} from 'primeng/knob';
import {ListboxModule} from 'primeng/listbox';
import {MegaMenuModule} from 'primeng/megamenu';
import {MenuModule} from 'primeng/menu';
import {MenubarModule} from 'primeng/menubar';
import {MessageModule} from 'primeng/message';
import {MeterGroupModule} from 'primeng/metergroup';
import {MultiSelectModule} from 'primeng/multiselect';
import {OrderListModule} from 'primeng/orderlist';
import {OrganizationChartModule} from 'primeng/organizationchart';
import {OverlayBadgeModule} from 'primeng/overlaybadge';
import {PaginatorModule} from 'primeng/paginator';
import {PanelModule} from 'primeng/panel';
import {PanelMenuModule} from 'primeng/panelmenu';
import {PasswordModule} from 'primeng/password';
import {PickListModule} from 'primeng/picklist';
import {PopoverModule} from 'primeng/popover';
import {ProgressBarModule} from 'primeng/progressbar';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {RadioButtonModule} from 'primeng/radiobutton';
import {RatingModule} from 'primeng/rating';
import {ScrollPanelModule} from 'primeng/scrollpanel';
import {ScrollTopModule} from 'primeng/scrolltop';
import {SelectModule} from 'primeng/select';
import {SelectButtonModule} from 'primeng/selectbutton';
import {SkeletonModule} from 'primeng/skeleton';
import {SliderModule} from 'primeng/slider';
import {SpeedDialModule} from 'primeng/speeddial';
import {SplitButtonModule} from 'primeng/splitbutton';
import {SplitterModule} from 'primeng/splitter';
import {StepperModule} from 'primeng/stepper';
import {TableModule} from 'primeng/table';
import {TabMenuModule} from 'primeng/tabmenu';
import {TabsModule} from 'primeng/tabs';
import {TagModule} from 'primeng/tag';
import {TextareaModule} from 'primeng/textarea';
import {TieredMenuModule} from 'primeng/tieredmenu';
import {TimelineModule} from 'primeng/timeline';
import {ToastModule} from 'primeng/toast';
import {ToggleButtonModule} from 'primeng/togglebutton';
import {ToggleSwitchModule} from 'primeng/toggleswitch';
import {ToolbarModule} from 'primeng/toolbar';
import {TooltipModule} from 'primeng/tooltip';
import {TreeModule} from 'primeng/tree';
import {TreeSelectModule} from 'primeng/treeselect';
import {TreeTableModule} from 'primeng/treetable';
import {ShowcaseSectionComponent} from './showcase-section.component';
import {CITIES, MENU_ITEMS, ORG_NODES, PRODUCTS, TIMELINE_EVENTS, TREE_NODES} from './showcase-data';

const PRIME_MODULES = [AccordionModule, AutoCompleteModule, AvatarModule, BadgeModule, BlockUIModule,
  BreadcrumbModule, ButtonModule, ButtonGroupModule, CardModule, CarouselModule, CascadeSelectModule,
  ChartModule, CheckboxModule, ChipModule, ColorPickerModule, ConfirmDialogModule, ConfirmPopupModule,
  ContextMenuModule, DataViewModule, DatePickerModule, DialogModule, DividerModule, DockModule, DrawerModule,
  EditorModule, FieldsetModule, FileUploadModule, FloatLabelModule, FluidModule, GalleriaModule, IconFieldModule,
  InputIconModule, IftaLabelModule, ImageModule, ImageCompareModule, InplaceModule, InputGroupModule,
  InputGroupAddonModule, InputMaskModule, InputNumberModule, InputOtpModule, InputTextModule, KnobModule,
  ListboxModule, MegaMenuModule, MenuModule, MenubarModule, MessageModule, MeterGroupModule, MultiSelectModule,
  OrderListModule, OrganizationChartModule, OverlayBadgeModule, PaginatorModule, PanelModule, PanelMenuModule,
  PasswordModule, PickListModule, PopoverModule, ProgressBarModule, ProgressSpinnerModule, RadioButtonModule,
  RatingModule, ScrollPanelModule, ScrollTopModule, SelectModule, SelectButtonModule, SkeletonModule, SliderModule,
  SpeedDialModule, SplitButtonModule, SplitterModule, StepperModule, TableModule, TabMenuModule, TabsModule,
  TagModule, TextareaModule, TieredMenuModule, TimelineModule, ToastModule, ToggleButtonModule, ToggleSwitchModule,
  ToolbarModule, TooltipModule, TreeModule, TreeSelectModule, TreeTableModule];

@Component({
  selector: 'demo-component-showcase',
  standalone: true,
  imports: [CommonModule, FormsModule, ShowcaseSectionComponent, ...PRIME_MODULES],
  providers: [ConfirmationService, MessageService],
  templateUrl: './component-showcase.component.html',
  styleUrl: './component-showcase.component.scss'
})
export class ComponentShowcaseComponent {
  @Output() editTheme = new EventEmitter<string>();
  readonly products = PRODUCTS;
  readonly cities = CITIES;
  readonly menuItems = MENU_ITEMS;
  readonly actionItems = MENU_ITEMS.filter(item => !item.separator);
  readonly countries = [{name: 'Czechia', cities: CITIES}];
  readonly treeNodes = TREE_NODES;
  readonly orgNodes = ORG_NODES;
  readonly timelineEvents = TIMELINE_EVENTS;
  readonly responsiveOptions = [{breakpoint: '1024px', numVisible: 2, numScroll: 1}, {breakpoint: '600px', numVisible: 1, numScroll: 1}];
  readonly chartData = {labels: ['Primary', 'Surface', 'Accent'], datasets: [{label: 'Tokens', data: [65, 42, 78], backgroundColor: ['#3b82f6', '#64748b', '#a855f7']}]};
  readonly chartOptions = {plugins: {legend: {display: false}}, maintainAspectRatio: false};
  readonly meterValues = [{label: 'Primary', value: 45, color: '#3b82f6'}, {label: 'Surface', value: 30, color: '#64748b'}];
  readonly galleryImages = [
    {itemImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria1.jpg', thumbnailImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria1s.jpg', alt: 'Mountain'},
    {itemImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria2.jpg', thumbnailImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria2s.jpg', alt: 'Landscape'}
  ];
  selectedCity = this.cities[0]; selectedCities = [this.cities[0]]; text = 'PrimeNG'; numeric = 42; checked = true;
  date = new Date(); color = '#3b82f6'; rating = 4; slider = 55; treeSelection: unknown; toggle = true;
  dialogVisible = false; drawerVisible = false; blocked = false; editorText = '<p>Edit this themed content.</p>';
  sourceProducts = [...PRODUCTS]; targetProducts = [PRODUCTS[2]];

  constructor(private readonly confirmation: ConfirmationService, private readonly messages: MessageService) {}
  filterCities(event: {query: string}): void { this.filteredCities = this.cities.filter(city => city.name.toLowerCase().includes(event.query.toLowerCase())); }
  filteredCities = [...this.cities];
  confirm(event: Event): void { this.confirmation.confirm({target: event.currentTarget as EventTarget, message: 'Apply this theme?', accept: () => undefined}); }
  toast(): void { this.messages.add({severity: 'success', summary: 'Theme saved', detail: 'Mock notification'}); }
}
