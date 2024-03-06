import { Component, OnInit } from '@angular/core'
import { Alumno } from '../interface/alumno'
import { AlumnoService } from '../service/alumno.service'

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.page.html'
})
export class AlumnosPage implements OnInit {

  alumnos: Alumno[] = [];
  nombre: string = '';
  matricula: string ='';
  estado: string = '';
  idActualizar: any;
  error: boolean = false;

  constructor(private alumnoService: AlumnoService) { }

  ngOnInit() {
    this.alumnoService.setAlumnos([
      {id:1, nombre: 'Luis', matricula: '473213'},
      {id:2, nombre: 'Brayan', matricula: '832712'},
      {id:3, nombre: 'Julio', matricula: '328132'}
    ]);
    this.alumnos = this.alumnoService.getAlumnos();
    this.estado ='guardar';
  }

  public guardar(){
    if ( 
        (this.nombre == undefined || this.nombre == '' ) || 
        (this.matricula == undefined || this.matricula == '')) 
      {
      this.error = true;
      return;
    }

    let alumno: Alumno = {
      nombre: this.nombre, matricula: this.matricula
    };

    if (this.estado ==='actualizar'){
      alumno.id = this.idActualizar;
      this.alumnos = this.alumnoService.actualiza(alumno);
    }
    if(this.estado === 'guardar'){
      this.alumnoService.agregarAlumno(alumno);
      this.alumnos = this.alumnoService.getAlumnos();
    }
    this.cancelar();
  }

  public cancelar(){
    this.estado = 'guardar';
    this.matricula = '';
    this.nombre = '';
    this.error = false;
  }

  public eliminar(id: number){
    this.alumnoService.borrarAlumno(id);
    this.alumnos = this.alumnoService.getAlumnos();
  }

  public editar(alumno: Alumno){
    this.estado = 'actualizar';
    this.matricula = alumno.matricula;
    this.nombre = alumno.nombre;
    this.idActualizar = alumno.id;
  }

}