import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { StoreModule } from '@ngrx/store';

import { appReducer } from './app.reducer';

import { AppComponent } from './app.component';
import { EntityPanelComponent } from './entity-panel/entity-panel.component';
import { EntityTitleComponent } from './entity-panel/entity-title/entity-title.component';
import { EntityElementsComponent } from './entity-panel/entity-elements/entity-elements.component';
import { EntityStormerComponent } from './entity-panel/entity-stormer/entity-stormer.component';
import { EntityDataDirective } from './entity-panel/entity-data/entity-data.directive';
import { EntityDataService } from './entity-panel/entity-data/entity-data.service';
import { AddElementButtonComponent } from './entity-panel/entity-elements/add-element-button/add-element-button.component';
import { EntityElementComponent } from './entity-panel/entity-elements/entity-element/entity-element.component';
import { EntityElementsService } from './entity-panel/entity-elements/entity-elements.service';

import { environment } from '../environments/environment';
import { EntityUpdateService } from './entity-panel/entity-update.service';

import { MaterialModule } from './material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { RemoveElementButtonComponent } from './entity-panel/entity-elements/remove-element-button/remove-element-button.component';
import { TransposeFocusButtonComponent } from './entity-panel/entity-elements/transpose-focus-button/transpose-focus-button.component';
import { TransposeToParentButtonComponent } from './entity-panel/entity-elements/transpose-to-parent-button/transpose-to-parent-button.component';

@NgModule({
  declarations: [
    AppComponent,
    EntityPanelComponent,
    EntityTitleComponent,
    EntityElementsComponent,
    EntityStormerComponent,
    EntityDataDirective,
    AddElementButtonComponent,
    EntityElementComponent,
    RemoveElementButtonComponent,
    TransposeFocusButtonComponent,
    TransposeToParentButtonComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    StoreModule.forRoot({test: appReducer}),
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule
  ],
  providers: [EntityDataService,
              EntityUpdateService,
              EntityElementsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
