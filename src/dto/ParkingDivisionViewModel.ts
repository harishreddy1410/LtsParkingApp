import { List } from "ionic-angular";
import { ParkingSlotViewModel } from '../dto/ParkingSlotViewModel';

export class ParkingDivisionViewModel{
    public Id:number;
    public Name:string;
    public SequenceOrder:number;
    public LocationId:number;
    public ParkingSlots:ParkingSlotViewModel[]
}