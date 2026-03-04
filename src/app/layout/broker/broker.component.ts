import {
  Component,
  OnInit
} from '@angular/core';

@Component({
  selector: 'app-broker',
  standalone: false,
  templateUrl: './broker.component.html',
  styleUrls: ['./broker.component.css']
})
export class BrokerComponent implements OnInit {
  mostrarSidebar: boolean;

  constructor() {
    console.log('at ctor BrokerComponent')

   }

  ngOnInit() {
  }

}
