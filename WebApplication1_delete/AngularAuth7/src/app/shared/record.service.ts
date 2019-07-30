import { Injectable } from '@angular/core';
import { Record } from './record.model';
import { HttpClient} from "@angular/common/http";
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from '@angular/fire/firestore'
import { map } from 'rxjs/operators';
import { from, Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material';
import { RecordListComponent } from '../records/record-list/record-list.component';

@Injectable({
  providedIn: 'root'
})
export class RecordService {

  formData : Record;
  list : Record[];
  readonly rootURL = "http://localhost:62921/api"

  recordsCollection: AngularFirestoreCollection<Record>;

  constructor(private http : HttpClient, private afs: AngularFirestore) { 
    this.recordsCollection = this.afs.collection('RecordDB', ref =>
      ref.orderBy('Band','desc')
    );

    this.formData = new Record;
    this.formData.Band = "";
    this.formData.Album = "";
    this.formData.Genre = "";
    this.formData.Year = "";
    this.formData.Image = null;
    this.formData.ImagePath = "";
    this.formData.RecordID = 0;
    this.formData.Title = "";
    this.formData.Price = "";
    this.formData.Category = "Record";
  }

  getRecordFromFB(){
    return this.recordsCollection.snapshotChanges()
    .pipe( map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Record
          const id = a.payload.doc.id
          return {id, ...data}
        })
      })
    )
  }

  postRecord(modelFormData : Record,fileToUpload: File ){
    const formData: FormData = new FormData;

    formData.append("Band", modelFormData.Band);
    formData.append("Album", modelFormData.Album);
    formData.append("Year", modelFormData.Year);
    formData.append("Genre", modelFormData.Genre);
    formData.append("Image", fileToUpload, fileToUpload.name);
    formData.append("ImagePath", modelFormData.ImagePath);
    formData.append("Title", modelFormData.Title);
    formData.append("Price", modelFormData.Price);
    formData.append("Category", modelFormData.Category);

    return this.http.post(this.rootURL+"/Record", formData)
  }

  putRecord(modelFormData : Record,fileToUpload: File){
    const formData: FormData = new FormData;

    formData.append("Band", modelFormData.Band);
    formData.append("RecordId", modelFormData.RecordID.toString());
    formData.append("Album", modelFormData.Album);
    formData.append("Year", modelFormData.Year);
    formData.append("Genre", modelFormData.Genre);
    if(fileToUpload != null){
      formData.append("Image", fileToUpload, fileToUpload.name);
    }
    formData.append("ImagePath", modelFormData.ImagePath);
    formData.append("Title", modelFormData.Title);
    formData.append("Price", modelFormData.Price);
    formData.append("Category", modelFormData.Category);

    this.getRecords();
    return this.http.put(this.rootURL+"/Record/"+modelFormData.RecordID,formData);
  }

  deleteRecord(id: number){
    return this.http.delete(this.rootURL+"/Record/"+id);
  }

  getRecords(): Observable<Record[]>{
    return this.http.get<Record[]>(this.rootURL+"/Record");
  }

  refreshList(){
    this.http.get(this.rootURL+"/Record").toPromise().then(res => {
      this.list = res as Record[];
    });

    return from(this.http.get(this.rootURL+"/Record").toPromise());
  }


}