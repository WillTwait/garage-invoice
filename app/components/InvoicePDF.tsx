'use client';

import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import { InvoiceData } from '../models/types';

export default function InvoicePDF({ invoiceData }: { invoiceData: InvoiceData }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.headerContainer}>
          <Text style={styles.header}>INVOICE</Text>
          <Text style={styles.invoiceNumber}>#{invoiceData.invoiceId.substring(0, 8)}</Text>
          <Text style={styles.invoiceDate}>
            Date: {new Date(invoiceData.dateIssued).toLocaleDateString()}
          </Text>
        </View>

        {/* Vehicle Title Section */}
        <View style={styles.titleSection}>
          <Text style={styles.vehicleTitle}>{invoiceData.details.title}</Text>
        </View>

        {/* Main Image */}
        {invoiceData.images && invoiceData.images.length > 0 && (
          <Image style={styles.image} src={invoiceData.images[0]} />
        )}

        {/* Basic Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>VEHICLE DETAILS</Text>

          <View style={styles.twoColumnGrid}>
            <View style={styles.detailItem}>
              <Text style={styles.label}>Make:</Text>
              <Text style={styles.value}>{invoiceData.details.make}</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.label}>Year:</Text>
              <Text style={styles.value}>{invoiceData.details.year}</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.label}>Mileage:</Text>
              <Text style={styles.value}>{invoiceData.details.mileage.toLocaleString()} miles</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.label}>VIN:</Text>
              <Text style={styles.value}>{invoiceData.details.vin || 'Not provided'}</Text>
            </View>
          </View>
        </View>

        <View style={styles.divider} />

        {/* Specifications */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>SPECIFICATIONS</Text>

          <View style={styles.twoColumnGrid}>
            <View style={styles.detailItem}>
              <Text style={styles.label}>Dimensions:</Text>
              <Text style={styles.value}>
                {`L: ${invoiceData.details.dimensions.length || 'N/A'} in, 
                  W: ${invoiceData.details.dimensions.width || 'N/A'} in, 
                  H: ${invoiceData.details.dimensions.height || 'N/A'} in
                  ${
                    invoiceData.details.dimensions.arialLength
                      ? `Aerial: ${invoiceData.details.dimensions.arialLength} ft`
                      : ''
                  }`}
              </Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.label}>Weight:</Text>
              <Text style={styles.value}>
                {invoiceData.details.weight
                  ? `${invoiceData.details.weight.toLocaleString()} lbs`
                  : 'N/A'}
              </Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.label}>Tank Size:</Text>
              <Text style={styles.value}>
                {invoiceData.details.tankSize ? `${invoiceData.details.tankSize} gallons` : 'N/A'}
              </Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.label}>Pump Capacity:</Text>
              <Text style={styles.value}>
                {invoiceData.details.pumpCapacity
                  ? `${invoiceData.details.pumpCapacity} GPM`
                  : 'N/A'}
              </Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.label}>Service Records:</Text>
              <Text style={styles.value}>
                {invoiceData.details.serviceRecordsAvailable ? 'Available' : 'Not Available'}
              </Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.label}>Pump Test:</Text>
              <Text style={styles.value}>
                {invoiceData.details.pumpTestAvailable ? 'Available' : 'Not Available'}
              </Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.label}>Rust Present:</Text>
              <Text style={styles.value}>{invoiceData.details.rustPresent ? 'Yes' : 'No'}</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.label}>Listing Date:</Text>
              <Text style={styles.value}>{invoiceData.details.dateListed}</Text>
            </View>
          </View>
        </View>

        <View style={styles.divider} />

        {/* Description */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>DESCRIPTION</Text>
          <Text style={styles.description}>
            {invoiceData.details.description || 'No description provided'}
          </Text>
        </View>

        <View style={styles.divider} />

        {/* Pricing Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>PRICING</Text>
          <View style={styles.pricingBox}>
            <Text style={styles.priceLabel}>Total Price:</Text>
            <Text style={styles.priceValue}>${invoiceData.pricing.price.toLocaleString()}</Text>
          </View>
        </View>

        <View style={styles.divider} />

        {/* Buyer & Seller Info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>TRANSACTION DETAILS</Text>
          <View style={styles.twoColumnGrid}>
            <View style={styles.detailItem}>
              <Text style={styles.label}>Seller:</Text>
              <Text style={styles.value}>{invoiceData.seller.contact}</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.label}>Buyer:</Text>
              <Text style={styles.value}>{invoiceData.buyer.contact}</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.label}>Listing ID:</Text>
              <Text style={styles.value}>{invoiceData.details.listingId}</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.label}>Last Updated:</Text>
              <Text style={styles.value}>{invoiceData.details.lastUpdated}</Text>
            </View>
          </View>
        </View>

        {/* Footer */}
        <Text style={styles.footer}>
          This document serves as an official invoice for the vehicle listed above.
          {'\n'}
          {invoiceData.contactInfo}
        </Text>
      </Page>
    </Document>
  );
}

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: 'Helvetica',
    fontSize: 12,
    lineHeight: 1.5,
  },
  headerContainer: {
    marginBottom: 30,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  invoiceNumber: {
    paddingVertical: 10,
    fontSize: 14,
    color: '#555',
  },
  invoiceDate: {
    fontSize: 14,
    color: '#555',
  },
  titleSection: {
    marginBottom: 20,
  },
  vehicleTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
    paddingBottom: 5,
    borderBottom: '1px solid #eee',
  },
  twoColumnGrid: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  detailItem: {
    width: '50%',
    marginBottom: 10,
    paddingRight: 10,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 2,
  },
  value: {
    color: '#444',
  },
  divider: {
    borderBottom: '1px solid #eee',
    marginBottom: 20,
  },
  image: {
    width: 250,
    height: 180,
    objectFit: 'contain',
    marginBottom: 20,
    alignSelf: 'center',
  },
  pricingBox: {
    backgroundColor: '#f8f8f8',
    padding: 15,
    borderRadius: 5,
    marginTop: 5,
  },
  priceLabel: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  priceValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 5,
  },
  description: {
    color: '#333',
    lineHeight: 1.6,
  },
  footer: {
    marginTop: 30,
    fontSize: 10,
    color: '#666',
    textAlign: 'center',
  },
});
