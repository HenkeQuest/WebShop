import { Injectable } from '@angular/core';
import { Record } from './record.model';
import { HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class RecordService {

  formData : Record;
  list : Record[];
  readonly rootURL = "http://localhost:62921/api"
  constructor(private http : HttpClient) { }

  postRecord(formData : Record,fileToUpload: Uint8Array ){
    const formData1: FormData = new FormData;
    //formData.Image = fileToUpload;
    formData1.append("Band", "fdvfdg");
    formData1.append("Album", "fdvfdg");
    formData1.append("Year", "fdvfdg");
    //formData1.append("Image", fileToUpload, "imageName");
    console.log("formData: ", formData);
    console.log("fileToUpload: ", fileToUpload);
    var myArray = new ArrayBuffer(512);
var longInt8View = new Uint8Array(myArray);

// generate some data
for (var i=0; i< longInt8View.length; i++) {
  longInt8View[i] = i % 256;
}
    formData.Image = longInt8View;
    //formData.Image = "fdgf";
    console.log("longInt8View: ", longInt8View);
    return this.http.post(this.rootURL+"/Record", formData)
  }

  putRecord(formData : Record){
    return this.http.put(this.rootURL+"/Record/"+formData.RecordID,formData);
  }

  deleteRecord(id: number){
    return this.http.delete(this.rootURL+"/Record/"+id);
  }

  refreshList(){
    this.http.get(this.rootURL+"/Record").toPromise().then(res => {
      console.log("Res: ", res);
      this.list = res as Record[];
    });
  }
}