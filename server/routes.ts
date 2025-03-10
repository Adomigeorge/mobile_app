import type { Express } from "express";
import { createServer } from "http";
import { storage } from "./storage";
import { insertProfileSchema } from "@shared/schema";

export async function registerRoutes(app: Express) {
  app.get("/api/profiles", async (_req, res) => {
    const profiles = await storage.getProfiles();
    res.json(profiles);
  });

  app.get("/api/profiles/:id", async (req, res) => {
    const profile = await storage.getProfile(Number(req.params.id));
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }
    res.json(profile);
  });

  app.post("/api/profiles", async (req, res) => {
    const result = insertProfileSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ message: result.error.message });
    }
    const profile = await storage.createProfile(result.data);
    res.status(201).json(profile);
  });

  app.patch("/api/profiles/:id", async (req, res) => {
    const result = insertProfileSchema.partial().safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ message: result.error.message });
    }
    try {
      const profile = await storage.updateProfile(Number(req.params.id), result.data);
      res.json(profile);
    } catch (error) {
      res.status(404).json({ message: (error as Error).message });
    }
  });

  app.delete("/api/profiles/:id", async (req, res) => {
    try {
      await storage.deleteProfile(Number(req.params.id));
      res.status(204).send();
    } catch (error) {
      res.status(404).json({ message: (error as Error).message });
    }
  });

  return createServer(app);
}
