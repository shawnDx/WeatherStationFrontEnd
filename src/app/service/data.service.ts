import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DataService {
  stationList = [
    { name: "4onse UOM (MOD)", id: "4ONSE_UOM_MOD", type: 1 },
    { name: "Backmegahawaththa (PCB)", id: "BAKMEEGAHAWATHTHA_PCB", type: 1 },
    { name: "Bamunugama (MOD)", id: "BAMUNUGAMA_MOD", type: 1 },
    { name: "Bathalagoda (MOD)", id: "BATHALAGODA_MOD", type: 1 },
    { name: "Daduruoya reservoir dam (PCB)", id: "DADURUOYA_RESERVOIR_DAM_PCB", type: 1 },
    { name: "Gajanageehama (MOD)", id: "GAJANAGGEGAMA_MOD", type: 1 },
    { name: "Gunapala Malalasekara (MOD)", id: "GUNAPALA_MALALASEKARA_MOD", type: 1 },
    { name: "Hakwatuna (PCB)", id: "HAKWATUNA_PCB", type: 1 },
    { name: "Hettipola (PCB)", id: "HETTIPOLA_PCB", type: 1 },
    { name: "Hulugedara (MOD)", id: "HULOGEDARA_MOD", type: 1 },
    { name: "John Kothalawala (MOD)", id: "JOHN_KOTHALAWALA_MOD", type: 1 },
    { name: "Kadapathwehera (PCB)", id: "KEDAPATHWEHERA_PCB", type: 1 },
    { name: "Kimbulanwawa (PCB)", id: "KIMBULANWAWA_PCB", type: 1 },
    { name: "Kokawila (MOD)", id: "KOKKAWILA_MOD", type: 1 },
    { name: "Kubukgete (MOD)", id: "KUBUKGETE_MOD", type: 1 },
    { name: "Lankapura (PCB)", id: "LANKAPURA_PCB", type: 1 },
    { name: "Lyceum (MOD)", id: "LYCEUM_MOD", type: 1 },
    { name: "Meliya (PCB)", id: "MAELIYA_PCB", type: 1 },
    { name: "Malagane (MOD)", id: "MALAGANE_MOD", type: 1 },
    { name: "Madamulla (MOD)", id: "MEDAMULLA_MOD", type: 1 },
    { name: "Paragahadeniya (PCB)", id: "PARAGAHADENIYA_PCB", type: 1 },
    { name: "Polpithigama (MOD)", id: "POLPITHIGAMA_MOD", type: 1 },
    { name: "Porapola (PCB)", id: "PORAPOLA_PCB_2", type: 1 },
    { name: "Rambadagalla (PCB)", id: "RAMBADAGALLA_PCB", type: 1 },
    { name: "S.B Herath (MOD)", id: "SB_HERATH_MOD", type: 1 },
    { name: "Sri Sudaramaramaya (MOD)", id: "SRI_SUDARSHANARAMAYA_MOD", type: 1 },
    //{ name: "TEMPLATE_MOD", id: "TEMPLATE_MOD_OK" },
    //{ name: "Template_PCB_OK", id: "Template_PCB_OK" },
    { name: "University Of Moratuwa(FIT) PCB", id: "University%20of%20Moratuwa(FIT)PCB", type: 1 },
    { name: "University Of Moratuwa(TCP) PCB", id: "University%20of%20Moratuwa(TCP)PCB", type: 1 },
    { name: "Wlapane (PCB)", id: "WALAPANE_PCB", type: 1 },
    { name: "Wellangiriya (PCB)", id: "WELLANGIRIYA_PCB", type: 1 },
    { name: "Wewala (PCB)", id: "WEWALA_PCB", type: 1 },
    { name: "Withikuliya (MOD)", id: "WITHIKULIYA_MOD", type: 1 },
    { name: "Amunugama", id: "AMUNUGAMA_WL", type: 2 },
    { name: "Thorayaya", id: "THORAYAYA_WL", type: 2 },
    { name: "Deegama", id: "DEEGAMA_WL", type: 2 },
    { name: "Maspoththa", id: "MASPOTHA_WL", type: 2 },
    { name: "Moragoda", id: "MORAGODA_WL", type: 3 },
    { name: "Ridee bandi ella", id: "RIDEE%20BANDI%20ELLA%20ANICUT_WL", type: 2 },
  ]
  private station = new BehaviorSubject<string>('University%20of%20Moratuwa(FIT)PCB');
  currentStation = this.station.asObservable();

  private stationName = new BehaviorSubject<string>("University Of Moratuwa(FIT) PCB");
  currentStationName = this.stationName.asObservable();

  private type = new BehaviorSubject<number>(1);
  currentType = this.type.asObservable();

  private changePage = new BehaviorSubject<number>(1);
  currentPage = this.changePage.asObservable();

  constructor() { }

  changStation(station: string, stationName: string, type: number) {
    // console.log(station);
    this.station.next(station);
    this.stationName.next(stationName);
    this.type.next(type);
  }
  change(status: number) {
    this.changePage.next(status);
  }
}
