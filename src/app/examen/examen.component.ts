import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
@Component({
  selector: 'app-examen',
  templateUrl: './examen.component.html',
  styleUrls: ['./examen.component.css']
})
export class ExamenComponent implements OnInit{
  files: string[] = [];
  constructor(private http: HttpClient) { }

  ngOnInit(): void {

    this.imatgesE1();
    this.imatgesE2();
  }
  imatgesE1(): void {
    this.http.get<string[]>('http://localhost:3000/imatges')
      .subscribe(
        response => {
          this.files = response;
        },
        error => {
          console.error('Error en la solicitud:', error);
        }
      );
  }
  imatgesE2(): void {
    this.http.get<string[]>('http://localhost:3000/imatgesEJ2')
      .subscribe(
        response => {
          this.files = response;
        },
        error => {
          console.error('Error en la solicitud:', error);
        }
      );
  }









}
