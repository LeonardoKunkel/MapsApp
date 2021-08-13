import { Component } from '@angular/core';

interface Propiedad {
  titulo: string;
  descripcion: string;
  lngLat: [number, number];
}

@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styles: [
  ]
})
export class PropertiesComponent {

  propiedades: Propiedad[] = [
    {
      titulo: 'Sofía Bravo Kunkel',
      descripcion: 'McNigger',
      lngLat: [-99.18960, 19.43239]
    },
    {
      titulo: 'Rodolfo Bravo Anguiano',
      descripcion: 'Ruri',
      lngLat: [-99.21823, 19.45597]
    },
    {
      titulo: 'Emilio & Eduardo Mtz.',
      descripcion: 'Mates Primates',
      lngLat: [-99.22135, 19.34977]
    },
    {
      titulo: 'Leonardo Bravo Kunkel',
      descripcion: 'Yo Merengues',
      lngLat: [-100.40047, 20.54611]
    }
  ]

}
