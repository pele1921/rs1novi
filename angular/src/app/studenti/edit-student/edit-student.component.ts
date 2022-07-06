import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MojConfig } from '../../moj-config';

declare function porukaSuccess(s: string): any;

@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.css'],
})
export class EditStudentComponent implements OnInit {
  constructor(private httpClient: HttpClient) {}
  opstine:any = [];
  ngOnInit(): void {
   this.loadOpstine();
  }
  loadOpstine() {
    this.httpClient.get(MojConfig.adresa_servera + "/Opstina/GetByAll", MojConfig.http_opcije())
    .subscribe((res:any) => this.opstine = res);
  }
  @Input() urediStudent:any;
  @Output() demo:EventEmitter<any> = new EventEmitter();

  spremiPromjene(){
    this.httpClient.post(MojConfig.adresa_servera + "/Student/Update/" + this.urediStudent.id, this.urediStudent, MojConfig.http_opcije())
    .subscribe((res:any) => {
      porukaSuccess("Izmjene spašene!");
      this.demo.emit(res);
    })
  }
}
