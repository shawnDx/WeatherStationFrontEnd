import { Component, OnInit } from '@angular/core';
import { DataService } from '../../service/data.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor(private data: DataService) { }
  stationList = [
    { name: "4onse UOM (MOD)", id: "4ONSE_UOM_MOD" },
    { name: "Backmegahawaththa (PCB)", id: "BAKMEEGAHAWATHTHA_PCB" },
    { name: "Bamunugama (MOD)", id: "BAMUNUGAMA_MOD" },
    { name: "Bathalagoda (MOD)", id: "BATHALAGODA_MOD" },
    { name: "Daduruoya reservoir dam (PCB)", id: "DADURUOYA_RESERVOIR_DAM_PCB" },
    { name: "Gajanageehama (MOD)", id: "GAJANAGGEGAMA_MOD" },
    { name: "Gunapala Malalasekara (MOD)", id: "GUNAPALA_MALALASEKARA_MOD" },
    { name: "Hakwatuna (PCB)", id: "HAKWATUNA_PCB" },
    { name: "Hettipola (PCB)", id: "HETTIPOLA_PCB" },
    { name: "Hulugedara (MOD)", id: "HULOGEDARA_MOD" },
    { name: "John Kothalawala (MOD)", id: "JOHN_KOTHALAWALA_MOD" },
    { name: "Kadapathwehera (PCB)", id: "KEDAPATHWEHERA_PCB" },
    { name: "Kimbulanwawa (PCB)", id: "KIMBULANWAWA_PCB" },
    { name: "Kokawila (MOD)", id: "KOKKAWILA_MOD" },
    { name: "Kubukgete (MOD)", id: "KUBUKGETE_MOD" },
    { name: "Lankapura (PCB)", id: "LANKAPURA_PCB" },
    { name: "Lyceum (MOD)", id: "LYCEUM_MOD" },
    { name: "Meliya (PCB)", id: "MAELIYA_PCB" },
    { name: "Malagane (MOD)", id: "MALAGANE_MOD" },
    { name: "Paragahadeniya (PCB)", id: "PARAGAHADENIYA_PCB" },
    { name: "Polpithigama (MOD)", id: "POLPITHIGAMA_MOD" },
    { name: "Porapola (PCB)", id: "PORAPOLA_PCB" },
    { name: "Rambadagalla (PCB)", id: "RAMBADAGALLA_PCB" },
    { name: "S.B Herath (MOD)", id: "SB_HERATH_MOD" },
    { name: "Sri Sudaramaramaya (MOD)", id: "SRI_SUDARSHANARAMAYA_MOD" },
    //{ name: "TEMPLATE_MOD", id: "TEMPLATE_MOD_OK" },
    //{ name: "Template_PCB_OK", id: "Template_PCB_OK" },
    { name: "University Of Moratuwa(FIT) PCB", id: "University%20of%20Moratuwa(FIT)PCB" },
    { name: "University Of Moratuwa(TCP) PCB", id: "University%20of%20Moratuwa(TCP)PCB" },
    { name: "Wlapane (PCB)", id: "WALAPANE_PCB" },
    { name: "Wellangiriya (PCB)", id: "WELLANGIRIYA_PCB" },
    { name: "Wewala (PCB)", id: "WEWALA_PCB" },
    { name: "Withikuliya (MOD)", id: "WITHIKULIYA_MOD" },
  ]
  ngOnInit() {
  }

  changeStation(id: string, name: string) {
    this.data.changStation(id, name);
  }

}

//AMUNUGAMA_WL
//DADURUOYA_RESERVOIR_DAM_PCB
//DEEGAMA_WL