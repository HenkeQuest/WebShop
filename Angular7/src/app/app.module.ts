import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule} from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
import { RecordsComponent } from './records/records.component';
import { RecordComponent } from './records/record/record.component';
import { RecordListComponent } from './records/record-list/record-list.component';
import { FormsModule }   from '@angular/forms';
import { RecordService } from './shared/record.service';


@NgModule({
  declarations: [
    AppComponent,
    RecordsComponent,
    RecordComponent,
    RecordListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [RecordService],
  bootstrap: [AppComponent]
})
export class AppModule { }
