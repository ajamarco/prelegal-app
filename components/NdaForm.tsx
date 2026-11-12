import type { ReactNode } from "react";
import { todayIso, type NdaFormData, type Party, type TermMode } from "@/lib/nda";

type Props = {
  data: NdaFormData;
  onChange: (patch: Partial<NdaFormData>) => void;
};

const input =
  "w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-[15px] text-ink placeholder:text-slate-400 focus:border-signal focus:outline-none focus:ring-2 focus:ring-signal/25";

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="block text-sm font-medium text-ink">{label}</span>
      {hint && <span className="mb-1 block text-[13px] text-slate-500">{hint}</span>}
      <span className={hint ? "" : "mt-1 block"}>{children}</span>
    </label>
  );
}

function Group({ title, children }: { title: string; children: ReactNode }) {
  return (
    <fieldset className="space-y-4 border-t border-slate-200 pt-6 first:border-t-0 first:pt-0">
      <legend className="mb-4 text-base font-semibold text-ink">{title}</legend>
      {children}
    </fieldset>
  );
}

function TermChoice({
  legend,
  mode,
  years,
  fixedLabel,
  openLabel,
  onMode,
  onYears,
}: {
  legend: string;
  mode: TermMode;
  years: number;
  fixedLabel: [string, string];
  openLabel: string;
  onMode: (m: TermMode) => void;
  onYears: (n: number) => void;
}) {
  const name = legend.replace(/\s+/g, "-").toLowerCase();
  const radio = "h-4 w-4 accent-signal";
  return (
    <fieldset>
      <legend className="mb-1.5 text-sm font-medium text-ink">{legend}</legend>
      <div className="space-y-2 rounded-md border border-slate-200 bg-slate-50/70 p-3">
        <div className="flex flex-wrap items-center gap-2 text-[15px]">
          <input
            id={`${name}-fixed`}
            type="radio"
            name={name}
            className={radio}
            checked={mode === "fixed"}
            onChange={() => onMode("fixed")}
          />
          <label htmlFor={`${name}-fixed`}>{fixedLabel[0]}</label>
          <input
            type="number"
            min={1}
            max={99}
            aria-label={`${legend}: number of years`}
            className={`${input} !w-16 !py-1 text-center`}
            value={years}
            onFocus={() => onMode("fixed")}
            onChange={(e) =>
              onYears(Math.min(99, Math.max(1, Math.floor(Number(e.target.value)) || 1)))
            }
          />
          <label htmlFor={`${name}-fixed`}>{fixedLabel[1]}</label>
        </div>
        <div className="flex items-center gap-2 text-[15px]">
          <input
            id={`${name}-open`}
            type="radio"
            name={name}
            className={radio}
            checked={mode === "open"}
            onChange={() => onMode("open")}
          />
          <label htmlFor={`${name}-open`}>{openLabel}</label>
        </div>
      </div>
    </fieldset>
  );
}

function PartyFields({
  title,
  party,
  onChange,
}: {
  title: string;
  party: Party;
  onChange: (patch: Partial<Party>) => void;
}) {
  return (
    <Group title={title}>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Print name">
          <input className={input} value={party.name} onChange={(e) => onChange({ name: e.target.value })} />
        </Field>
        <Field label="Title">
          <input className={input} value={party.title} onChange={(e) => onChange({ title: e.target.value })} />
        </Field>
      </div>
      <Field label="Company">
        <input className={input} value={party.company} onChange={(e) => onChange({ company: e.target.value })} />
      </Field>
      <Field label="Notice address" hint="Email or postal address">
        <input className={input} value={party.address} onChange={(e) => onChange({ address: e.target.value })} />
      </Field>
      <Field label="Date">
        <input type="date" className={input} value={party.date} onChange={(e) => onChange({ date: e.target.value })} />
      </Field>
    </Group>
  );
}

export default function NdaForm({ data, onChange }: Props) {
  return (
    <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
      <Group title="Agreement terms">
        <Field label="Purpose" hint="How Confidential Information may be used">
          <textarea
            rows={3}
            className={input}
            value={data.purpose}
            onChange={(e) => onChange({ purpose: e.target.value })}
          />
        </Field>

        <div>
          <span className="block text-sm font-medium text-ink">Effective date</span>
          <div className="mt-1 flex gap-2">
            <input
              type="date"
              aria-label="Effective date"
              className={input}
              value={data.effectiveDate}
              onChange={(e) => onChange({ effectiveDate: e.target.value })}
            />
            <button
              type="button"
              onClick={() => onChange({ effectiveDate: todayIso() })}
              className="shrink-0 rounded-md border border-slate-300 bg-white px-3 text-sm font-medium text-ink hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-signal/40"
            >
              Use today
            </button>
          </div>
        </div>

        <TermChoice
          legend="MNDA term"
          mode={data.mndaTermMode}
          years={data.mndaTermYears}
          fixedLabel={["Expires after", "year(s)"]}
          openLabel="Continues until terminated"
          onMode={(m) => onChange({ mndaTermMode: m })}
          onYears={(n) => onChange({ mndaTermYears: n })}
        />

        <TermChoice
          legend="Term of confidentiality"
          mode={data.confidentialityMode}
          years={data.confidentialityYears}
          fixedLabel={["Protected for", "year(s)"]}
          openLabel="In perpetuity"
          onMode={(m) => onChange({ confidentialityMode: m })}
          onYears={(n) => onChange({ confidentialityYears: n })}
        />
      </Group>

      <Group title="Governing law">
        <Field label="Governing law" hint="The state whose laws apply">
          <input
            className={input}
            placeholder="Delaware"
            value={data.governingLaw}
            onChange={(e) => onChange({ governingLaw: e.target.value })}
          />
        </Field>
        <Field label="Jurisdiction" hint="City or county and state of the courts">
          <input
            className={input}
            placeholder="courts located in New Castle, DE"
            value={data.jurisdiction}
            onChange={(e) => onChange({ jurisdiction: e.target.value })}
          />
        </Field>
        <Field label="Modifications" hint="Optional. Changes to the Standard Terms">
          <textarea
            rows={3}
            className={input}
            value={data.modifications}
            onChange={(e) => onChange({ modifications: e.target.value })}
          />
        </Field>
      </Group>

      <PartyFields
        title="Party 1"
        party={data.party1}
        onChange={(p) => onChange({ party1: { ...data.party1, ...p } })}
      />
      <PartyFields
        title="Party 2"
        party={data.party2}
        onChange={(p) => onChange({ party2: { ...data.party2, ...p } })}
      />
    </form>
  );
}
