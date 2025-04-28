# Fire Truck Invoice Generator

## Context

Call-to-action buttons help buyers get answers to common requests.

## Feature

- _Request PDF Invoice_ call to action button
- many depts need a paper invoice to give board for approval
- provide basic information about truck
- click button, have pdf downloaded and/or emailed to them

## Requirements

- React or NextJS site that has a text input field
- paste link, get access to pdf that is programmatically created
  - POST‬‭ https://garage-backend.onrender.com/getListing‬
  - Accepts field‬‭ id‬‭ which is the UUID found after‬‭ /listing‬‭ on any of our listing URLs.‬
- styled

## Features / To Do

- [x] figure out data model for what we want on pdf
  - [x] look at current invoices
- [x] function that calls api to get json response
  - [x] map response to data model
- [x] ui to input url, call function
  - [x] error validation for bad input
  - [x] loading
- [x] design site
  - [x] textbox
  - [x] button
  - [x] info?
- [x] design my invoice
- [x] figure out how to make pdf from invoice
- [x] figure out how to download invoice
- [ ] figure out how to email invoice
