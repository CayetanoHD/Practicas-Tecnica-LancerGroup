export interface LoginResponse {
    code: number,
    datos: any,
    User: User,
    token: string,
    FutureReservations: any[],
    ReservationHistory: any[];
} 

export interface User {
    UserId:any
    Vehicles:any
    custumerName:string
    phoneNumber:string
    profilePic:string
    status:string
    userEmail:string
}