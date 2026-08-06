import { DecimalPipe } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  NgZone,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { CHOOSE_PLAN_TIERS } from './choose-plan.data';
import { PlanTier, PlanTierId, ProviderOffer } from './choose-plan.model';

@Component({
  selector: 'app-choose-plan-mobile',
  templateUrl: './choose-plan.component.html',
  styleUrls: ['./choose-plan.component.scss']
})
export class ChoosePlanComponent implements OnInit, OnDestroy {
  /** Override the catalogue from the parent once the pricing API is wired up. */
  @Input() tiers: PlanTier[] = CHOOSE_PLAN_TIERS;

  /** Which tab opens first. */
  @Input() initialTierId: PlanTierId = 'economic';

  /** Emitted when the user confirms with the bottom CTA. */
  @Output() planChosen = new EventEmitter<ProviderOffer>();

  /** Emitted whenever the highlighted card changes (tab switch included). */
  @Output() offerSelected = new EventEmitter<ProviderOffer>();

  activeTierId: PlanTierId = 'economic';

  /** Only one accordion may be open at a time, so a single id is enough state. */
  expandedOfferId: string | null = null;

  /** Selection is remembered per tab, so switching back restores the user's pick. */
  private selectionByTier: Partial<Record<PlanTierId, string>> = {};

  showScrollHint = false;

  readonly currencySymbol = '₺';

  constructor(
    private translate: TranslateService,
    private decimalPipe: DecimalPipe,
    private host: ElementRef<HTMLElement>,
    private zone: NgZone
  ) {}

  ngOnInit(): void {
    this.activeTierId = this.tiers.some(t => t.id === this.initialTierId)
      ? this.initialTierId
      : (this.tiers[0]?.id ?? 'economic');

    // Scroll events do not bubble, so listen on the capture phase at document
    // level — that catches the window scrolling and any scrollable wrapper the
    // host page puts around this component.
    // Outside the zone: this fires every animation frame while scrolling and
    // must not drive change detection on its own.
    this.zone.runOutsideAngular(() => {
      document.addEventListener('scroll', this.onViewportChange, { capture: true, passive: true });
      window.addEventListener('resize', this.onViewportChange, { passive: true });
    });

    this.refreshScrollHint();
  }

  ngOnDestroy(): void {
    document.removeEventListener('scroll', this.onViewportChange, { capture: true } as EventListenerOptions);
    window.removeEventListener('resize', this.onViewportChange);
  }

  // --- derived state -------------------------------------------------------

  get activeTier(): PlanTier | undefined {
    return this.tiers.find(tier => tier.id === this.activeTierId);
  }

  get offers(): ProviderOffer[] {
    return this.activeTier?.offers ?? [];
  }

  /** Cheapest offer in the active tab, or undefined when the tab is empty. */
  get cheapestOffer(): ProviderOffer | undefined {
    return this.offers.reduce<ProviderOffer | undefined>(
      (cheapest, offer) => (!cheapest || offer.price < cheapest.price ? offer : cheapest),
      undefined
    );
  }

  /**
   * The badge only shows when one offer is genuinely cheaper than the rest —
   * with a single offer, or when prices tie, nothing is marked.
   */
  isLowestPrice(offer: ProviderOffer): boolean {
    if (this.offers.length < 2) {
      return false;
    }
    return this.offers.every(other => other.id === offer.id || other.price > offer.price);
  }

  /** Defaults to the cheapest offer until the user taps a card. */
  get selectedOffer(): ProviderOffer | undefined {
    const storedId = this.selectionByTier[this.activeTierId];
    return this.offers.find(offer => offer.id === storedId) ?? this.cheapestOffer;
  }

  isSelected(offer: ProviderOffer): boolean {
    return this.selectedOffer?.id === offer.id;
  }

  isExpanded(offer: ProviderOffer): boolean {
    return this.expandedOfferId === offer.id;
  }

  // --- interaction ---------------------------------------------------------

  selectTier(tierId: PlanTierId): void {
    if (this.activeTierId === tierId) {
      return;
    }
    this.activeTierId = tierId;
    // A card from the previous tab must not stay expanded behind the new one.
    this.expandedOfferId = null;

    if (this.selectedOffer) {
      this.offerSelected.emit(this.selectedOffer);
    }
    this.refreshScrollHint();
  }

  selectOffer(offer: ProviderOffer): void {
    if (this.selectionByTier[this.activeTierId] === offer.id) {
      return;
    }
    this.selectionByTier[this.activeTierId] = offer.id;
    this.offerSelected.emit(offer);
  }

  /**
   * Opening one card closes any other. Selection is deliberately left alone so
   * reading a competitor's details never silently changes what the CTA buys.
   */
  toggleCoverage(offer: ProviderOffer, event: Event): void {
    event.stopPropagation();
    this.expandedOfferId = this.isExpanded(offer) ? null : offer.id;
    this.refreshScrollHint();
  }

  /**
   * Bottom CTA. Emits the confirmed offer for the parent to act on:
   *
   *   <app-choose-plan-mobile (planChosen)="goToCheckout($event)">
   *
   * Put routing / quote creation in the parent rather than here so the
   * component stays reusable on both the mobile and desktop routes.
   */
  continueWithSelected(): void {
    const offer = this.selectedOffer;
    if (!offer) {
      return;
    }
    this.planChosen.emit(offer);
  }

  /** Down-arrow chip: scrolls roughly one screenful further down. */
  scrollDown(event?: Event): void {
    event?.stopPropagation();

    const target = this.scrollTarget;
    const viewport = target instanceof Window ? target.innerHeight : target.clientHeight;

    target.scrollBy({ top: Math.round(viewport * 0.7), behavior: 'smooth' });
  }

  // --- formatting ----------------------------------------------------------

  get lang(): string {
    return this.translate.currentLang || this.translate.defaultLang || 'en';
  }

  /** 'tr' groups with dots (18.900), 'en' with commas (18,900). */
  get numberLocale(): string {
    return this.lang === 'tr' ? 'tr' : 'en';
  }

  formatPrice(price: number): string {
    const amount = this.decimalPipe.transform(price, '1.0-0', this.numberLocale);
    return `${this.currencySymbol}${amount ?? price}`;
  }

  /** Resolved eagerly because it is interpolated into a translated sentence. */
  get selectedProviderName(): string {
    return this.selectedOffer ? this.translate.instant(this.selectedOffer.providerNameKey) : '';
  }

  get selectedPriceLabel(): string {
    return this.selectedOffer ? this.formatPrice(this.selectedOffer.price) : '';
  }

  // --- scroll plumbing -----------------------------------------------------

  /**
   * The nearest scrollable ancestor, falling back to the window. Resolved on
   * demand because the host page may wrap this component in its own scroll
   * container (a modal body, a step wizard) that only exists at runtime.
   */
  private get scrollTarget(): HTMLElement | Window {
    let node = this.host.nativeElement.parentElement;

    while (node && node !== document.body) {
      const overflowY = getComputedStyle(node).overflowY;
      if (/(auto|scroll|overlay)/.test(overflowY) && node.scrollHeight > node.clientHeight + 1) {
        return node;
      }
      node = node.parentElement;
    }
    return window;
  }

  /** Arrow function so `this` survives being handed to addEventListener. */
  private onViewportChange = (): void => {
    const next = this.hasMoreToScroll();
    if (next === this.showScrollHint) {
      return; // Nothing changed — stay out of the zone, skip change detection.
    }
    this.zone.run(() => (this.showScrollHint = next));
  };

  private hasMoreToScroll(): boolean {
    const target = this.scrollTarget;

    if (target instanceof Window) {
      const doc = document.documentElement;
      return doc.scrollHeight - (window.scrollY + window.innerHeight) > 24;
    }
    return target.scrollHeight - (target.scrollTop + target.clientHeight) > 24;
  }

  /** Re-checks after the DOM settles, so the accordion's new height counts. */
  private refreshScrollHint(): void {
    setTimeout(() => this.onViewportChange());
  }

  // --- trackBy -------------------------------------------------------------

  trackByTierId(_index: number, tier: PlanTier): string {
    return tier.id;
  }

  trackByOfferId(_index: number, offer: ProviderOffer): string {
    return offer.id;
  }

  trackByLabelKey(_index: number, item: { labelKey: string }): string {
    return item.labelKey;
  }
}
