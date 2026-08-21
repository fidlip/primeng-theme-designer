import {AfterViewInit, Component, computed, effect, ElementRef, EventEmitter, inject, Output, ViewChild} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {PtdTranslatePipe} from '../i18n/translate.pipe';
import {PtdTranslateService} from '../i18n/translate.service';
import {BlockableUI, ConfirmationService, MessageService, TreeNode} from 'primeng/api';
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
import {ConfirmDialog, ConfirmDialogModule} from 'primeng/confirmdialog';
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
import {
  applyTreeNodeLabels, buildBreadcrumbItems, buildChartData, buildGalleryImages, buildMegaMenuItems, buildMenuItems,
  buildMeterValues, buildOrgNodes, buildPanelMenuItems, buildScrollTopCopy, buildTieredMenuItems, buildTimelineEvents,
  buildToastMessages, buildTreeTableNodes, CITIES, COUNTRIES, createTreeNodesBase, PRODUCTS,
} from './showcase-data';

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
  SpeedDialModule, SplitButtonModule, SplitterModule, StepperModule, TableModule, TabsModule,
  TagModule, TerminalModule, TextareaModule, TieredMenuModule, TimelineModule, ToastModule, ToggleButtonModule, ToggleSwitchModule,
  ToolbarModule, TreeModule, TreeSelectModule, TreeTableModule];

/**
 * Renders one instance of (almost) every visual PrimeNG component, pre-populated with mock data
 * and forced open where an overlay would otherwise render nothing until interacted with, next to
 * a palette icon that emits `editTheme` with the component's theme-object anchor.
 *
 * **Developer/reference tool only** - like `ThemeDesignerComponent` itself, this is meant for
 * building and previewing a theme during development (see the README), not for shipping to end
 * users as part of a production UI. It force-opens overlays, patches `HTMLElement.prototype.focus`
 * temporarily to suppress scroll-stealing, and renders a large amount of DOM at once.
 */
@Component({
  selector: 'primeng-component-showcase',
  standalone: true,
  imports: [CommonModule, FormsModule, PtdTranslatePipe, ShowcaseSectionComponent, ...PRIME_MODULES],
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
  @ViewChild('confirmDialog') confirmDialogRef?: ConfirmDialog;
  @ViewChild('confirmPopup') confirmPopupRef?: ConfirmPopup;
  @ViewChild('contextMenu') contextMenuRef?: ContextMenu;
  @ViewChild('contextTarget') contextTargetRef?: ElementRef<HTMLElement>;
  @ViewChild('treeSelect') treeSelectRef?: TreeSelect;
  @ViewChild('treeSelectHost') treeSelectHostRef?: ElementRef<HTMLElement>;
  @ViewChild('blockTarget') blockTargetRef?: ElementRef<HTMLElement>;
  private readonly translateService = inject(PtdTranslateService);
  /** Reactive translate function: recomputes every array below whenever the language changes. */
  private readonly t = computed(() => {
    this.translateService.lang();
    return (key: string) => this.translateService.translate(key);
  });

  readonly blockUiTarget: BlockableUI = {getBlockableElement: () => this.blockTargetRef!.nativeElement};
  readonly products = PRODUCTS;
  readonly cities = CITIES;
  readonly scrollTopCopy = computed(() => buildScrollTopCopy(this.t()));
  readonly menuItems = computed(() => buildMenuItems(this.t()));
  readonly actionItems = computed(() => this.menuItems().filter(item => !item.separator));
  /**
   * Not translated (proper noun) and not recreated on language change - see the module doc
   * comment on `createTreeNodesBase`/`applyTreeNodeLabels` in showcase-data.ts for why CascadeSelect
   * needs `countries` to keep a stable identity across language switches.
   */
  readonly countries = COUNTRIES;
  /** Stable node identity (see showcase-data.ts); labels are kept in sync by the effect below. */
  private readonly treeNodesBase = createTreeNodesBase();
  readonly treeNodes = this.treeNodesBase;
  readonly treeTableNodes = computed(() => buildTreeTableNodes(this.t()));
  readonly orgNodes = computed(() => buildOrgNodes(this.t()));
  readonly timelineEvents = computed(() => buildTimelineEvents(this.t()));
  readonly breadcrumbItems = computed(() => buildBreadcrumbItems(this.t()));
  readonly megaMenuItems = computed(() => buildMegaMenuItems(this.t()));
  readonly panelMenuItems = computed(() => buildPanelMenuItems(this.t()));
  readonly tieredMenuItems = computed(() => buildTieredMenuItems(this.t()));
  readonly meterValues = computed(() => buildMeterValues(this.t()));
  readonly chartData = computed(() => buildChartData(this.t()));
  readonly galleryImages = computed(() => buildGalleryImages(this.t()));
  readonly responsiveOptions = [{breakpoint: '1024px', numVisible: 2, numScroll: 1}, {breakpoint: '600px', numVisible: 1, numScroll: 1}];
  readonly chartOptions = {plugins: {legend: {display: false}}, maintainAspectRatio: false};
  selectedCity = this.cities[0]; selectedCities = [this.cities[0]]; text = 'PrimeNG'; numeric = 42; checked = true;
  date = new Date(); color = '#3b82f6'; rating = 4; slider = 55; treeSelection?: TreeNode; toggle = true;
  editorText = `<p>${this.t()('showcase.editor.content')}</p>`;
  sourceProducts = [...PRODUCTS]; targetProducts = [PRODUCTS[2]];

  /**
   * Kept hidden via CSS (`.terminal-ready` in component-showcase.component.scss) until this
   * flips true, so PrimeNG's hardcoded `autofocus` on Terminal's prompt input - which the browser
   * applies the instant the element is inserted, well before any JS here can react - has nothing
   * to focus yet. Two rAFs is a conservative wait past the browser's next render, by which point
   * autofocus handling for this insertion has already been resolved either way.
   */
  protected terminalReady = false;

  constructor(private readonly confirmation: ConfirmationService, private readonly messages: MessageService) {
    effect(() => applyTreeNodeLabels(this.treeNodesBase, this.t()));
  }

  ngAfterViewInit(): void {
    this.disableConfirmDialogRejectAutofocus();
    this.suppressFocusScrollUntilSettled();
    this.forceOpenOverlays();
    this.scheduleTerminalReveal();
  }

  /**
   * PrimeNG v20's `pAutoFocus` directive (used internally by `p-button`) has a bug where it stamps
   * a stray `autofocus="true"` attribute onto every button regardless of whether it asked for one
   * (a strict `=== false` check that should be a truthiness check) - including this dialog's reject
   * button, which the browser then autofocuses, and drags the page's scroll along with it, the
   * moment the dialog becomes visible below. ConfirmDialog's own `defaultFocus` input can't help:
   * the method that would read it is dead code in this PrimeNG version. The button already exists
   * in the DOM at this point (Angular's void->visible show animation needs it there beforehand), so
   * clearing its `autofocus` property once, up front, disarms the native autofocus before the
   * dialog ever opens - cheaper and more direct than reacting to the scroll after the fact.
   */
  private disableConfirmDialogRejectAutofocus(): void {
    const nativeElement = this.confirmDialogRef?.el.nativeElement as HTMLElement | undefined;
    const rejectButton = nativeElement?.querySelector<HTMLButtonElement>('.p-confirmdialog-reject-button');
    if (rejectButton) rejectButton.autofocus = false;
  }

  /**
   * Belt-and-suspenders beyond the reject-button fix above: anything else in this page's ~90
   * forced-open components that calls `focus()` without `preventScroll` during the same settling
   * window would drag the page's scroll along with it too. Must run before forceOpenOverlays()
   * triggers any of that. How long settling takes varies with machine load (a shorter window here
   * meant a slower load, e.g. with devtools open, could let a late focus() land outside it and win)
   * - a MutationObserver that waits for the DOM to go quiet would track that precisely, but
   * watching this page's own subtree (~90 components' worth of ripple/toast/animation churn) is
   * itself expensive enough to make things worse. A generously long flat window is the cheaper
   * trade-off here.
   */
  private suppressFocusScrollUntilSettled(): void {
    const originalFocus = HTMLElement.prototype.focus;
    HTMLElement.prototype.focus = function (options?: FocusOptions) {
      originalFocus.call(this, {...options, preventScroll: true});
    };
    setTimeout(() => {
      HTMLElement.prototype.focus = originalFocus;
    }, 15000);
  }

  /**
   * Popup/overlay-style components render nothing until triggered by a click or hover, which
   * defeats the point of a showcase meant to be scanned without interacting. Forces those open
   * immediately so their themed state is visible on load; child components must already be
   * subscribed/rendered for that, hence doing it in AfterViewInit rather than OnInit.
   */
  private forceOpenOverlays(): void {
    const host = this.scrollTopHost?.nativeElement;
    if (host) host.scrollTop = (host.scrollHeight - host.clientHeight) / 2;
    this.messages.addAll(buildToastMessages(this.t()).map(message => ({...message, key: 'showcase', sticky: true, closable: false})));
    this.confirmation.confirm({key: 'confirmdialog-demo', message: this.applyThemeConfirmMessage(), accept: () => undefined});

    // Popover/ConfirmPopup/ContextMenu position themselves off their anchor's current layout
    // position; deferring a tick lets the sections above (which just grew from the triggers
    // above) finish reflowing first, so the anchors below them are measured in their final spot.
    setTimeout(() => this.forceOpenDeferredOverlays());
  }

  private forceOpenDeferredOverlays(): void {
    if (this.confirmPopupAnchor) {
      this.confirmation.confirm({
        key: 'confirmpopup-demo', target: this.confirmPopupAnchor.nativeElement,
        message: this.applyThemeConfirmMessage(), accept: () => undefined,
      });
    }
    this.popoverRef?.show(null, this.popoverAnchor?.nativeElement);
    // TreeSelect.show() sets its internal state but - unlike hide() - never calls markForCheck(),
    // so its OnPush view never repaints from that direct call. Dispatching the mousedown its own
    // host listener actually reacts to (not click) opens it the same way a real user would.
    this.treeSelectHostRef?.nativeElement
      .querySelector('[data-pc-section="label"]')
      ?.dispatchEvent(new MouseEvent('mousedown', {bubbles: true, cancelable: true, view: window}));
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
    this.preventOverlaysClosingOnOutsideClick();
  }

  /**
   * ConfirmPopup/ContextMenu/TreeSelect hide themselves on the next outside click with no way
   * to opt out via inputs, which would undo the forced-open state above the moment the user
   * clicks anywhere else on the page. Since these instances only exist to display their
   * themed appearance (not to be interacted with), neutering hide() keeps them open
   * permanently. TreeSelect delegates its outside-click handling to the underlying p-overlay,
   * so it's that overlay's hide() that needs neutering, not TreeSelect's own.
   */
  private preventOverlaysClosingOnOutsideClick(): void {
    if (this.confirmPopupRef) this.confirmPopupRef.hide = () => undefined;
    if (this.contextMenuRef) this.contextMenuRef.hide = () => undefined;
    if (this.treeSelectRef?.overlayViewChild) this.treeSelectRef.overlayViewChild.hide = () => undefined;
  }

  /** See the terminalReady doc comment - unrelated to the overlay-forcing above. */
  private scheduleTerminalReveal(): void {
    requestAnimationFrame(() => requestAnimationFrame(() => {
      this.terminalReady = true;
    }));
  }
  filterCities(event: {query: string}): void { this.filteredCities = this.cities.filter(city => city.name.toLowerCase().includes(event.query.toLowerCase())); }
  filteredCities = [...this.cities];

  private applyThemeConfirmMessage(): string {
    return this.t()('showcase.shared.applyThemeConfirm');
  }
}
