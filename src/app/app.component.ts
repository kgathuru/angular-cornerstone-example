import { AfterViewInit, Component, OnInit } from '@angular/core';
import { CornerstoneService } from './services/cornerstone.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {


  imageData: any;

  constructor(public csS: CornerstoneService) {

  }


  ngOnInit() {

    // for (const i of ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18']) {
    //   this.csS.fetchDicomImage(`http://localhost:4200/assets/dicom/CT0000${i}.dcm`)
    //     .subscribe(res => this.imageData = res);
    // }
    // wadouri:http://localhost:8042/instances/8cce70aa-576ad738-b76cb63f-caedb3c7-2b213aae/file
    // this.csS.fetchDicomImage(`http://localhost:4200/assets/dicom/CT000001.dcm`)
    // https://pacs.health-e-net.org/instances/90bd4b05-50b22324-5e443443-c1beb452-b2a79ddd/file
    this.csS.fetchDicomImage(`/api/instances/90bd4b05-50b22324-5e443443-c1beb452-b2a79ddd/file`)
    .subscribe(res => this.imageData = res);
  }

}
