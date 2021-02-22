// Pegando o nome do Token
let TokenNome = token.name;

// Selecionando a ficha do Token
const a = token.actor

// Criando variável com os valores de HP, HpMax e CON Mod do personagem.
let TokenHp = a.data.data.attributes.pv.value;
let TokenMaxHp = a.data.data.attributes.pv.max;
let TokenCon = a.data.data.atributos.con.mod;

// Criando uma variável para armazenar o valor de uma rolagem de 1d20.
let r = new Roll(`1d20`).roll();

// Criando uma nova variável com a soma do dado com a CON do personagem.
let rTotal = r.total + TokenCon;

// Criando uma variável para o estado do personagem, mais abaixo irei verificar se o personagem ainda tem vida, por hora estou assumindo que ele tem pontos de vida.^
// Criei duas variáveis o texto delas será unido ao final.
let Status = "ainda tem pontos de vida";
let Sangramento = ""; 

// Se o HP do personagem for menor que 0 a variável Status terá seu texto atualizado.
if(TokenHp<=0){
  // Novamente estou presumindo que o personagem irá passar no teste.
  Status = "está inconsciente.";
  Sangramento = "parou de sangrar, mas"; 
  // Se o personagem não passar no teste de Morte CD 15, a variável Status será atualizada, ele continuará sangrando e receberá 1d6 de dano.
  if (rTotal<15){
     // criando variáveis e rolando o dano de sangramento.
     let rDano = new Roll(`1d6`).roll();
     // Automatizando o dano recebido por sangramento. Chamando a função na ficha do token.
     a.applyDamage(rDano.total, 1, 0);
     Sangramento = `perdeu ${rDano.total} de vida por sangramento e`
     Status = `está morrendo.`;
     //Atualizando a variável com a vida do personagem.
     TokenHp = TokenHp - rDano.total;
     };

  if (TokenHp<-Math.abs(TokenMaxHp)/2 && TokenHp<-10){
     Status = `está morto.`;
     };
}

// Criando uma variável com o texto que ira para o chat, está escrita em html.
// Ao ver ${} é quando estou chamando uma variável descrita anteriormente.
let content = `
<h2>Teste de Morte</h2>
<p><b>${TokenNome}</b> somou ${rTotal} em seu teste de constituição contra CD 15.</p>
<br>
<p>${TokenNome} ${Sangramento} ${Status}</p>
`;

// Chamando a função que escreve no chat.
ChatMessage.create({content});
