/**
 * Estendiamo la classe base Actor per implementare la logica di Aether Bound.
 * @extends {Actor}
 */
export class AetherActor extends Actor {

  /** @override */
  prepareData() {
    // 1. Prepara i dati base (quelli salvati nel DB)
    super.prepareData();
  }

  /** @override */
  prepareBaseData() {
    // Qui puoi manipolare i dati PRIMA che vengano calcolati gli effetti derivati.
    // Utile per inizializzare valori nulli.
  }

  /** @override */
  prepareDerivedData() {
    const actorData = this;
    const system = actorData.system;
    const flags = actorData.flags.aether || {};

    // --- AETHER BOUND MATH ENGINE ---

    // 1. CALCOLO HP MASSIMI
    // Formula: Base 10 + (MIGHT * 2)
    // Nota: In un sistema completo, la "Base" dipenderebbe dalla Classe (Item).
    // Per ora usiamo un valore fisso di 10 per il test.
    const baseHp = 10; 
    system.resources.hp.max = baseHp + (system.attributes.mgt.value * 2);

    // 2. CALCOLO DIFESA (DEF)
    // Formula: 10 + FINESSE (Placeholder per Armor)
    // Se avessimo un oggetto armatura equipaggiato, lo leggeremmo qui.
    system.derived.def.value = 10 + system.attributes.fin.value;

    // 3. OVERHEAT LOGIC (Active Effect simulation)
    // Se il Burn è >= 4, potremmo settare un flag per dire "Sei Vulnerabile"
    if (system.resources.burn.value >= 4) {
      console.log(`${this.name} is Overheating!`);
      // Qui in futuro applicheremo l'effetto visivo
    }
  }
}