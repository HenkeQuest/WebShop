import { Component, OnInit } from '@angular/core';
import { Clothing } from 'src/app/shared/clothing.model';
import { ClothingService } from 'src/app/shared/clothing.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef } from '@angular/material';
import { RecordService } from 'src/app/shared/record.service';

@Component({
  selector: 'app-clothing',
  templateUrl: './clothing.component.html'
})
export class ClothingComponent implements OnInit {

  clothing : Clothing [];
  imageUrl ="http://localhost:62921/Images/40/default-image.png";
  fileToUpload: File;
  
  constructor(private clothingService : ClothingService,
              private recordService : RecordService, 
              private toastr : ToastrService,
              public dialogRef: MatDialogRef<ClothingComponent>) { 
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
        this.clothingService.imageUrl = event.target.result;
        this.clothingService.form.value.ImagePath = inputNode.files[0].name;
        
      };
      
      reader.readAsDataURL(this.fileToUpload);
      //reader.readAsArrayBuffer(inputNode.files[0]);
    }
  }

  onClear() {
    this.clothingService.form.reset();
    this.clothingService.initializeFormGroup();
  }

  onSubmit(){
    this.clothingService.form.value;
    console.log("form: ", this.clothingService.form.value);
    if(!this.clothingService.form.value.ID){
      this.insertClothing(this.clothingService.form);
    }
    else{
      this.updateClothing(this.clothingService.form);
    }
    this.clothingService.form.reset();
    this.clothingService.initializeFormGroup();
    this.dialogRef.close();
  }

  onClose() {
    this.clothingService.form.reset();
    this.clothingService.initializeFormGroup();
    this.dialogRef.close();
  }

  insertClothing(form : any){
    this.clothingService.postClothing(form.value, this.fileToUpload).subscribe(res => {
      this.toastr.success("inserted successfully", 'EMP. Register');
    },
    err =>{
      debugger;
      console.log(err);
    });
  }

  updateClothing(form : any){
    console.log("form.value: ", form.value);
    this.clothingService.putClothing(form.value, this.fileToUpload).subscribe(res =>{
      this.toastr.info("updated successfully", 'EMP. Register');
    });
  }

}
