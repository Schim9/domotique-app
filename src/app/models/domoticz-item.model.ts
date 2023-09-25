export class DomoticzItem {
    id: number = 0  // idx
    title: string = '' // Name
    caption: string = ''
    type: string = ''  // SwitchType ou Type
    plan?: string = ''  // PlanID
}



/**
 *  VMC / Déco
 *  "SwitchType": "On/Off",
 *  "Type": "Light/Switch",
 *
 *  Volet
 *  "SwitchType": "Blinds",
 *  "Type": "RFY",
 *
 *  Température
 *  "Type": "Temp + Humidity",
 *
 *  Etat Porte Garage
 *  "Type": "Light/Switch",
 *  "SwitchType": "Motion Sensor",
**/
