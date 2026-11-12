# Prelegal

Prelegal is a web application for drafting common legal documents. The first document it supports is the Mutual Non-Disclosure Agreement (NDA), based on the free Common Paper standard.

## What it does

The main page is split into two sides:

- On the left is a form where you enter the key details of the agreement.
- On the right is a live preview of the document. It updates as you type, so you always see exactly what the finished agreement will look like.

When you are happy with the result, the Download PDF button saves the document so you can send it or sign it.

## Capabilities

- Fill in the details of the NDA cover page: the purpose of the agreement, the effective date, how long the agreement lasts, how long information stays confidential, the governing law and jurisdiction, any modifications, and the details of both parties.
- Choose between a fixed number of years or an open-ended option for the agreement term and for the confidentiality period.
- Set the effective date with one click using the Use today button.
- See your changes in the preview immediately. Values you enter are highlighted, and fields you have not filled in yet show a dashed placeholder, so it is clear what is still missing.
- Download the finished document as a PDF.
- Use it on a phone or a computer. On small screens the form and the preview stack on top of each other.

The preview currently covers the cover page of the agreement. The standard terms that go with it are not shown or included in the PDF yet.

## How the PDF download works

The Download PDF button uses the browser's built-in print function. A print stylesheet hides the form and the page chrome, so only the document is printed, on Letter size paper with sensible margins. In the print dialog, choose Save as PDF as the destination.

We chose this approach over a PDF library for three reasons:

- The PDF always matches what you see in the preview, because both come from the same document.
- Text in the PDF stays selectable and searchable.
- It adds no extra dependencies to the project.

The trade-off is that saving is a two-step action (print, then Save as PDF) rather than a single click that downloads a file.

## Design decisions

- The document is the focus. The preview looks like a sheet of paper on a calm slate background, so the contract feels like a real document and not a web page.
- The contract is set in a serif typeface (Source Serif 4), while the form and interface use a clean sans-serif (Geist). This separates the legal text from the tools used to edit it.
- A single blue accent is used for the Download PDF button and for highlighting the values you type, so changes are easy to spot.
- Checkboxes in the preview show which term option is selected, the same way a printed cover page would.
- The wording of the preview follows the Common Paper cover page template word for word. Only the values you enter change.
- The preview paper stays white in every situation, so the printed result is consistent.

## Technology stack

- Next.js (App Router) as the web framework
- React for the interface
- TypeScript for type safety
- Tailwind CSS for styling, with custom styles for the document and the print layout
- Google Fonts, loaded through Next.js, for Geist and Source Serif 4
- ESLint for code quality

No database or backend is used. Everything you type stays in your browser and is never sent anywhere.

## Project structure

- `app/` holds the page, the layout and the global styles, including the print rules.
- `components/` holds the form, the live preview and the component that connects them.
- `lib/` holds the NDA data model, default values and date helpers.
- `templates/` holds the Common Paper legal templates and a `catalog.json` index of them.

## Getting started

Requires Node.js 20 or later.

```bash
npm install
npm run dev      # start the dev server at http://localhost:3000
npm run build    # create a production build
npm run start    # serve the production build
npm run lint     # run ESLint
```

## License and attribution

The NDA wording comes from the Common Paper Mutual NDA (Version 1.0), which is free to use under the CC BY 4.0 license. See the LICENSE file for the license of this project.
