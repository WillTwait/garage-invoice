export interface InvoiceData {
  invoiceId: string; // uuid we would generate
  dateIssued: Date;
  seller: {
    // i only have seller uuid and email from the api, but i would probably join to the USERS table to get name, etc
    contact: string;
  };
  buyer: {
    contact: string;
  };
  details: {
    title: string;
    make: string;
    description: string; // this is newline seperated
    year: number;
    mileage: number;
    vin: string | null;
    // ideally i have a better idea for what is required in a listing, but noticing these can be 0
    dimensions: {
      length?: number; // in
      width?: number; // in
      height?: number; // in
      arialLength?: number; // ft
    };
    weight: number;
    tankSize: number;
    pumpCapacity: number;
    serviceRecordsAvailable: boolean;
    rustPresent: boolean;
    pumpTestAvailable: boolean;
    listingId: string;
    dateListed: string;
    lastUpdated: string;
  };
  pricing: {
    originalPrice: number;
    finalPrice: number;
    taxes: number;
    totalAmountDue: number;
  };
  images: string[];
  contactInfo: string;
}
