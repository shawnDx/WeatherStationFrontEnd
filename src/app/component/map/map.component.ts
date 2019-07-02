import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../service/api.service';
import Map from 'ol/Map';
import Tile from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import View from 'ol/View';
import { fromLonLat } from 'ol/proj.js';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import TileJSON from 'ol/source/TileJSON';
import VectorSource from 'ol/source/Vector';
import { Icon, Style } from 'ol/style';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';

import Overlay from 'ol/Overlay';
import { toStringHDMS } from 'ol/coordinate.js';
import { toLonLat } from 'ol/proj.js';

/**
 * 
 */
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { DataService } from '../../service/data.service';
import * as moment from 'moment';
import * as momentTz from 'moment-timezone';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  /**
   * 
   */
  feture = [];
  stationData: any
  weaterData: any
  locations = [[80.364926, 7.487025], [79.902028, 6.797230], [80.322938, 7.644338, 90]]
  marker;
  vectorSource;
  vectorLayer;
  rasterLayer;
  london: any;
  madrid: any;

  raninig = new Style({
    image: new Icon(({
      color: [14, 180, 180],
      crossOrigin: 'center',
      src: '../../assets/marker.png',
      scale: 0.12,
      anchor: [0.5, 1]
    }))
  });
  /**
   * 
   */
  private ngUnsubscribe = new Subject();
  /**
   * 
   */
  constructor(private api: ApiService, private data: DataService) { }

  ngOnInit() {
    this.api.getLocationForAllStation().pipe(takeUntil(this.ngUnsubscribe)).subscribe((result) => {
      this.initilizeMap(result.result);
    });

    this.refreshmarker();
    setInterval(() => {
      console.log("Update");
      this.refreshmarker();
    }, 60000)
    // this.map2();
  }

  initilizeMap(location) {
    console.log(location.length);

    const style = new Style({
      image: new Icon(({
        color: [14, 180, 14],
        crossOrigin: 'center',
        src: '../../assets/marker.png',
        scale: 0.12,
        anchor: [0.5, 1]
      }))
    });

    const deactive = new Style({
      image: new Icon(({
        color: [180, 14, 14],
        crossOrigin: 'center',
        src: '../../assets/marker.png',
        scale: 0.12,
        anchor: [0.5, 1]
      }))
    });

    const river = new Style({
      image: new Icon(({
        color: [180, 14,180],
        crossOrigin: 'center',
        src: '../../assets/marker.png',
        scale: 0.12,
        anchor: [0.5, 1]
      }))
    });
    /**
     * 
     */
    const container = document.getElementById('popup');
    const content = document.getElementById('popup-content');
    const closer = document.getElementById('popup-closer');
    /**
     * 
     */

    /**
     * 
     */
    var marker;
    // for (let index = 0; index < this.locations.length; index++) {
    //   marker = new Feature({
    //     geometry: new Point(fromLonLat(this.locations[index])),
    //     name: 'Null Island',
    //     id: index
    //   });
    //   marker.setStyle(style);
    //   feture.push(marker)
    // }

    for (let index = 0; index < location.length; index++) {
      if (location[index].location.length > 0) {
        // console.log(location[index].location);
        // console.log(location[index].ldlog);
        /***
         * 
         * Time verification
         */
        var now = momentTz().tz("Asia/Colombo");
        var end = momentTz(location[index].ldlog).tz("Asia/Colombo");
        var duration = moment.duration(now.diff(end));
        // console.log(duration.asMinutes().toFixed(1));
        var time = Number(duration.asMinutes().toFixed(1));
        // console.log(time);

        /**
         * 
         */
        if (time < 121) {
          marker = new Feature({
            geometry: new Point(fromLonLat(location[index].location)),
            name: location[index].name,
            id: location[index].id,
            type: location[index].type,
            active: true
          });
          // console.log(location[index].type);
          if (location[index].type == 1) {
            marker.setStyle(style);
          }
          else {
            marker.setStyle(river);
          }
        }
        else {
          marker = new Feature({
            geometry: new Point(fromLonLat(location[index].location)),
            name: location[index].name,
            id: location[index].id,
            type: location[index].type,
            active: false
          });
          marker.setStyle(deactive);
        }
        this.feture.push(marker)
      }
    }

    const overlay = new Overlay({
      element: container,
      autoPan: true,
      autoPanAnimation: {
        duration: 250
      }
    });

    this.marker = new Feature({
      geometry: new Point(fromLonLat([80.364926, 7.487025]))
    });


    this.vectorSource = new VectorSource({
      features: this.feture
    });

    this.vectorLayer = new VectorLayer({
      source: this.vectorSource
    });

    this.rasterLayer = new TileLayer({
      source: new OSM()
    });

    const map = new Map({

      target: 'map',
      layers: [
        this.rasterLayer,
        this.vectorLayer,
      ],
      overlays: [overlay],
      view: new View({
        center: fromLonLat([80.464926, 7.387025]),
        zoom: 9.5
      })
    });

    closer.onclick = () => {
      this.weaterData = undefined; //##################
      overlay.setPosition(undefined);
      closer.blur();
      return false;
    };

    map.on('click', (evt) => {
      const coordinate = evt.coordinate;
      this.weaterData = undefined; //##################
      var feature = map.forEachFeatureAtPixel(evt.pixel,
        function (feature) {
          return feature;
        });
      // console.log(feature);
      if (feature) {
        this.stationData = { name: feature.get('name'), id: feature.get('id'), type: feature.get('type') };
        this.getdata(feature.get('id'), feature.get('type'), (data) => {
          this.weaterData = data;
        });
        overlay.setPosition(coordinate);
      }
      else {
        this.weaterData = undefined; //##################
        overlay.setPosition(undefined);
        closer.blur();
        return false;
      }
    });
  }
  getdata = (id, type, callback): any => {
    var data;
    this.api.getThisTimeData({ station: id, type: type }).pipe(takeUntil(this.ngUnsubscribe)).subscribe(data => {
      // console.log(data);
      callback(data);
    })
  }
  refreshmarker() {
    for (let index = 0; index < this.feture.length; index++) {
      if (this.feture[index].get('type') == "1" && this.feture[index].get('active')) {
        /**
         * analize data for rain
         */
        this.getdata(this.feture[index].get('id'), this.feture[index].get('type'), (data) => {
          for (let i = 0; i < data.length; i++) {
            if (Number(data[i].rainFall) != 0) {
              this.feture[index].setStyle(this.raninig);
              break;
            }
          }
          // this.feture[index].setStyle(this.raninig);
        })

      }
      // this.feture[index].setStyle(this.raninig);
    }
    // console.log("done");
  }
}
