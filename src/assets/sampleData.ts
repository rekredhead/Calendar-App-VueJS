import { v4 as uuidv4 } from 'uuid';
const generateRandomID = () => uuidv4().slice(0, 8);

export const sampleAppointments = [
   {
      date: new Date('2023-09-07'),
      events: [
         {
            id: generateRandomID(),
            patient: {
               profilePicture: '/sample.png',
               name: "Oliver Bennett",
               emailAddress: "oliver@bennett.co",
               phone: "(415) 555-1234",
               address: "123 Elm Street, Springfield, IL 62701"
            },
            service: {
               nameOfService: 'service2',
               price: 10
            },
            startTime: new Date('2023-09-07 2:15:00'),
            endTime: new Date('2023-09-07 5:45:00'),
            timeStamp: new Date('2023-09-07 7:07:07')
         }
      ]
   },
   {
      date: new Date('2023-09-04'),
      events: [
         {
            id: generateRandomID(),
            patient: {
               profilePicture: '/sample.png',
               name: 'Eleanor Pena',
               emailAddress: 'eleanor@pena.co',
               phone: '(270) 555-0117',
               address: ' 2715 Ash Dr. San Jose, South Dakota 837475'
            },
            service: {
               nameOfService: 'service1',
               price: 0
            },
            startTime: new Date('2023-09-04 1:15:00'),
            endTime: new Date('2023-09-04 3:00:00'),
            timeStamp: new Date('2023-09-04 4:04:04')
         }
      ]
   }
];

export const availableServices = [
   { nameOfService: 'service1', price: 0 },
   { nameOfService: 'service2', price: 10 },
   { nameOfService: 'service3', price: 20 },
   { nameOfService: 'service4', price: 30 },
   { nameOfService: 'service5', price: 40 },
];

export const availablePatients = [
   { profilePicture: '/sample.png', name: 'Eleanor Pena', emailAddress: 'eleanor@pena.co', phone: '(270) 555-0117', address: ' 2715 Ash Dr. San Jose, South Dakota 837475' },
   { profilePicture: '/sample.png', name: "Oliver Bennett", emailAddress: "oliver@bennett.co", phone: "(415) 555-1234", address: "123 Elm Street, Springfield, IL 62701" },
   { profilePicture: '/sample.png', name: "Sophia Rodriguez", emailAddress: "sophia@rodriguez.co", phone: "(602) 555-5678", address: "789 Oak Avenue, Phoenix, AZ 85001" },
   { profilePicture: '/sample.png', name: "Liam Campbell", emailAddress: "liam@campbell.co", phone: "(312) 555-7890", address: "456 Maple Lane, Chicago, IL 60601" },
   { profilePicture: '/sample.png', name: "Ava Foster", emailAddress: "ava@foster.co", phone: "(713) 555-2345", address: "987 Pine Road, Houston, TX 77001" },
   { profilePicture: '/sample.png', name: "Noah Hughes", emailAddress: "noah@hughes.co", phone: "(502) 555-6789", address: "654 Birch Street, Louisville, KY 40201" }
];