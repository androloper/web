import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { take } from 'rxjs';
import { AvailableLangs, TranslocoService } from '@ngneat/transloco';
import { FuseNavigationService, FuseVerticalNavigationComponent } from '@fuse/components/navigation';

@Component({
    selector       : 'languages',
    templateUrl    : './languages.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    exportAs       : 'languages'
})
export class LanguagesComponent implements OnInit, OnDestroy
{
    availableLangs: AvailableLangs;
    activeLang: string;
    flagCodes: any;

    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _fuseNavigationService: FuseNavigationService,
        private _translocoService: TranslocoService
    )
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        // Get the available languages from transloco
        this.availableLangs = this._translocoService.getAvailableLangs();

        // Subscribe to language changes
        this._translocoService.langChanges$.subscribe((activeLang) => {

            // Get the active lang
            this.activeLang = activeLang;

            // Update the navigation
            this._updateNavigation(activeLang);
        });

        // Set the country iso codes for languages for flags
        this.flagCodes = {
            'en': 'us',
            'tr': 'tr'
        };
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Set the active lang
     *
     * @param lang
     */
    setActiveLang(lang: string): void
    {
        // Set the active lang
        this._translocoService.setActiveLang(lang);
    }

    /**
     * Track by function for ngFor loops
     *
     * @param index
     * @param item
     */
    trackByFn(index: number, item: any): any
    {
        return item.id || index;
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Update the navigation
     *
     * @param lang
     * @private
     */
    private _updateNavigation(lang: string): void
    {
        // For the demonstration purposes, we will only update the Dashboard names
        // from the navigation but you can do a full swap and change the entire
        // navigation data.
        //
        // You can import the data from a file or request it from your backend,
        // it's up to you.

        // Get the component -> navigation data -> item
        const navComponent = this._fuseNavigationService.getComponent<FuseVerticalNavigationComponent>('mainNavigation');

        // Return if the navigation component does not exist
        if ( !navComponent )
        {
            return null;
        }

        // Get the flat navigation data
        const navigation = navComponent.navigation;

        // Get the Project dashboard item and update its title
        const homepage = this._fuseNavigationService.getItem('home', navigation);
        if ( homepage )
        {
            this._translocoService.selectTranslate('home').pipe(take(1))
                .subscribe((translation) => {

                    // Set the title
                    homepage.title = translation;

                    // Refresh the navigation component
                    navComponent.refresh();
                });
        }
        const shop = this._fuseNavigationService.getItem('shop', navigation);
        if ( shop )
        {
            this._translocoService.selectTranslate('shop').pipe(take(1))
                .subscribe((translation) => {

                    // Set the title
                    shop.title = translation;

                    // Refresh the navigation component
                    navComponent.refresh();
                });
        }
        const support = this._fuseNavigationService.getItem('support', navigation);
        if ( support )
        {
            this._translocoService.selectTranslate('support').pipe(take(1))
                .subscribe((translation) => {

                    // Set the title
                    support.title = translation;

                    // Refresh the navigation component
                    navComponent.refresh();
                });
        }
        const account = this._fuseNavigationService.getItem('account', navigation);
        if ( account )
        {
            this._translocoService.selectTranslate('account').pipe(take(1))
                .subscribe((translation) => {

                    // Set the title
                    account.title = translation;

                    // Refresh the navigation component
                    navComponent.refresh();
                });
        }

    }
}
