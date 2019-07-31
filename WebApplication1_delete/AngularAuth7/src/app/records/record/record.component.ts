import { Component, OnInit } from '@angular/core';
import { RecordService } from 'src/app/shared/record.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Record } from 'src/app/shared/record.model';
import { MatDialogRef} from '@angular/material';
import { CategoryService } from 'src/app/shared/category.service';
import { Category } from 'src/app/shared/category.model';

@Component({
  selector: 'app-record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.css']
})
export class RecordComponent implements OnInit {

  imageFile: File = null;
  imageUrl : string = "default-image.png";
  imageRootPath : string = "http://localhost:62921/Images/40/";
  fileToUpload : File = null;
  imageByteArray : [];
  record : Record;
  categories ;  

  constructor(private recordService : RecordService, private categoryService : CategoryService,
    private toastr : ToastrService, public dialogRef: MatDialogRef<RecordComponent>) { }

  ngOnInit() {
    console.log("ngOnInit");
    
    this.categoryService.getCategories().then(res =>{
      this.categories =  res as Category[];
    });
   // this.service.formData.ImagePath = "default-image.png";
   // this.resetForm();
  }

  resetForm(form? : NgForm){
    if (form != null)
      form.resetForm();
    this.recordService.formData = {
      ID : 0,
      Band : "tytyty",
      Album : "",
      Year : "",
      Genre : "",
      Image : null,
      ImagePath : "",
      Title: "",
      Price: "",
      Category: ""
    }
    this.recordService.formData.ImagePath = "default-image.png";
    this.imageUrl = this.imageRootPath + "default-image.png";
  }

  onSubmit(form : NgForm){
    if(form.value.ID == 0){
      console.log("form: ", form.value);
      this.insertRecord(form);
    }
    else{
      form.value.ImagePath = this.recordService.formData.ImagePath;
      this.updateRecord(form);
    }
  }

  onFileSelected(file : FileList){
    this.fileToUpload = file.item(0);
    const inputNode: any = document.querySelector('#file');
    

    if (typeof (FileReader) !== 'undefined') {
      //Show image preview
      var reader = new FileReader();
      reader.onload = (event:any) => {
        console.log("this.fileToUpload: ", event.target);
        console.log("this.fileToUpload: ", this.fileToUpload);
        console.log("inputNode: ", this.fileToUpload);
        this.recordService.formData.ImagePath = this.fileToUpload.name;
        this.recordService.imageUrl = event.target.result;
      }
    }

    reader.readAsDataURL(this.fileToUpload);
  }

  insertRecord(form : NgForm){
    this.recordService.postRecord(form.value, this.fileToUpload).subscribe(res => {
      this.toastr.success("inserted successfully", 'EMP. Register');
      this.resetForm(form);
      this.recordService.refreshList();
      this.dialogRef.close();
    },
    err =>{
      debugger;
      console.log(err);
    });
  }

  updateRecord(form : NgForm){
    console.log("form.value: ", form.value);
    this.recordService.putRecord(form.value, this.fileToUpload).subscribe(res =>{
      this.toastr.info("updated successfully", 'EMP. Register');
      this.resetForm(form);
      this.recordService.refreshList();
      this.dialogRef.close();
    });
  }


}
