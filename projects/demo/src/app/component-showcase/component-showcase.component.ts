import {AfterViewInit, Component, ElementRef, EventEmitter, Output, ViewChild} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {BlockableUI, ConfirmationService, MessageService} from 'primeng/api';
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
import {ChipsModule} from 'primeng/chips';
import {ColorPickerModule} from 'primeng/colorpicker';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmPopup, ConfirmPopupModule} from 'primeng/confirmpopup';
import {ContextMenu, ContextMenuModule} from 'primeng/contextmenu';
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
import {Popover, PopoverModule} from 'primeng/popover';
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
import {TabsModule} from 'primeng/tabs';
import {TagModule} from 'primeng/tag';
import {TerminalModule, TerminalService} from 'primeng/terminal';
import {TextareaModule} from 'primeng/textarea';
import {TieredMenuModule} from 'primeng/tieredmenu';
import {TimelineModule} from 'primeng/timeline';
import {ToastModule} from 'primeng/toast';
import {ToggleButtonModule} from 'primeng/togglebutton';
import {ToggleSwitchModule} from 'primeng/toggleswitch';
import {ToolbarModule} from 'primeng/toolbar';
import {TreeModule} from 'primeng/tree';
import {TreeSelect, TreeSelectModule} from 'primeng/treeselect';
import {TreeTableModule} from 'primeng/treetable';
import {ShowcaseSectionComponent} from './showcase-section.component';
import {CITIES, MENU_ITEMS, ORG_NODES, PRODUCTS, SCROLL_TOP_COPY, TIMELINE_EVENTS, TOAST_MESSAGES, TREE_NODES, TREE_TABLE_NODES} from './showcase-data';

const PRIME_MODULES = [AccordionModule, AutoCompleteModule, AvatarModule, BadgeModule, BlockUIModule,
  BreadcrumbModule, ButtonModule, ButtonGroupModule, CardModule, CarouselModule, CascadeSelectModule,
  ChartModule, CheckboxModule, ChipModule, ChipsModule, ColorPickerModule, ConfirmDialogModule, ConfirmPopupModule,
  ContextMenuModule, DataViewModule, DatePickerModule, DialogModule, DividerModule, DockModule, DrawerModule,
  EditorModule, FieldsetModule, FileUploadModule, FloatLabelModule, FluidModule, GalleriaModule, IconFieldModule,
  InputIconModule, IftaLabelModule, ImageModule, ImageCompareModule, InplaceModule, InputGroupModule,
  InputGroupAddonModule, InputMaskModule, InputNumberModule, InputOtpModule, InputTextModule, KnobModule,
  ListboxModule, MegaMenuModule, MenuModule, MenubarModule, MessageModule, MeterGroupModule, MultiSelectModule,
  OrderListModule, OrganizationChartModule, OverlayBadgeModule, PaginatorModule, PanelModule, PanelMenuModule,
  PasswordModule, PickListModule, PopoverModule, ProgressBarModule, ProgressSpinnerModule, RadioButtonModule,
  RatingModule, ScrollPanelModule, ScrollTopModule, SelectModule, SelectButtonModule, SkeletonModule, SliderModule,
  SpeedDialModule, SplitButtonModule, SplitterModule, StepperModule, TableModule, TabsModule,
  TagModule, TerminalModule, TextareaModule, TieredMenuModule, TimelineModule, ToastModule, ToggleButtonModule, ToggleSwitchModule,
  ToolbarModule, TreeModule, TreeSelectModule, TreeTableModule];

@Component({
  selector: 'demo-component-showcase',
  standalone: true,
  imports: [CommonModule, FormsModule, ShowcaseSectionComponent, ...PRIME_MODULES],
  providers: [ConfirmationService, MessageService, TerminalService],
  templateUrl: './component-showcase.component.html',
  styleUrl: './component-showcase.component.scss'
})
export class ComponentShowcaseComponent implements AfterViewInit {
  @Output() editTheme = new EventEmitter<string>();
  @ViewChild('scrollTopHost') scrollTopHost?: ElementRef<HTMLDivElement>;
  @ViewChild('popover') popoverRef?: Popover;
  @ViewChild('popoverAnchor') popoverAnchor?: ElementRef<HTMLElement>;
  @ViewChild('confirmPopupAnchor') confirmPopupAnchor?: ElementRef<HTMLElement>;
  @ViewChild('confirmPopup') confirmPopupRef?: ConfirmPopup;
  @ViewChild('contextMenu') contextMenuRef?: ContextMenu;
  @ViewChild('contextTarget') contextTargetRef?: ElementRef<HTMLElement>;
  @ViewChild('treeSelect') treeSelectRef?: TreeSelect;
  @ViewChild('blockTarget') blockTargetRef?: ElementRef<HTMLElement>;
  readonly blockUiTarget: BlockableUI = {getBlockableElement: () => this.blockTargetRef!.nativeElement};
  readonly products = PRODUCTS;
  readonly scrollTopCopy = SCROLL_TOP_COPY;
  readonly cities = CITIES;
  readonly menuItems = MENU_ITEMS;
  readonly actionItems = MENU_ITEMS.filter(item => !item.separator);
  readonly countries = [{name: 'Czechia', cities: CITIES}];
  readonly treeNodes = TREE_NODES;
  readonly treeTableNodes = TREE_TABLE_NODES;
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
  chipsValue = ['Material', 'Dark mode'];
  date = new Date(); color = '#3b82f6'; rating = 4; slider = 55; treeSelection: unknown; toggle = true;
  editorText = '<p>Edit this themed content.</p>';
  sourceProducts = [...PRODUCTS]; targetProducts = [PRODUCTS[2]];

  constructor(private readonly confirmation: ConfirmationService, private readonly messages: MessageService) {}

  /**
   * Popup/overlay-style components render nothing until triggered by a click or hover, which
   * defeats the point of a showcase meant to be scanned without interacting. Everything here
   * forces those components open immediately so their themed state is visible on load; child
   * components must already be subscribed/rendered for that, hence doing it in AfterViewInit
   * rather than OnInit.
   */
  ngAfterViewInit(): void {
    const host = this.scrollTopHost?.nativeElement;
    if (host) host.scrollTop = (host.scrollHeight - host.clientHeight) / 2;
    this.messages.addAll(TOAST_MESSAGES.map(message => ({...message, key: 'showcase', sticky: true, closable: false})));
    this.confirmation.confirm({key: 'confirmdialog-demo', message: 'Apply this theme?', accept: () => undefined});

    // Popover/ConfirmPopup/ContextMenu position themselves off their anchor's current layout
    // position; deferring a tick lets the sections above (which just grew from the triggers
    // above) finish reflowing first, so the anchors below them are measured in their final spot.
    setTimeout(() => {
      if (this.confirmPopupAnchor) {
        this.confirmation.confirm({
          key: 'confirmpopup-demo', target: this.confirmPopupAnchor.nativeElement,
          message: 'Apply this theme?', accept: () => undefined,
        });
      }
      this.popoverRef?.show(null, this.popoverAnchor?.nativeElement);
      this.treeSelectRef?.containerEl?.nativeElement.click();
      const contextTarget = this.contextTargetRef?.nativeElement;
      if (contextTarget) {
        const rect = contextTarget.getBoundingClientRect();
        this.contextMenuRef?.show({
          pageX: rect.left + rect.width / 2 + window.scrollX,
          pageY: rect.top + rect.height / 2 + window.scrollY,
          stopPropagation: () => undefined,
          preventDefault: () => undefined,
        });
      }

      // ConfirmPopup/ContextMenu/TreeSelect hide themselves on the next outside click with no way
      // to opt out via inputs, which would undo the forced-open state above the moment the user
      // clicks anywhere else on the page. Since these instances only exist to display their
      // themed appearance (not to be interacted with), neutering hide() keeps them open
      // permanently. TreeSelect delegates its outside-click handling to the underlying p-overlay,
      // so it's that overlay's hide() that needs neutering, not TreeSelect's own.
      if (this.confirmPopupRef) this.confirmPopupRef.hide = () => undefined;
      if (this.contextMenuRef) this.contextMenuRef.hide = () => undefined;
      if (this.treeSelectRef?.overlayViewChild) this.treeSelectRef.overlayViewChild.hide = () => undefined;
    });
  }
  filterCities(event: {query: string}): void { this.filteredCities = this.cities.filter(city => city.name.toLowerCase().includes(event.query.toLowerCase())); }
  filteredCities = [...this.cities];
}
