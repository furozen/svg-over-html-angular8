import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ContentAreaComponent } from './content-area/content-area.component';
import { SvgonstyDirective } from './svgonsty.directive';

@NgModule({
  declarations: [
    AppComponent,
    ContentAreaComponent,
    SvgonstyDirective
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
