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
import { RecordListComponent } from '../admin-panel/record-list/record-list.component';
import { FormGroup, FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class RecordService {

  formData : Record;
  list : Record[];
  readonly rootURL = "http://localhost:62921/api";
  imageUrl: string = "http://localhost:62921/Images/40/default-image.png";

  recordsCollection: AngularFirestoreCollection<Record>;

  form: FormGroup = new FormGroup({
    ID: new FormControl(null),
    Album: new FormControl(""),
    Year: new FormControl(""),
    Band: new FormControl(""),
    Title: new FormControl(""),
    Price: new FormControl(""),
    Genre: new FormControl(""),
    Image: new FormControl(null),
    ImagePath: new FormControl("default-image.png"),
    Description: new FormControl(""),
    Category: new FormControl("Record")
  })

  constructor(private http : HttpClient, private afs: AngularFirestore) { 
    this.recordsCollection = this.afs.collection('RecordDB', ref =>
      ref.orderBy('Band','desc')
    );

   this.initializeFormGroup();
   console.log("this.list: ", this.list);

   this.refreshList();
  }

  initializeFormGroup() {
    this.form.setValue({
      ID: null,
      Album: '',
      Band: '',
      Title: '',
      Year: "",
      Genre: '',
      Price: '',
      Image: null,
      ImagePath: '',
      Description: '',
      Category: 'Record'
    });
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

    console.log("modelFormData: ", modelFormData);

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
    formData.append("ID", modelFormData.ID.toString());
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
    return this.http.put(this.rootURL+"/Record/"+modelFormData.ID,formData);
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

  populateForm(record) {
    this.form.setValue(record);
  }


}