/**
 * Joga todos os tokens em combate e roda todas as iniciativas, a dos jogadores inclusa.
 */
async function main() {
  await canvas.tokens.toggleCombat();
  game.combat.rollAll({ messageOptions: { rollMode: CONST.DICE_ROLL_MODES.PRIVATE }})
}
main();