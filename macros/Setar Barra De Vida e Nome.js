/* This will set every token in scene to always display their
 * token bars and nameplate, and sets the first bar to represent 
 * HP and removes the second token bar.
*/

const tokens =canvas.tokens.placeables.map(token => {
   return {
       _id: token.id,
       "bar1.attribute": "attributes.pv",
       "bar2.attribute": "attributes.pm",
       "displayName": CONST.TOKEN_DISPLAY_MODES.OWNER_HOVER,
       "displayBars": CONST.TOKEN_DISPLAY_MODES.OWNER_HOVER
   };
});

canvas.scene.updateEmbeddedEntity('Token', tokens)