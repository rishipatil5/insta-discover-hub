import { SELLERS, type Seller, type Category, CATEGORIES } from "@/data/sellers";

type SubmissionRow = {
  id: string;
  name: string;
  handle: string;
  category: string;
  description: string;
  image_url: string | null;
  location: string | null;
};

const FALLBACK_IMG =
  "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&h=1000&fit=crop";

function normalizeCategory(c: string): Category {
  return (CATEGORIES as readonly string[]).includes(c) ? (c as Category) : "Handmade";
}

export function submissionToSeller(row: SubmissionRow): Seller {
  return {
    id: row.id,
    name: row.name,
    handle: row.handle.replace(/^@/, ""),
    category: normalizeCategory(row.category),
    description: row.description,
    image: row.image_url || FALLBACK_IMG,
    location: row.location || undefined,
  };
}

export function mergeSellers(approved: SubmissionRow[]): Seller[] {
  const live = approved.map(submissionToSeller);
  // De-dupe by handle: live submissions take precedence over seed data
  const seenHandles = new Set(live.map((s) => s.handle.toLowerCase()));
  const seed = SELLERS.filter((s) => !seenHandles.has(s.handle.toLowerCase()));
  return [...live, ...seed];
}
