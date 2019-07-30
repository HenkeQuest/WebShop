import { Component, OnInit } from '@angular/core';
import { Clothing } from 'src/app/shared/clothing.model';
import { ClothingService } from 'src/app/shared/clothing.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-clothes',
  templateUrl: './clothes.component.html',
  styleUrls: ['./clothes.component.css']
})
export class ClothesComponent implements OnInit {

  clothing : Clothing [];
  imageUrl ="http://localhost:62921/Images/40/default-image.png";
  fileToUpload: File;
  
  constructor(private clothingService : ClothingService, private toastr : ToastrService,
              public dialogRef: MatDialogRef<ClothesComponent>) { 
    console.log("Imagepath: ", clothingService.form.value.ImagePath);
  }

  ngOnInit() {
    this.clothingService.getClothing().then( res =>{
      this.clothing = res as Clothing[];
    });
  }

  onFileSelected(file : FileList) {
    this.fileToUpload = file.item(0);
    const inputNode: any = document.querySelector('#file');
  
    if (typeof (FileReader) !== 'undefined') {
      const reader = new FileReader();
  
      reader.onload = (event: any) => {
        console.log("event.target: ", event);
        console.log("inputNode.files[0]: ", inputNode.files[0]);
        this.imageUrl = event.target.result;
        this.clothingService.form.value.ImagePath = inputNode.files[0].name;
        
      };
      
      reader.readAsDataURL(this.fileToUpload);
      //reader.readAsArrayBuffer(inputNode.files[0]);
    }
  }

  onSubmit(){
    this.clothingService.form.value;
    console.log("form: ", this.clothingService.form.value);
    if(this.clothingService.form.value.ClothingID == 0){
      this.insertClothing(this.clothingService.form);
    }
    // else{
    //   form.value.ImagePath = this.clothingService.formData.ImagePath;
    //   this.updateRecord(form);
    // }
  }

  insertClothing(form : any){
    console.log("form: ", form);
    console.log("this.fileToUpload: ", this.fileToUpload);
    this.clothingService.postClothing(form.value, this.fileToUpload).subscribe(res => {
      this.toastr.success("inserted successfully", 'EMP. Register');
      this.clothingService.form.reset();
      this.clothingService.initializeFormGroup();
      this.dialogRef.close();
    },
    err =>{
      debugger;
      console.log(err);
    });
  }

  // updateRecord(form : NgForm){
  //   console.log("form.value: ", form.value);
  //   this.clothingService.putRecord(form.value, this.fileToUpload).subscribe(res =>{
  //     this.toastr.info("updated successfully", 'EMP. Register');
  //     // this.resetForm(form);
  //     this.service.refreshList();
  //     this.dialogRef.close();
  //   });
  // }

}
