import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

interface MarkerColor {
  color: string;
  marker?: mapboxgl.Marker;
  centro?: [number, number];
}

@Component({
  selector: 'app-markers',
  templateUrl: './markers.component.html',
  styles: [`
    .mapa-container {
      width: 100%;
      height: 100%;
    }

    .list-group {
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 99;
    }

    li {
      cursor: pointer;
    }
  `]
})
export class MarkersComponent implements AfterViewInit {

  @ViewChild('mapa') divMapa!: ElementRef;

  mapa!: mapboxgl.Map;
  zoomLevel: number = 15;
  center: [number, number] = [ -100.42446808873656, 20.528211575395222 ];

  // Arreglo de markers
  marcadores: MarkerColor[] = [];

  constructor() { }

  ngAfterViewInit(): void {
    this.mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.center,
      zoom: this.zoomLevel
    });

    this.readLocalStorage();

    // const markerHtml: HTMLElement = document.createElement('div');
    // markerHtml.innerHTML = 'Hola Mundo';

    // new mapboxgl.Marker()
    //   .setLngLat( this.center )
    //   .addTo( this.mapa );
  }

  goMarker( marker: mapboxgl.Marker ) {
    
    this.mapa.flyTo({
      center: marker.getLngLat()
    })
  }

  addMarker() {

    const color = "#xxxxxx".replace(/x/g, y => (Math.random()*16|0).toString(16));

    const newMarker = new mapboxgl.Marker({
      draggable: true,
      color
    })
      .setLngLat( this.center )
      .addTo( this.mapa );

    this.marcadores.push({
      color,
      marker: newMarker
    });

    this.saveMarkers();

    newMarker.on( 'dragend', () => {
      this.saveMarkers();
    })

  }

  saveMarkers() {

    const lngLatArr: MarkerColor[] = []
    
    this.marcadores.forEach( m => {
      
      const color = m.color;
      const { lng, lat } = m.marker!.getLngLat();

      lngLatArr.push({
        color: color,
        centro: [ lng, lat ],
      })

    })

    localStorage.setItem('marcadores', JSON.stringify(lngLatArr) );

  }

  readLocalStorage() {
    
    if ( !localStorage.getItem( 'marcadores' ) ) {
      return;
    }

    const lngLatArr: MarkerColor[] = JSON.parse( localStorage.getItem('marcadores')! );

    lngLatArr.forEach( m => {
      
      const newMarker = new mapboxgl.Marker({
        color: m.color,
        draggable: true
      })
        .setLngLat( m.centro! )
        .addTo( this.mapa );

      this.marcadores.push({
        marker: newMarker,
        color: m.color
      });

      newMarker.on( 'dragend', () => {
        this.saveMarkers();
      })
    });
    
  }

  deleteMarker( i: number ) {
    
    this.marcadores[i].marker?.remove();
    this.marcadores.splice( i, 1 );
    this.saveMarkers();
    
  }

}
