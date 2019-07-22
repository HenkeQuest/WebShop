import { Injectable } from '@angular/core';
import { Record } from './record.model';
import { HttpClient} from "@angular/common/http";
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from '@angular/fire/firestore'
import { map } from 'rxjs/operators';

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
    return this.http.put(this.rootURL+"/Record/"+modelFormData.RecordID,formData);
  }

  deleteRecord(id: number){
    return this.http.delete(this.rootURL+"/Record/"+id);
  }

  getRecords(){
    return this.http.get(this.rootURL+"/Record").toPromise();
  }

  refreshList(){
    this.http.get(this.rootURL+"/Record").toPromise().then(res => {
      this.list = res as Record[];
    });
  }
}