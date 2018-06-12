import { LocationViewModel } from '../dto/LocationViewModel';
export class UserProfileViewModel{    
    public Id:number;
    public FirstName:string;
    public LastName:string;
    public PreferredName:string;
    public LocationId:number;
    public Role:any;
    public EmployeeShiftId:number;
    public Email:string;
    public CompanyId:number;
    public Location:LocationViewModel = new LocationViewModel();
}