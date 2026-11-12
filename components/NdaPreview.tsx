import type { ReactNode } from "react";
import { formatDate, pluralYears, type NdaFormData, type Party } from "@/lib/nda";

/** A user-supplied value, highlighted; falls back to a muted placeholder. */
function Val({ value, placeholder }: { value?: string; placeholder: string }) {
  const filled = !!value?.trim();
  return (
    <span className={filled ? "nda-val" : "nda-val nda-val-empty"}>
      {filled ? value : placeholder}
    </span>
  );
}

function Check({ on, children }: { on: boolean; children: ReactNode }) {
  return (
    <li className="nda-check">
      <span className={on ? "nda-box nda-box-on" : "nda-box"} aria-hidden>
        {on ? "✓" : ""}
      </span>
      <span>
        <span className="sr-only">{on ? "Selected: " : "Not selected: "}</span>
        {children}
      </span>
    </li>
  );
}

const partyRows: { label: string; hint?: string; key: keyof Party | "signature" }[] = [
  { label: "Signature", key: "signature" },
  { label: "Print Name", key: "name" },
  { label: "Title", key: "title" },
  { label: "Company", key: "company" },
  { label: "Notice Address", hint: "Use either email or postal address", key: "address" },
  { label: "Date", key: "date" },
];

export default function NdaPreview({ data }: { data: NdaFormData }) {
  const fixedTerm = data.mndaTermMode === "fixed";
  const fixedConf = data.confidentialityMode === "fixed";

  return (
    <article className="nda-paper" aria-label="Mutual NDA preview">
      <h1 className="nda-title">Mutual Non-Disclosure Agreement</h1>

      <h2 className="nda-h2">Using this Mutual Non-Disclosure Agreement</h2>
      <p>
        This Mutual Non-Disclosure Agreement (the “MNDA”) consists of: (1) this Cover
        Page (“<b>Cover Page</b>”) and (2) the Common Paper Mutual NDA Standard Terms
        Version 1.0 (“<b>Standard Terms</b>”) identical to those posted at{" "}
        <a href="https://commonpaper.com/standards/mutual-nda/1.0">
          commonpaper.com/standards/mutual-nda/1.0
        </a>
        . Any modifications of the Standard Terms should be made on the Cover Page,
        which will control over conflicts with the Standard Terms.
      </p>

      <section className="nda-section">
        <h3 className="nda-h3">Purpose</h3>
        <p className="nda-hint">How Confidential Information may be used</p>
        <p>
          <Val value={data.purpose} placeholder="[Describe the purpose]" />
        </p>
      </section>

      <section className="nda-section">
        <h3 className="nda-h3">Effective Date</h3>
        <p>
          <Val value={formatDate(data.effectiveDate)} placeholder="[Select a date]" />
        </p>
      </section>

      <section className="nda-section">
        <h3 className="nda-h3">MNDA Term</h3>
        <p className="nda-hint">The length of this MNDA</p>
        <ul className="nda-checks">
          <Check on={fixedTerm}>
            Expires <Val value={pluralYears(data.mndaTermYears)} placeholder="[N years]" />{" "}
            from Effective Date.
          </Check>
          <Check on={!fixedTerm}>
            Continues until terminated in accordance with the terms of the MNDA.
          </Check>
        </ul>
      </section>

      <section className="nda-section">
        <h3 className="nda-h3">Term of Confidentiality</h3>
        <p className="nda-hint">How long Confidential Information is protected</p>
        <ul className="nda-checks">
          <Check on={fixedConf}>
            <Val
              value={pluralYears(data.confidentialityYears)}
              placeholder="[N years]"
            />{" "}
            from Effective Date, but in the case of trade secrets until Confidential
            Information is no longer considered a trade secret under applicable laws.
          </Check>
          <Check on={!fixedConf}>In perpetuity.</Check>
        </ul>
      </section>

      <section className="nda-section">
        <h3 className="nda-h3">Governing Law &amp; Jurisdiction</h3>
        <p>
          Governing Law:{" "}
          <Val value={data.governingLaw} placeholder="[Fill in state]" />
        </p>
        <p>
          Jurisdiction:{" "}
          <Val
            value={data.jurisdiction}
            placeholder="[Fill in city or county and state, e.g. “courts located in New Castle, DE”]"
          />
        </p>
      </section>

      <section className="nda-section">
        <h3 className="nda-h3">MNDA Modifications</h3>
        <p>
          {data.modifications.trim() ? (
            <Val value={data.modifications} placeholder="" />
          ) : (
            <span className="nda-muted">None.</span>
          )}
        </p>
      </section>

      <p className="nda-keep">
        By signing this Cover Page, each party agrees to enter into this MNDA as of the
        Effective Date.
      </p>

      <table className="nda-table">
        <thead>
          <tr>
            <th scope="col"><span className="sr-only">Field</span></th>
            <th scope="col">Party 1</th>
            <th scope="col">Party 2</th>
          </tr>
        </thead>
        <tbody>
          {partyRows.map((row) => (
            <tr key={row.label}>
              <th scope="row">
                {row.label}
                {row.hint && <span className="nda-hint nda-hint-cell">{row.hint}</span>}
              </th>
              {[data.party1, data.party2].map((p, i) => (
                <td key={i} className={row.key === "signature" ? "nda-sig" : undefined}>
                  {row.key === "signature" ? null : row.key === "date" ? (
                    formatDate(p.date) && <span className="nda-val">{formatDate(p.date)}</span>
                  ) : (
                    p[row.key].trim() && <span className="nda-val">{p[row.key]}</span>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <p className="nda-footer">
        Common Paper Mutual Non-Disclosure Agreement (Version 1.0) free to use under{" "}
        <a href="https://creativecommons.org/licenses/by/4.0/">CC BY 4.0</a>.
      </p>
    </article>
  );
}
