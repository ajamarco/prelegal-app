export type TermMode = "fixed" | "open";

export type Party = {
  name: string;
  title: string;
  company: string;
  address: string;
  date: string;
};

export type NdaFormData = {
  purpose: string;
  effectiveDate: string; // yyyy-mm-dd
  mndaTermMode: TermMode; // fixed = expires after N years, open = until terminated
  mndaTermYears: number;
  confidentialityMode: TermMode; // fixed = N years, open = in perpetuity
  confidentialityYears: number;
  governingLaw: string;
  jurisdiction: string;
  modifications: string;
  party1: Party;
  party2: Party;
};

const emptyParty = (): Party => ({
  name: "",
  title: "",
  company: "",
  address: "",
  date: "",
});

export const defaultNdaData = (): NdaFormData => ({
  purpose:
    "Evaluating whether to enter into a business relationship with the other party.",
  effectiveDate: "",
  mndaTermMode: "fixed",
  mndaTermYears: 1,
  confidentialityMode: "fixed",
  confidentialityYears: 1,
  governingLaw: "",
  jurisdiction: "",
  modifications: "",
  party1: emptyParty(),
  party2: emptyParty(),
});

export const pluralYears = (n: number) =>
  `${n} ${n === 1 ? "year" : "years"}`;

/** yyyy-mm-dd -> "November 12, 2026" (parsed manually to avoid timezone shifts). */
export const formatDate = (iso: string) => {
  const [y, m, d] = iso.split("-").map(Number);
  if (!y || !m || !d) return "";
  return new Date(y, m - 1, d).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const todayIso = () => {
  const t = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${t.getFullYear()}-${pad(t.getMonth() + 1)}-${pad(t.getDate())}`;
};
