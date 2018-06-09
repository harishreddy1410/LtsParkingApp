import { List } from "ionic-angular";
import { ParkingSlotViewModel } from '../dto/ParkingSlotViewModel';

export class ParkingDivisionViewModel{
    public Id:number;
    public IsActive : boolean;
    public IsDeleted: boolean;
    public IsOccupied: boolean;
    public Level: number;
    public Name:string;
    public SequenceOrder:number;
    public Location:string;
    public Type: number;
    public CompanyId: number;
    public ParkingDivisionId: number;
    //public ParkingSlots:ParkingSlotViewModel[]
}