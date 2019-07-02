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

  postRecord(formData : Record){
    console.log("formData: ", formData);
    return this.http.post(this.rootURL+"/Record", formData)
  }

  refreshList(){
    this.http.get(this.rootURL+"/Record").toPromise().then(res => {
      console.log("Res: ", res);
      this.list = res as Record[];
    });
  }

  putRecord(formData : Record){
    return this.http.put(this.rootURL+"/Record/"+formData.RecordID,formData);
  }

  deleteRecord(id: number){
    return this.http.delete(this.rootURL+"/Record/"+id);
  }
}