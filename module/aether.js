// Importiamo le classi che creeremo tra poco
import { AetherActor } from "./documents/actor.js";
import { AetherActorSheet } from "./sheets/actor-sheet.js";

Hooks.once('init', async function() {
  console.log("AETHER BOUND | Initializing the Flux Engine...");

  // 1. DEFINIAMO LA CONFIGURAZIONE GLOBALE
  CONFIG.aether = {};

  // 2. REGISTRIAMO LE CLASSI DOCUMENTO (La Logica)
  // Diciamo a Foundry: "Quando crei un Actor, usa la mia classe AetherActor, non quella base."
  CONFIG.Actor.documentClass = AetherActor;

  // 3. REGISTRIAMO LE SCHEDE (L'Interfaccia)
  // Deregistriamo la scheda di default che è brutta
  Actors.unregisterSheet("core", ActorSheet);
  // Registriamo la nostra scheda
  Actors.registerSheet("aether", AetherActorSheet, {
    makeDefault: true,
    label: "Aether Bound Character Sheet"
  });

  // 4. PRELOAD TEMPLATES (Opzionale per ora, ma buona pratica)
  // preloadHandlebarsTemplates();
});

Hooks.once('ready', async function() {
  // Questo hook parte quando il VTT è pronto e l'utente è loggato.
  console.log("AETHER BOUND | Ready for Tactical Combat.");
});