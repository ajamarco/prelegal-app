"use client";

import { useState } from "react";
import { defaultNdaData, type NdaFormData } from "@/lib/nda";
import NdaForm from "./NdaForm";
import NdaPreview from "./NdaPreview";

export default function NdaBuilder() {
  const [data, setData] = useState<NdaFormData>(defaultNdaData);

  const patch = (p: Partial<NdaFormData>) => setData((d) => ({ ...d, ...p }));

  const download = () => {
    const previous = document.title;
    document.title = "Mutual-NDA";
    const restore = () => {
      document.title = previous;
      window.removeEventListener("afterprint", restore);
    };
    window.addEventListener("afterprint", restore);
    window.print();
  };

  return (
    <div className="flex min-h-screen flex-col bg-workspace print:block print:min-h-0 print:bg-white">
      <header className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-slate-300/70 bg-white/90 px-5 py-3 backdrop-blur print:hidden">
        <div>
          <p className="text-lg font-semibold leading-tight text-ink">Prelegal</p>
          <p className="text-sm text-slate-500">Mutual Non-Disclosure Agreement</p>
        </div>
        <button
          type="button"
          onClick={download}
          className="rounded-md bg-signal px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-signal/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-signal/50 focus-visible:ring-offset-2"
        >
          Download PDF
        </button>
      </header>

      <main className="grid flex-1 lg:grid-cols-[minmax(380px,460px)_1fr] print:block">
        <section
          aria-label="NDA details"
          className="border-slate-300/70 bg-white p-5 sm:p-7 lg:h-[calc(100vh-61px)] lg:overflow-y-auto lg:border-r print:hidden"
        >
          <NdaForm data={data} onChange={patch} />
        </section>

        <section
          aria-label="Live preview"
          className="px-3 py-8 sm:px-8 lg:h-[calc(100vh-61px)] lg:overflow-y-auto print:h-auto print:overflow-visible print:p-0"
        >
          <NdaPreview data={data} />
        </section>
      </main>
    </div>
  );
}
