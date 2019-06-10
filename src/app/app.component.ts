import { Component } from '@angular/core';
import { DjangoCrudApiService } from './django-crud-api.service';

// Controles para los formularios
import { FormGroup, FormControl, Validators } from '@angular/forms'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {

  title = 'crud-angular';

  isNew: boolean = true
  isEdit: boolean = false

  bebidas: any = [];
  id: number = null;

  bebidasForm: FormGroup;

  constructor(private api: DjangoCrudApiService) {
    this.bebidasForm = new FormGroup({
      'name': new FormControl('', Validators.required),
      'description': new FormControl('', Validators.required),
      'image_url': new FormControl('', Validators.required),
    });
    this.getAllBebidas();
  }

  /**
   * Obtener todas las bebidas registradas
   */
  getAllBebidas() {
    this.api.getAllBebidas().subscribe(res => {
      this.bebidas = res
    }), err => {
      console.log(err);
    }
  }

  /**
   * Editar una bebida, tienen efectos en la vista
   *
   * @param   {int}  id   ID de la bebida a editar
   */
  editThisBebida(item) {
    this.isNew = false
    this.isEdit = true
    this.bebidasForm.get('name').setValue(item.name)
    this.bebidasForm.get('description').setValue(item.description)
    this.bebidasForm.get('image_url').setValue(item.image_url)
    this.id = item.id
  }

  /**
   * Actualizar una bebida de la BD que maneja la API
   */
  saveUpdatedBebida() {
    let b = {
      name: this.bebidasForm.get('name').value,
      description: this.bebidasForm.get('description').value,
      image_url: this.bebidasForm.get('image_url').value
    }
    this.bebidasForm.get('name').setValue('')
    this.bebidasForm.get('description').setValue('')
    this.bebidasForm.get('image_url').setValue('')
    return this.api.updateBebida(this.id, b).subscribe(res => {
      this.getAllBebidas()
      this.id = null
      this.isNew = true
      this.isEdit = false
    }, err => {
      console.log(err)
    })
  }

  /**
   * Eliminar una bebida a la BD que maneja la API
   *
   * @param   {int}  id   ID de la bebida a editar
   */
  deleteThisBebida(id) {
    this.api.deleteBebida(id).subscribe(res => {
      this.getAllBebidas()
    }, err => {
      console.log(err)
    })
  }

  /**
   * Agregar una nueva bebida a la BD que maneja la API
   */
  addThisBebida() {
    let b = {
      name: this.bebidasForm.get('name').value,
      description: this.bebidasForm.get('description').value,
      image_url: this.bebidasForm.get('image_url').value
    }
    this.bebidasForm.get('name').setValue('')
    this.bebidasForm.get('description').setValue('')
    this.bebidasForm.get('image_url').setValue('')

    return this.api.addBebida(b).subscribe(res => {
      this.bebidas.push(res)
    }, err => {
      console.log(err)
    })
  }

  emptyForm() {
    this.bebidasForm.get('name').setValue('')
    this.bebidasForm.get('description').setValue('')
    this.bebidasForm.get('image_url').setValue('')
    this.isNew = true
    this.isEdit = false
  }

}
