export interface Person {
  name: string;
  fullName: string;
  parents: string[];
}

export interface Couple {
  bride: Person;
  groom: Person;
}

export interface Venue {
  time: string;
  venue: string;
  address: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface WeddingEvent {
  date: string;
  ceremony: Venue;
  reception: Venue;
}

export interface TimelineEvent {
  date: string;
  title: string;
  description: string;
  image?: string;
}

export interface Story {
  timeline: TimelineEvent[];
  howWeMet: string;
}

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: 'engagement' | 'prewedding' | 'couple';
}

export interface GiftRegistry {
  id: string;
  title: string;
  description: string;
  accountDetails?: {
    bankName: string;
    accountNumber: string;
    accountName: string;
  };
  qrCode?: string;
}

export interface WeddingData {
  couple: Couple;
  wedding: WeddingEvent;
  story: Story;
  gallery: GalleryImage[];
  registry: GiftRegistry[];
}

export interface RSVPFormData {
  name: string;
  email: string;
  phone: string;
  attendance: 'yes' | 'no' | 'maybe';
  guestCount: number;
  dietaryRestrictions?: string;
  songRequest?: string;
  message?: string;
}

export interface Translation {
  [key: string]: string | Translation;
}

export interface Language {
  code: string;
  name: string;
  flag: string;
}
