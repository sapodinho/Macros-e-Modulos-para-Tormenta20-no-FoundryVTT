// Macro Desenvolvido por Sapodinho#0859 inspirado no exemplo de BrunoCF086#7267.
// O macro realiza o Teste de Morte do Sitema T20;

// Pegando o nome do Token
let TokenNome = token.name;

// Selecionando a ficha do Token
const a = token.actor;

// Criando variável com os valores de HP, HpMax e CON Mod do personagem.
let TokenHp = a.data.data.attributes.pv.value;
let TokenMaxHp = a.data.data.attributes.pv.max;
let TokenCon = a.data.data.atributos.con.mod;

// Criando a variável com o resultado do Teste de CON do personagem.
let r = new Roll(`1d20`).roll();
let rResultado = r.total + TokenCon;

// Criando variável de dano
let DadoDeDano = `1d6`
let rDano = new Roll(DadoDeDano).roll();

// Criando a variável com o mínimo de HP.
let TokenHpMin = Math.floor(-Math.abs(TokenMaxHp)/2);
if(TokenHpMin > -10){TokenHpMin = -10}

// Criando a constante com o texto que ira para o chat, escrito em html.
let content = `
<h2>Chance de Morte</h2>
<div class="tormenta20 chat-card item-card" style="text-align: justify;">
	<p>${TokenNome} não está com 0 PV ou menos.</p>
</div>
`;


// Verificando se o personagem está abaixo de 0pv.
if(TokenHp<=0){
	content = 
	`
		<h2>Chance de Morte</h2>
			<h4 style="text-align: center;">${TokenNome} (${TokenHp} PV)</h4>
			<div class="tormenta20 chat-card item-card" style="text-align: justify;">
				<div class="roll">
					<div class="dice-roll">
					<div class="dice-result">
						<div class="dice-tooltip">
								<div class="dice">
									<header class="part-header flexrow">
										<span class="part-formula">1d20 + ${TokenCon}</span>
										<span class="part-total">${r.total}</span>
									</header>
									<ol class="dice-rolls">
										<li class="roll die d20">${r.total}</li>
									</ol>
								</div>
						</div>
							<h4 class="dice-total">${rResultado}</h4>
						</div>
					</div>
				</div>
			<p style="text-align: center;"><b>Teste de Constituição (CD 15)</b></p>
			<hr>
			<p>Se falhar perderá <b title="${DadoDeDano}">${rDano.total} PV</b> por sangramento e continuará sangrando. Caso <b>${TokenNome}</b> chegue a <b title="-10 PV ou metade da vida o que for menor.">${TokenHpMin} PV</b> morrerá.</p>
		</div>
	`;
};

// Chamando a função que escreve no chat.
ChatMessage.create({content});
