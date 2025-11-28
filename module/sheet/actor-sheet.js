/**
 * Estendiamo la ActorSheet base per gestire l'HTML della nostra scheda.
 * @extends {ActorSheet}
 */
export class AetherActorSheet extends ActorSheet {

  /** @override */
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: ["aether", "sheet", "actor"],
      template: "systems/aether-bound/templates/actor/actor-character-sheet.hbs",
      width: 600,
      height: 700,
      tabs: [{ navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "stats" }]
    });
  }

  /** @override */
  getData() {
    // Recuperiamo i dati base
    const context = super.getData();
    const actorData = context.actor.system;

    // Passiamo i dati al template Handlebars in modo pulito
    context.system = actorData;
    context.flags = context.actor.flags;

    // Qui possiamo preparare liste di oggetti, spells, ecc.
    
    return context;
  }

  /** @override */
  activateListeners(html) {
    super.activateListeners(html);

    // 1. Tutto ciò che è un input modificabile è già gestito da Foundry
    // 2. Gestiamo i click sui bottoni custom (es. Tiro di Dado)
    
    if (!this.isEditable) return;

    // Listener per il click sugli attributi (Roll)
    html.find('.rollable').click(this._onRoll.bind(this));
  }

  /**
   * Gestione del tiro di dadi (Core Mechanic: 2d6 + Stat)
   * @private
   */
  async _onRoll(event) {
    event.preventDefault();
    const element = event.currentTarget;
    const dataset = element.dataset;

    // Se clicco su MIGHT, dataset.label è "MGT" e dataset.roll è "2d6 + @mgt"
    if (dataset.roll) {
      const roll = new Roll(dataset.roll, this.actor.getRollData());
      
      // Etichetta del tiro
      const label = dataset.label ? `Rolling ${dataset.label}` : '';
      
      // Eseguiamo il tiro e mostriamo in chat
      await roll.toMessage({
        speaker: ChatMessage.getSpeaker({ actor: this.actor }),
        flavor: label,
        rollMode: game.settings.get("core", "rollMode"),
      });
    }
  }
}