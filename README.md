This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

If you run into any issues starting it, you may need to reference the [NextJS installation docs](https://nextjs.org/docs/app/getting-started/installation).

## Getting Started

First, install the dependencies:

```bash
npm install
```

To run the app, start your development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to use the export component!

I also have the project published at https://garage-invoice.twait.dev/ right now if you want to try without local development.

You can run tests with `npm run test`.

If you have any issues, you can reach out to me for assistance at will.twait@gmail.com!

## PDF Generation

This project uses `@react-pdf/renderer` to generate the invoices. I chose this since since this seemed like a pretty well supported client-side pdf library that uses React-style components.

## Known Issues

The main issue I ran into was not really knowing what our schema looks like for a listing, specifically with what is optional vs required, and if different "listing types" have different models (auctions vs normal sales).

For example, I ran into an issue where two different listing had different pricing responses (things like `finalPrice`, etc), so I was getting an error trying to access fields that didn't exist. Same thing for `arielLength`, which exists on some trucks but not others. I think this issue would be pretty easily handled if I knew the exact schema/return types for the getListing API.

Another feature I left out was the email generation, instead opting for just client-side functionality. If I was really building out this feature, I would probably have some sort of server-side email service to send the pdf on request.

Finally, I've really only tested on desktop, and haven't really built in mobile-optimized styling. If I was building out this feature completely, we would want to make sure everything is looking good on mobile screens!
