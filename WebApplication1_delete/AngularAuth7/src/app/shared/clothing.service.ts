import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl } from '@angular/forms';
import { Clothing } from './clothing.model';


@Injectable({
  providedIn: 'root'
})
export class ClothingService {

  readonly rootURL = "http://localhost:62921/api";

  formData : Clothing;

  constructor(private http : HttpClient) { 

    this.formData = new Clothing;
    this.formData.ClothingID = 0;
    this.formData.Title = "";
    this.formData.Price = "";
    this.formData.Size = "";
    this.formData.Image = null;
    this.formData.ImagePath = "";
    this.formData.Description = "";
    this.formData.Category = "Clothing";
  }

  form: FormGroup = new FormGroup({
    ClothingID: new FormControl(0),
    Title: new FormControl(""),
    Price: new FormControl(""),
    Size: new FormControl(""),
    Image: new FormControl(null),
    ImagePath: new FormControl("default-image.png"),
    Description: new FormControl(""),
    Category: new FormControl("Clothing")
  })

  initializeFormGroup() {
    this.form.setValue({
      ClothingID: 0,
      Title: '',
      Price: '',
      Size: '',
      Image: null,
      ImagePath: '',
      Description: '',
      Category: 'Clothing'
    });
  }


  getClothing(){
    return this.http.get<Clothing[]>(this.rootURL + "/Clothing").toPromise();
  }

  postClothing(modelFormData : Clothing, fileToUpload: File ){
    const formData: FormData = new FormData;

    

    formData.append("Title", modelFormData.Title);
    formData.append("Price", modelFormData.Price);
    formData.append("Size", modelFormData.Size);
    formData.append("Description", modelFormData.Description);
    formData.append("Image", fileToUpload, fileToUpload.name);
    formData.append("ImagePath", modelFormData.ImagePath);

    console.log("modelFormData: ", modelFormData);

    return this.http.post(this.rootURL+"/Clothing", formData)
  }
}
