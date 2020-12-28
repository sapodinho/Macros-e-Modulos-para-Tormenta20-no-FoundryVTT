/* Este script foi retirado, modificado e adaptador para o Tormenta 20 a partir do Sky's foundry (https://github.com/Sky-Captain-13/foundry/blob/master/scriptMacros/tokenVision.js.)

--> Par usa-lo basta selecionar o token e executa-lo.
*/

let applyChanges = false;
new Dialog({
  title: `Token Vision Configuration`,
  content: `
    <form>
      <div class="form-group">
        <label>Visão:</label>
        <select id="vision-type" name="vision-type">
          <option value="nochange">Sem mudança</option>
          <option value="dim0">Sem visão no escuro</option>
          <option value="dim09">Visão no Escuro (Curto)</option>
          <option value="dim30">Visão no Escuro (Médio - Padrão)</option>
          <option value="dim90">Visão no Escuro (Longo</option>
          <option value="bright210">Visão Verdadeira (100%)</option>
        </select>
      </div>
      <div class="form-group">
        <label>Fonte de Luz:</label>
        <select id="light-source" name="light-source">
          <option value="nochange">Sem mudança</option>
          <option value="none">Nada</option>
          <option value="tocha">Tocha</option>
          <option value="luz">Luz (Magia)</option>
          <option value="escuridao">Escuridão (Magia - Parcial)</option>
          <option value="escuridaoTotal">Escuridão (Magia - Total)</option>
          <option value="beholder">Olho do beholder</option>
        </select>
      </div>
    </form>
    `,
  buttons: {
    yes: {
      icon: "<i class='fas fa-check'></i>",
      label: `Apply Changes`,
      callback: () => applyChanges = true
    },
    no: {
      icon: "<i class='fas fa-times'></i>",
      label: `Cancel Changes`
    },
  },
  default: "yes",
  close: html => {
    if (applyChanges) {
      for ( let token of canvas.tokens.controlled ) {
        let visionType = html.find('[name="vision-type"]')[0].value || "none";
        let lightSource = html.find('[name="light-source"]')[0].value || "none";
        let dimSight = 0;
        let brightSight = 0;
        let dimLight = 0;
        let brightLight = 0;
        let lightAngle = 360;
        let lockRotation = token.data.lockRotation;
        let lightAnimation = token.data.lightAnimation;
        let lightAlpha = token.data.lightAlpha;
        let lightColor = token.data.lightColor;
        const colorFire = "#ffc864";
        const colorWhite = "#ffffff";
        const colorMoonGlow = "#f4f1c9";
        const colorBeholder = "#ff00f7";
        // Get Vision Type Values
        switch (visionType) {
          case "dim0":
            dimSight = 0.4;
            brightSight = 0;
            break;
          case "dim09":
            dimSight = 9;
            brightSight = 0;
            break;
          case "dim30":
            dimSight = 30;
            brightSight = 0;
            break;
          case "dim90":
            dimSight = 90;
            brightSight = 0;
            break;
          case "bright210":
            dimSight = 0;
            brightSight= 210;
            break;
          case "nochange":
          default:
            dimSight = token.data.dimSight;
            brightSight = token.data.brightSight;
        }
        // Get Light Source Values
        switch (lightSource) {
          case "none":
            dimLight = 0;
            brightLight = 0;
            lightAnimation = {type: "none"};
            break;
          case "tocha":
            dimLight = 6;
            brightLight = 0;
            lightAnimation = {type: "torch", speed: 5, intensity: 8};
            lightColor = colorFire;
            lightAlpha = 0.3;
            break;
          case "luz":
            dimLight = 6;
            brightLight = 0;
            lightAnimation = {type: "pulse", speed: 3, intensity: 8};
            lightColor = colorWhite;
            lightAlpha = 0.2;
            break;
          case "escuridao":
            dimLight = -6;
            brightLight = 0;
            lightAnimation = {type: "hole", speed: 3, intensity: 8};
            lightColor = colorWhite;
            lightAlpha = 0.2;
            break;
          case "escuridaoTotal":
            dimLight = -6.3;
            brightLight = -6;
            lightAnimation = {type: "roiling", speed: 10, intensity: 10};
            lightColor = colorWhite;
            lightAlpha = 0.2;
            break;
          case "beholder":
            dimLight = 30;
            brightLight = 15;
            lockRotation = false;
            lightAngle = 52.5;
            lightAnimation = {type: "chroma", speed: 2, intensity: 8};
            lightColor = colorBeholder;
            lightAlpha = 0.15;
            break;
          case "nochange":
          default:
            dimLight = token.data.dimLight;
            brightLight = token.data.brightLight;
            lightAngle = token.data.lightAngle;
            lockRotation = token.data.lockRotation;
            lightAnimation = token.data.lightAnimation;
            lightAlpha = token.data.lightAlpha;
            lightColor = token.data.lightColor;
        }
        // Update Token
        console.log(token);
        token.update({
          vision: true,
          dimSight: dimSight,
          brightSight: brightSight,
          dimLight: dimLight,
          brightLight:  brightLight,
          lightAngle: lightAngle,
          lockRotation: lockRotation,
          lightAnimation: lightAnimation,
          lightAlpha: lightAlpha,
          lightColor: lightColor
        });
      }
    }
  }
}).render(true);