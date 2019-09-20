import { Injectable } from '@angular/core';
import { Flag } from './flag.model';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FlagService {

  readonly rootURL = "http://localhost:62921/api";
  imageUrl: string = "http://localhost:62921/Images/40/default-image.png";

  formData : Flag;
  list : Flag[];

  constructor(private http : HttpClient) { 

    this.formData = new Flag;
    this.formData.ID = 0;
    this.formData.Title = "";
    this.formData.Price = "";
    this.formData.Image = null;
    this.formData.ImagePath = "";
    this.formData.Description = "";
    this.formData.Category = "flag";

    this.getFlags().then(res =>{
      this.list = res as Flag[];
    })
  }

  form: FormGroup = new FormGroup({
    ID: new FormControl(null),
    Title: new FormControl(""),
    Price: new FormControl(""),
    Image: new FormControl(null),
    ImagePath: new FormControl("default-image.png"),
    Description: new FormControl(""),
    Category: new FormControl("Flag")
  })

  initializeFormGroup() {
    this.form.setValue({
      ID: null,
      Title: '',
      Price: '',
      Image: null,
      ImagePath: '',
      Description: '',
      Category: 'Flag'
    });
  }


  getFlags(){
    return this.http.get<Flag[]>(this.rootURL + "/flag").toPromise();
  }

  getFlag(id:number): Observable<Flag>{
    return this.http.get<Flag>(this.rootURL+"/flag/"+id);
  }

  postFlag(modelFormData : Flag, fileToUpload: File ){
    const formData: FormData = new FormData;
    console.log("modelFormData: ", modelFormData);

    formData.append("Title", modelFormData.Title);
    formData.append("Price", modelFormData.Price);
    formData.append("Description", modelFormData.Description);
    formData.append("Image", fileToUpload, fileToUpload.name);
    formData.append("ImagePath", modelFormData.ImagePath);
    formData.append("Category", modelFormData.Category);
    formData.append("UserName", modelFormData.UserName);
    

    

    return this.http.post(this.rootURL+"/Flag", formData)
  }

  putFlag(modelFormData : Flag, fileToUpload: File ){
    const formData: FormData = new FormData;

    formData.append("Title", modelFormData.Title);
    formData.append("ID", modelFormData.ID.toString());
    formData.append("Price", modelFormData.Price);
    formData.append("Description", modelFormData.Description);
    if(fileToUpload != null){
      formData.append("Image", fileToUpload, fileToUpload.name);
    }
    formData.append("ImagePath", modelFormData.ImagePath);
    formData.append("Category", modelFormData.Category);
    formData.append("UserName", modelFormData.UserName);

    console.log("modelFormData: ", modelFormData);

    return this.http.put(this.rootURL+"/Flag/"+modelFormData.ID, formData)
  }

  populateForm(flag) {
    this.form.setValue(flag);
  }

  deleteFlag(id: number){
    console.log("delete: ", id);
    return this.http.delete(this.rootURL+"/Flag/"+id);
  }

  getFlagByUserName(userName: string): Observable<Flag[]>{
    return this.http.get<Flag[]>(this.rootURL+"/Flag/username/"+userName);
  }

  refreshList(){
    this.http.get(this.rootURL+"/Flag").toPromise().then(res => {
      this.list = res as Flag[];
    });
  }
}
