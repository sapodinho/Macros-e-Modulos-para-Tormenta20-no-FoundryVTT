// Macro criado para o sistema Tormenta20, ele causa dano e cura em massa , basta selecionar os tokens.
// Autor: @Sapodinho#0859

//Declarando como falso para se cancelar não aplicar mudanças. 
let applyChanges = false;

new Dialog({
  	title: `Causar Dano:`,
  	content: `
    <form>
      	<div class="form-group">
        	<label>Valor:</label>
			<input type="text" id="dano" name="dano" value="0" data-dtype="Number" placeholder="0">
		</div>
		<div class="form-group">
			<label>Tipo:</label>
        	<select id="tipo" name="tipo">
          		<option value="tipoDano">Dano</option>
				<option value="tipoCura">Cura</option>
        	</select>
		</div>
		<div class="form-group">
			<label>Multiplicador:</label>
			<select id="multiplicador" name="multiplicador">
          		<option value="1">Normal</option>
				<option value="0.5">Metade</option>
				<option value="2">Dobro</option>
				<option value="3">Triplo</option>
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
				//Pegando o valor digitado no input dano.
				let dano = html.find('[name="dano"]')[0].value || "none";

				//Pegando se é cura ou não.
				let cura = false;
				let tipo = html.find('[name="tipo"]')[0].value || "none";
				switch (tipo) {
				case "tipoCura":
					cura = true;
					break;
          		case "tipoDano":
					cura = false;
					break;
				};

				//Pegando o valor do multiplicador.
				let multiplicador = html.find('[name="multiplicador"]')[0].value || "none";

				//Aplicando o dano ou a cura, no tokens selecionados.
				const a = token.actor;
				a.applyDamage(dano, multiplicador, cura);
			};
		}
	}
}).render(true);