import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import emailjs from '@emailjs/browser';
import * as L from 'leaflet';
import axios from 'axios';
import { Observable } from 'rxjs';
import { environment } from '.././environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class EmailsService {
  mapContainer: any;

  constructor(public http: HttpClient, public router: Router, public toastr: ToastrService) { }

  async SentEmail(object: any) {
 
    return new Promise<void>((resolve, reject) => {
      emailjs.send('service_x4si89o', 'template_yw6n7gv', object, 'uQNPmbMJbnsEgcVAf')
        .then(
          (response: any) => {

            console.log("SUCCESS!", response.status, response.text);
            resolve();

          },
          (error: any) => {
            console.log("FAILED!", error);

          });
    })
  }
  lat: any;
  lng: any;
  marker: L.Marker | undefined;
  openmap() {
    return new Promise<void>((resolve, reject) => {
      // Initialize the map
      const map = L.map('map').setView([31.9515694, 35.9239625], 13);
  
      // Add the tile layer to the map
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(map);
  
      // Add a click event to the map
      map.on('click', (event: L.LeafletMouseEvent) => {
        // Remove the previous marker if it exists
        if (this.marker) {
          map.removeLayer(this.marker);
        }
  
        // Create a red marker at the clicked location
        this.marker = L.marker(event.latlng, {
          icon: L.icon({
            iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41]
          })
        }).addTo(map);
  
        // Store the coordinates
        this.lat = event.latlng.lat;
        this.lng = event.latlng.lng;
        console.log(`Clicked at ${this.lat}, ${this.lng}`);
      });
  
      // Resolve the promise
      resolve();
    });
  }
// setVariable(clientid:any): Promise<void> {
//   return new Promise<void>((resolve) => {
//     // Set your variable value here
//     (window as any).myVariable = clientid;
//     resolve();
//   });
// }

  zoomMeetingUrl: any
  ZoomGenerator(data: any, options: any) {

    return new Promise<void>((resolve, reject) => {

      this.http.post('https://api.zoom.us/v2/users/me/meetings', data, options)
        .subscribe((response: any) => {

          console.log(`Zoom Meeting URL: ${response.join_url}`);
          this.zoomMeetingUrl = response.join_url;

          resolve();
        });
    })
  }

  meetingss: any
  startUrl: any;
  getMeetings() {
    return new Promise<void>((resolve, reject) => {
      this.http.post(`${environment.apiUrl}/Zoom/CreateMeeting`, {}).subscribe(
        (res) => {
          this.startUrl = res;

          resolve()
        },
        (err) => {

          ;
        }
      )
    })
  }
  // setVariable(): Promise<void> {
//   return new Promise<void>((resolve) => {
//     // Set your variable value here
//     (window as any).myVariable = 'some value';
//     resolve();
//   });
// }
}
