// Macro criado para o sistema Tormenta20, ele gasta e recupera mana em massa , basta selecionar os tokens.
// Autor: @Sapodinho#0859

//Declarando como falso para se cancelar não aplicar mudanças. 
let applyChanges = false;

new Dialog({
  	title: `Gastar Mana:`,
  	content: `
    <form>
      	<div class="form-group">
        	<label>Quantidade:</label>
			<input type="text" id="quantidade" name="quantidade" value="0" data-dtype="Number" placeholder="0">
		</div>
		<div class="form-group">
			<label>Tipo:</label>
        	<select id="tipo" name="tipo">
          		<option value="tipoGastar">Gastar</option>
				<option value="tipoRecuperar">Recuperar</option>
        	</select>
		</div>
    </form>
    `,
  	buttons: {
    	yes: {
      		icon: "<i class='fas fa-heart-broken'></i>",
      		label: `Aplicar`,
      		callback: () => applyChanges = true
    	},
    	no: {
     		icon: "<i class='fas fa-times'></i>",
      		label: `Cancelar`
    	},
  	},
  	default: "yes",
  	close: html => {
		if (applyChanges) {
			for ( let token of canvas.tokens.controlled ) {
				//Pegando o valor digitado no input quantidade.
				let quantidade = html.find('[name="quantidade"]')[0].value || "none";

				//Pegando se é recupera ou não.
				let recuperar = false;
				let tipo = html.find('[name="tipo"]')[0].value || "none";
				switch (tipo) {
				case "tipoRecuperar":
					recuperar = true;
					break;
          		case "tipoGastar":
					recuperar = false;
					break;
				};

				//Aplicando o dano ou a cura, no tokens selecionados.
				const a = token.actor;
				a.spendMana(quantidade, 0, recuperar);
			};
		}
	}
}).render(true);