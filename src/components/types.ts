export interface Service {
   nameOfService: string;
   price: number;
}
export interface Patient {
   profilePicture: string;
   name: string;
   emailAddress: string;
   phone: string;
   address: string;
}
export interface FormData {
   id: string;
   initialDate: Date;
   service: Service;
   patient: Patient;
   startingDateTime: Date;
   endingDateTime: Date;
}

export interface Event {
   id: string;
   patient: Patient;
   service: Service;
   startTime: Date;
   endTime: Date;
   timeStamp: Date
}
export interface Appointment {
   date: Date;
   events: Event[];
}