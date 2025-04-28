import { extractUUID, fetchInvoiceData, fetchListingData } from '../utils/services';

const SPARTAN_URL =
  'https://www.withgarage.com/listing/1997-Spartan-Saulsbury-Engine-770b5acf-ac36-4ac3-abc6-052434fac900';

const HME_URL =
  'https://www.withgarage.com/listing/1996-HME-1871-Penetrator-198a60f5-c0ba-4a8f-9300-1f8d6ba6fe2a';

describe('Services Test', () => {
  describe('extractUUID', () => {
    it('should parse UUID correctly', () => {
      const uuid = extractUUID(SPARTAN_URL);
      expect(uuid).toBe('770b5acf-ac36-4ac3-abc6-052434fac900');
    });

    it('should handle bad URLs', () => {
      const uuid = extractUUID('https://www.withgarage.com/listing/1997-Spartan-Saulsbury-Engine');
      expect(uuid).toBeNull();
    });
  });

  describe('fetchListingData', () => {
    it('should fetch listing data', async () => {
      const spartanUUID = extractUUID(SPARTAN_URL);
      const hmeUUID = extractUUID(HME_URL);

      if (!spartanUUID || !hmeUUID) {
        throw new Error('UUID is null');
      }

      const spartanListing = await fetchListingData(spartanUUID);
      const hmeListing = await fetchListingData(hmeUUID);

      expect(spartanListing.itemBrand).toBe('Spartan/Saulsbury');
      expect(hmeListing.itemBrand).toBe('HME');
    });
  });

  describe('fetchInvoiceData', () => {
    it('should fetch invoice data', async () => {
      const spartanUUID = extractUUID(SPARTAN_URL);
      if (!spartanUUID) {
        throw new Error('UUID is null');
      }

      const invoice = await fetchInvoiceData(spartanUUID, 'test@test.com');
      expect(invoice.details.title).toBe('1997 Spartan/Saulsbury Engine');
      expect(invoice.pricing.price).toBe(30000);
      expect(invoice.details.year).toBe(1997);
      expect(invoice.details.dimensions.length).toBe(355);
      expect(invoice.details.dimensions.width).toBe(96);
      expect(invoice.details.dimensions.arialLength).toBe(undefined);
      expect(invoice.details.mileage).toBe(34000);

      const hmeUUID = extractUUID(HME_URL);
      if (!hmeUUID) {
        throw new Error('UUID is null');
      }

      const hmeInvoice = await fetchInvoiceData(hmeUUID, 'test@test.com');
      expect(hmeInvoice.details.pumpCapacity).toBe(1500);
      expect(hmeInvoice.details.year).toBe(1996);
      expect(hmeInvoice.details.dimensions.length).toBe(undefined);
    });
  });
});
