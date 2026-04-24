import bakery from "@/assets/seller-bakery.jpg";
import bakery2 from "@/assets/seller-bakery2.jpg";
import thrift from "@/assets/seller-thrift.jpg";
import thrift2 from "@/assets/seller-thrift2.jpg";
import handmade from "@/assets/seller-handmade.jpg";
import jewelry from "@/assets/seller-jewelry.jpg";
import candles from "@/assets/seller-candles.jpg";
import resell from "@/assets/seller-resell.jpg";

export type Category = "Home Bakers" | "Thrift Stores" | "Handmade" | "Resellers";

export const CATEGORIES: Category[] = [
  "Home Bakers",
  "Thrift Stores",
  "Handmade",
  "Resellers",
];

export type Seller = {
  id: string;
  name: string;
  handle: string; // without @
  category: Category;
  description: string;
  image: string;
  location?: string;
  featured?: boolean;
  gallery?: string[];
};

export const SELLERS: Seller[] = [
  {
    id: "fig-and-flour",
    name: "Fig & Flour",
    handle: "figandflour.co",
    category: "Home Bakers",
    description: "Slow-fermented sourdough loaves and seasonal fig cakes from a tiny Brooklyn kitchen.",
    image: bakery,
    location: "Brooklyn, NY",
    featured: true,
    gallery: [bakery, bakery2, handmade],
  },
  {
    id: "soft-serve-vintage",
    name: "Soft Serve Vintage",
    handle: "softserve.vtg",
    category: "Thrift Stores",
    description: "Hand-picked Y2K denim, archival tees, and the occasional designer surprise.",
    image: thrift,
    location: "Los Angeles, CA",
    featured: true,
    gallery: [thrift, thrift2],
  },
  {
    id: "kiln-studio",
    name: "Kiln Studio",
    handle: "kiln.studio",
    category: "Handmade",
    description: "Wheel-thrown ceramics in muted earth tones. Made one piece at a time.",
    image: handmade,
    location: "Portland, OR",
    featured: true,
    gallery: [handmade, jewelry, candles],
  },
  {
    id: "sugar-cloud",
    name: "Sugar Cloud",
    handle: "sugarcloud.bakes",
    category: "Home Bakers",
    description: "French-inspired macarons and pastel petit fours, baked fresh weekly.",
    image: bakery2,
    location: "Austin, TX",
    gallery: [bakery2, bakery],
  },
  {
    id: "linen-and-loop",
    name: "Linen & Loop",
    handle: "linenandloop",
    category: "Handmade",
    description: "Beaded heirloom jewelry with freshwater pearls and recycled gold.",
    image: jewelry,
    location: "Mexico City",
    featured: true,
    gallery: [jewelry, handmade],
  },
  {
    id: "ember-co",
    name: "Ember Co.",
    handle: "ember.co.candles",
    category: "Handmade",
    description: "Small-batch soy candles poured in amber glass. Notes of fig, oud, and smoke.",
    image: candles,
    location: "Toronto",
    gallery: [candles, handmade],
  },
  {
    id: "second-life",
    name: "Second Life",
    handle: "secondlife.thrift",
    category: "Thrift Stores",
    description: "Curated Y2K accessories — baguette bags, tinted shades, silk scarves.",
    image: thrift2,
    location: "London, UK",
    gallery: [thrift2, thrift],
  },
  {
    id: "soleplate",
    name: "Soleplate",
    handle: "soleplate.kicks",
    category: "Resellers",
    description: "Authenticated grail sneakers and rare streetwear drops.",
    image: resell,
    location: "Tokyo",
    gallery: [resell],
  },
  {
    id: "saumic-craft",
    name: "Saumic Craft",
    handle: "saumic_craft_",
    category: "Handmade",
    description: "Beautiful handcrafted items with unique designs and quality materials.",
    image: "https://instagram.com/saumic_craft_/profilepicture/?size=medium",
    featured: true,
  },
  {
    id: "ima-handmades",
    name: "IMA Handmades",
    handle: "ima_handmades",
    category: "Handmade",
    description: "Exquisite handmade creations with attention to detail and artistry.",
    image: "https://instagram.com/ima_handmades/profilepicture/?size=medium",
    featured: true,
  },
  {
    id: "handmade-by-snehal",
    name: "Handmade by Snehal",
    handle: "handmade_by_snehal_",
    category: "Handmade",
    description: "Custom handcrafted pieces made with passion and precision.",
    image: "https://instagram.com/handmade_by_snehal_/profilepicture/?size=medium",
    featured: true,
  },
  {
    id: "aishwarya-lifestyle",
    name: "Aishwarya Lifestyle",
    handle: "aishwaryamlifestyle",
    category: "Handmade",
    description: "Curated lifestyle and handmade products for the modern aesthetic.",
    image: "https://instagram.com/aishwaryamlifestyle/profilepicture/?size=medium",
    featured: true,
  },
];

