import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl } from '@angular/forms';
import { Clothing } from './clothing.model';


@Injectable({
  providedIn: 'root'
})
export class ClothingService {

  readonly rootURL = "http://localhost:62921/api";
  imageUrl: string = "http://localhost:62921/Images/40/default-image.png";
  list: Clothing[];
  formData : Clothing;

  constructor(private http : HttpClient) { 

    this.formData = new Clothing;
    this.formData.ID = 0;
    this.formData.Title = "";
    this.formData.Price = "";
    this.formData.Size = "";
    this.formData.Image = null;
    this.formData.ImagePath = "";
    this.formData.Description = "";
    this.formData.Category = "Clothing";

    this.getClothing().then(res =>{
      this.list = res as Clothing[];
    })
    
  }

  form: FormGroup = new FormGroup({
    ID: new FormControl(null),
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
      ID: null,
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
    formData.append("Category", modelFormData.Category);

    console.log("modelFormData: ", modelFormData);

    return this.http.post(this.rootURL+"/Clothing", formData)
  }

  putClothing(modelFormData : Clothing, fileToUpload: File ){
    const formData: FormData = new FormData;

    formData.append("Title", modelFormData.Title);
    formData.append("ID", modelFormData.ID.toString());
    formData.append("Price", modelFormData.Price);
    formData.append("Size", modelFormData.Size);
    formData.append("Description", modelFormData.Description);
    if(fileToUpload != null){
      formData.append("Image", fileToUpload, fileToUpload.name);
    }
    formData.append("ImagePath", modelFormData.ImagePath);
    formData.append("Category", modelFormData.Category);

    console.log("modelFormData: ", modelFormData);

    return this.http.put(this.rootURL+"/Clothing/"+modelFormData.ID, formData)
  }

  populateForm(clothing) {
    this.form.setValue(clothing);
  }

  deleteClothing(id: number){
    return this.http.delete(this.rootURL+"/Clothing/"+id);
  }

}
