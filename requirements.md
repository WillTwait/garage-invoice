# Fire Truck Invoice Generator

## Context

Call-to-action buttons help buyers get answers to common requests.

## Feature

- *Request PDF Invoice* call to action button
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

- [ ] figure out data model for what we want on pdf
	- [ ] look at current invoices
- [ ] function that calls api to get json response
	- [ ] map response to data model
- [ ] ui to input url, call function
	- [ ] error validation for bad input
	- [ ] loading
- [ ] design site
	- [ ] textbox
	- [ ] button
	- [ ] info?
- [ ] design my invoice
- [ ] figure out how to make pdf from invoice
- [ ] figure out how to download invoice
- [ ] figure out how to email invoice
