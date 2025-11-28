export async function rollCheck(actor, attributeKey, targetNumber) {
  // 1. Recupera il valore dell'attributo (es. MIGHT è 3)
  const attrVal = actor.system.attributes[attributeKey].value;

  // 2. Crea il tiro: 2d6 + Attributo
  const roll = new Roll("2d6 + @attr", { attr: attrVal });
  await roll.evaluate();

  // 3. Calcola il risultato totale
  const total = roll.total;
  let resultLabel = "";
  let cssClass = "";

  // 4. Logica Aether Bound (Thresholds)
  if (total >= targetNumber + 4) {
    resultLabel = "CRITICAL SUCCESS";
    cssClass = "crit-success";
  } else if (total >= targetNumber) {
    resultLabel = "HIT";
    cssClass = "success";
  } else if (total >= targetNumber - 3) {
    resultLabel = "GLANCING BLOW (Half Dmg)";
    cssClass = "glancing";
  } else {
    resultLabel = "FAILURE (Exposed)";
    cssClass = "failure";
  }

  // 5. Invia in Chat
  roll.toMessage({
    speaker: ChatMessage.getSpeaker({ actor: actor }),
    flavor: `<h3 class="${cssClass}">${resultLabel}</h3> vs TN ${targetNumber}`
  });
}