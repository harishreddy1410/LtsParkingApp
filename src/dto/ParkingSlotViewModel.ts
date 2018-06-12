import { DateTime } from "ionic-angular";

export class ParkingSlotViewModel{
    public Id:number;
    public IsOccupied:boolean;
    public Location:string;
    public Level :number;
    public SequenceOrder:number;
    public ParkingDivisionId:number;
    public CompanyId : number;
    public CreatedBy: number;
   
    //Additional properties 
    public UserId:number;
    public InTime:string;
    public OutTime:string;

    public OccupiedBy:string;
    public CompanyName:string;
    public SlotOccupiedByUserId:number;
}