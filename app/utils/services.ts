import type { InvoiceData } from '../models/types';
import { v4 as uuidv4 } from 'uuid';
export interface ListingData {
  id: string;
  title?: string;
  description?: string;
  make?: string;
  model?: string;
  year?: number;
  price?: number;
  condition?: string;
  images?: string[];
}

// garage urls follow /listing/{truck-name}-{uuid} format
// this extracts the uuid to use for our api call
export function extractUUID(url: string): string | null {
  const match = url.match(/\/listing\/.*-(\w{8}-\w{4}-\w{4}-\w{4}-\w{12})$/);
  return match ? match[1] : null;
}

// i dont really know the return type, but ideally we have some trpc/zod to validate response
export async function fetchListingData(id: string) {
  try {
    const response = await fetch('https://garage-backend.onrender.com/getListing', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API error (${response.status}): ${errorText}`);
    }

    const data = await response.json();
    return data.result.listing;
  } catch (error) {
    console.error('Error fetching listing data:', error);
    throw error;
  }
}

export function mapListingToInvoiceData(listing: any, requestorEmail: string): InvoiceData {
  // gross, but like i said above ideally we know the reutrn type here
  const {
    id,
    listingTitle,
    itemBrand,
    listingDescription,
    itemAge,
    mileage,
    vin,
    itemLength,
    itemWidth,
    itemHeight,
    aerialLength,
    itemWeight,
    tankSize,
    pumpSize,
    hasServiceRecords,
    hasRust,
    hasPumpTest,
    originalPrice,
    finalPrice,
    createdAt,
    updatedAt,
    imageUrls = [],
    user: { email },
  } = listing;

  return {
    invoiceId: uuidv4(), // ideally server generated
    dateIssued: new Date(),

    seller: {
      contact: email,
    },

    buyer: {
      contact: requestorEmail,
    },

    details: {
      title: listingTitle.trim(),
      make: itemBrand,
      description: listingDescription.trim(),
      year: itemAge,
      mileage: mileage,
      vin: vin || null,
      dimensions: {
        length: itemLength ? Number(itemLength) : undefined,
        width: itemWidth ? Number(itemWidth) : undefined,
        height: itemHeight ? Number(itemHeight) : undefined,
        arialLength: aerialLength ? Number(aerialLength) : undefined,
      },
      weight: itemWeight,
      tankSize: tankSize,
      pumpCapacity: pumpSize,
      serviceRecordsAvailable: hasServiceRecords,
      rustPresent: hasRust,
      pumpTestAvailable: hasPumpTest,
      listingId: id,
      dateListed: new Date(createdAt).toISOString().split('T')[0],
      lastUpdated: new Date(updatedAt).toISOString().split('T')[0],
    },

    pricing: {
      originalPrice,
      finalPrice: finalPrice || originalPrice,
      taxes: 0, // update if needed
      totalAmountDue: finalPrice || originalPrice,
    },

    images: imageUrls,

    contactInfo: 'For inquiries, contact Garage at support@withgarage.com.',
  };
}

export async function fetchInvoiceData(id: string, requestorEmail: string) {
  try {
    const listingData = await fetchListingData(id);
    return mapListingToInvoiceData(listingData, requestorEmail);
  } catch (error) {
    console.error('Error fetching invoice data:', error);
    throw error;
  }
}
