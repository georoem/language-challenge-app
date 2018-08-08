import { ScoreService } from './score/score.service';
import { ChallengeService } from './challenge/challenge.service';
import { ScoreComponent } from './score/score.component';
import { AppInterceptor } from './util/app.interceptor';
import { JsonService } from './util/json.service';
import { ChronometerService } from './chronometer/chronometer.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MomentModule } from 'angular2-moment';
import { BlockUIModule } from 'ng-block-ui';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTableModule} from '@angular/material/table';
import {MatRadioModule} from '@angular/material/radio';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material';
import {MatDialogModule} from '@angular/material';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTooltipModule} from '@angular/material/tooltip';

import { AppComponent } from './app.component';
import { WordPaletteComponent } from './word-palette/word-palette.component';
import { ChronometerComponent } from './chronometer/chronometer.component';
import { ChallengeComponent } from './challenge/challenge.component';
import { WordComponent } from './word/word.component';
import { WordService } from './word/word.service';
import { WordPaletteService } from './word-palette/word-palette.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { SaveScoreDialogComponent } from './challenge/save-score.dialog';
import { AppRoutingModule } from './/app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LevelService } from './util/level.service';
// import 'reflect-metadata';

@NgModule({
  declarations: [
    AppComponent,
    WordPaletteComponent,
    ChronometerComponent,
    ChallengeComponent,
    WordComponent,
    SaveScoreDialogComponent,
    ScoreComponent,
    DashboardComponent
  ],
  entryComponents: [ SaveScoreDialogComponent ],
  imports: [
    BrowserModule,
    MomentModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BlockUIModule,
    NoopAnimationsModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatTabsModule,
    MatTableModule,
    MatRadioModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatToolbarModule,
    MatTooltipModule,
    NgbModule.forRoot(),
    AppRoutingModule
  ],
  providers: [WordService,
    WordPaletteService,
    ChronometerService,
    JsonService,
    ScoreService,
    ChallengeService,
    LevelService, {
      provide: HTTP_INTERCEPTORS,
      useClass: AppInterceptor,
      multi: true,
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
