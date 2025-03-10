import { type Profile, type InsertProfile } from "@shared/schema";

export interface IStorage {
  getProfiles(): Promise<Profile[]>;
  getProfile(id: number): Promise<Profile | undefined>;
  createProfile(profile: InsertProfile): Promise<Profile>;
  updateProfile(id: number, profile: Partial<InsertProfile>): Promise<Profile>;
  deleteProfile(id: number): Promise<void>;
}

export class MemStorage implements IStorage {
  private profiles: Map<number, Profile>;
  private currentId: number;

  constructor() {
    this.profiles = new Map();
    this.currentId = 1;
  }

  async getProfiles(): Promise<Profile[]> {
    return Array.from(this.profiles.values());
  }

  async getProfile(id: number): Promise<Profile | undefined> {
    return this.profiles.get(id);
  }

  async createProfile(profile: InsertProfile): Promise<Profile> {
    const id = this.currentId++;
    const newProfile = { ...profile, id };
    this.profiles.set(id, newProfile);
    return newProfile;
  }

  async updateProfile(id: number, profile: Partial<InsertProfile>): Promise<Profile> {
    const existing = await this.getProfile(id);
    if (!existing) {
      throw new Error("Profile not found");
    }
    const updated = { ...existing, ...profile };
    this.profiles.set(id, updated);
    return updated;
  }

  async deleteProfile(id: number): Promise<void> {
    if (!this.profiles.has(id)) {
      throw new Error("Profile not found");
    }
    this.profiles.delete(id);
  }
}

export const storage = new MemStorage();
