import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit, ViewChild,
    ViewEncapsulation
} from '@angular/core';
import {Subject, take, takeUntil} from 'rxjs';
import {MatDrawer} from '@angular/material/sidenav';
import {FuseMediaWatcherService} from '../../../@fuse/services/media-watcher';
import {
    FuseNavigationItem,
    FuseNavigationService,
    FuseVerticalNavigationComponent
} from '../../../@fuse/components/navigation';
import {AvailableLangs, TranslocoService} from '@ngneat/transloco';

@Component({
    selector       : 'account',
    templateUrl    : './account.component.html',
    styleUrls      : ['./account.component.scss'],
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountComponent implements OnInit, OnDestroy {
    @ViewChild('drawer') drawer: MatDrawer;
    drawerMode: 'over' | 'side' = 'side';
    drawerOpened: boolean = true;
    panels: any[] = [];
    selectedPanel: string = 'personal';
    availableLangs: AvailableLangs;
    activeLang: string;
    flagCodes: any;
    private _unsubscribeAll: Subject<any> = new Subject<any>();


    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _fuseMediaWatcherService: FuseMediaWatcherService,
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
        // this.availableLangs = this._translocoService.getAvailableLangs();
        //
        // // Subscribe to language changes
        // this._translocoService.langChanges$.subscribe((activeLang) => {
        //
        //     // Get the active lang
        //     this.activeLang = activeLang;
        //
        //     // Update the navigation
        //     this._updateNavigation(activeLang);
        // });
        //
        // // Set the country iso codes for languages for flags
        // this.flagCodes = {
        //     'tr': 'tr',
        //     'en': 'uk'
        // };
        // Setup available panels
        this.panels = [
            {
                id         : 'personal',
                icon       : 'feather:at-sign',
                title      : 'Personal Information',
                description: 'Kişisel Bilgiler'
            },
            {
                id         : 'change-password',
                icon       : 'heroicons_outline:lock-closed',
                title      : 'Change Password',
                description: 'Şifreni Değiştir'
            },
            {
                id         : 'address',
                icon       : 'feather:map-pin',
                title      : 'Addresses',
                description: 'Adresler'
            },
            {
                id         : 'orders',
                icon       : 'mat_outline:format_list_bulleted',
                title      : 'Orders',
                description: 'Siparişler'
            }
        ];

        // Subscribe to media changes
        this._fuseMediaWatcherService.onMediaChange$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(({matchingAliases}) => {

                // Set the drawerMode and drawerOpened
                if ( matchingAliases.includes('lg') )
                {
                    this.drawerMode = 'side';
                    this.drawerOpened = true;
                }
                else
                {
                    this.drawerMode = 'over';
                    this.drawerOpened = false;
                }

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Navigate to the panel
     *
     * @param panel
     */
    goToPanel(panel: string): void
    {
        this.selectedPanel = panel;

        // Close the drawer on 'over' mode
        if ( this.drawerMode === 'over' )
        {
            this.drawer.close();
        }
    }

    /**
     * Get the details of the panel
     *
     * @param id
     */
    getPanelInfo(id: string): any
    {
        return this.panels.find(panel => panel.id === id);
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

    // private _updateNavigation(lang: string): void {
    //     // For the demonstration purposes, we will only update the Dashboard names
    //     // from the navigation but you can do a full swap and change the entire
    //     // navigation data.
    //     //
    //     // You can import the data from a file or request it from your backend,
    //     // it's up to you.
    //
    //     // Get the component -> navigation data -> item
    //     const navComponent = this._fuseNavigationService.getComponent<FuseVerticalNavigationComponent>(this.panels);
    //
    //     // Return if the navigation component does not exist
    //     if (!navComponent) {
    //         return null;
    //     }
    //
    //     // Get the flat navigation data
    //     const navigation = navComponent.navigation;
    //
    //
    //     const homeItem = this._fuseNavigationService.getItem('about-us', navigation);
    //     if (homeItem) {
    //         this._translocoService.selectTranslate('about-us').pipe(take(1))
    //             .subscribe((translation) => {
    //
    //                 // Set the title
    //                 homeItem.title = translation;
    //
    //                 // Refresh the navigation component
    //                 navComponent.refresh();
    //             });
    //     }
    // }
}
