# My Mounjaro Journey

Mounjaro Tracker — Aplicativo pessoal de acompanhamento

Crie um aplicativo web responsivo, moderno e extremamente bem acabado chamado Mounjaro Tracker.

O objetivo é criar um aplicativo pessoal para ajudar o usuário a organizar e acompanhar seu tratamento, suas aplicações, estoque de doses, evolução do peso e alimentação.

1. CONCEITO VISUAL

Quero um design:

Clean

Minimalista

Elegante

Moderno

Com aparência de aplicativo mobile premium

Muito intuitivo

Poucos elementos por tela

Hierarquia visual clara

Cards com bordas arredondadas

Ícones discretos

Animações suaves

Excelente experiência em celular

Também perfeitamente utilizável em desktop

Evite aparência de dashboard empresarial.

Quero que pareça um aplicativo de saúde/wellness moderno.

Paleta

Utilizar principalmente:

Fundo claro levemente acinzentado/off-white

Branco nos cards

Texto principal em cinza muito escuro

Texto secundário em cinza

Uma cor principal elegante em tons de roxo/lilás ou azul arroxeado

Verde apenas para indicadores positivos

Vermelho apenas para alertas

Amarelo para atenção

Não utilizar excesso de cores.

Utilizar bastante espaço em branco.

2. ESTRUTURA PRINCIPAL

Criar uma navegação simples, preferencialmente uma barra inferior no mobile:

🏠 Início

📅 Aplicações

⚖️ Peso

🥗 Alimentação

⚙️ Configurações

No desktop, pode transformar essa navegação em uma sidebar discreta.

A tela inicial deve mostrar somente as informações mais importantes.

3. TELA INICIAL

Criar um dashboard extremamente limpo.

No topo:

Olá!

Seu acompanhamento

Mostrar a próxima aplicação de maneira muito evidente:

Próxima aplicação
Segunda-feira, 31 de agosto
Daqui a 3 dias

Adicionar um botão:

✓ Marcar como tomada

Ao marcar como tomada, registrar automaticamente a data da aplicação no histórico.

Não alterar automaticamente dose ou intervalo médico.

4. CARD DE ESTOQUE

Criar um card:

Estoque

Mostrar:

4 doses disponíveis

e abaixo:

12 doses utilizadas

Também mostrar:

Total registrado: 16

Adicionar botão:

Gerenciar estoque

Ao clicar, abrir modal.

No modal:

Controle de doses

Campo:

Doses já utilizadas

Campo:

Doses atualmente armazenadas

Botão:

Salvar

E uma seção:

Comprou mais doses?

Campo:

Quantidade comprada

Botão:

Adicionar ao estoque

Quando o usuário adicionar novas doses, elas devem ser somadas ao estoque existente.

Nunca apagar automaticamente o histórico de doses utilizadas.

5. ALERTA DE ESTOQUE

Criar alertas inteligentes.

Exemplo:

⚠️ Seu estoque está baixo. Você possui apenas 1 dose disponível.

Permitir configurar quantas doses devem restar para mostrar o alerta.

Exemplo:

Alertar quando restarem 3 doses

Alertar quando restarem 2 doses

Alertar quando restar 1 dose

6. CALENDÁRIO DE APLICAÇÕES

Criar uma tela dedicada chamada:

Aplicações

Mostrar um calendário mensal moderno.

Cada dia pode apresentar:

aplicação programada

aplicação realizada

aplicação atrasada

dia normal

Utilizar indicadores visuais discretos.

Exemplo:

🟣 Aplicação programada
🟢 Aplicação realizada
🟠 Atenção
⚪ Sem aplicação

Permitir clicar em qualquer aplicação.

Ao clicar:

Mostrar:

Aplicação

Data:

31/08/2026

Status:

Programada

Realizada

Não realizada

Botões:

Marcar como tomada

Editar

Cancelar

7. CONFIGURAÇÃO DO DIA DA APLICAÇÃO

Criar uma configuração inicial:

Qual é o dia habitual da sua aplicação?

Opções:

Domingo

Segunda

Terça

Quarta

Quinta

Sexta

Sábado

Depois disso, gerar automaticamente as próximas datas semanais.

IMPORTANTE:

Não permitir que o aplicativo altere dose, frequência ou tratamento médico por conta própria.

O calendário é apenas um organizador.

Adicionar aviso:

Este aplicativo serve para organização e acompanhamento pessoal. Siga sempre a orientação do seu médico e as instruções oficiais do medicamento.

A informação oficial do Mounjaro descreve o medicamento como de uso semanal e traz orientações específicas para mudança do dia e doses esquecidas. Não transformar essas regras em recomendações personalizadas automáticas; apenas disponibilizar uma área de referência oficial.

8. HISTÓRICO DE APLICAÇÕES

Criar uma tela ou seção:

Histórico

Mostrar uma lista cronológica:

31 AGO
✓ Aplicação realizada

24 AGO
✓ Aplicação realizada

17 AGO
✓ Aplicação realizada

Cada registro pode mostrar:

data

status

observação opcional

Permitir excluir/corrigir um registro.

Adicionar campo opcional:

Observação

Exemplo:

Aplicação realizada normalmente.

9. PESO E META

Na página inicial mostrar um card grande:

Minha evolução

Exemplo:

94,5 kg

↓

82 kg

Mostrar:

12,5 kg para atingir sua meta

Criar uma barra de progresso elegante.

Exemplo:

48% da meta alcançada

Não utilizar cálculo errado baseado apenas na porcentagem do peso atual.

Calcular corretamente:

peso inicial → peso atual → peso desejado.

Exemplo:

Peso inicial: 100 kg
Peso atual: 90 kg
Meta: 80 kg

Resultado:

10 kg perdidos de 20 kg necessários = 50%.

10. HISTÓRICO DE PESO

Permitir registrar o peso periodicamente.

Criar botão:

+ Registrar peso

Modal:

Peso

Data

Observação opcional

Salvar cada registro.

Criar gráfico:

Evolução do peso

Eixo X:

datas

Eixo Y:

peso

Mostrar uma linha representando a evolução.

Permitir visualizar:

7 dias

30 dias

3 meses

6 meses

Tudo

11. INDICADORES DE PROGRESSO

Criar pequenos cards:

Peso perdido

8,4 kg

Progresso

42%

Faltam

11,6 kg

Última pesagem

Hoje

Esses indicadores devem atualizar automaticamente.

12. HISTÓRICO DE PESO COM MARCOS

Criar pequenos marcos:

🎯 Meta inicial
🏆 Primeiro objetivo
⭐ Meta final

Permitir ao usuário cadastrar metas intermediárias.

Exemplo:

Meta final: 80 kg

Metas intermediárias:

90 kg ✓
85 kg
82 kg
80 kg

Quando atingir uma meta, mostrar uma pequena animação de conquista.

13. ALIMENTAÇÃO

Criar uma segunda área principal:

Alimentação

Essa tela deve ser muito intuitiva.

No topo:

Minha semana

Mostrar segunda a domingo.

Cada dia deve possuir:

Café da manhã

Almoço

Lanche

Jantar

O usuário poderá selecionar alimentos.

14. BANCO DE ALIMENTOS

Criar uma biblioteca organizada.

Categorias:

Proteínas

Frango

Peixe

Carne magra

Ovos

Atum

Sardinha

Iogurte grego

Queijo branco

Cottage

Feijão

Lentilha

Grão-de-bico

Tofu

Carboidratos

Arroz

Arroz integral

Batata

Batata-doce

Mandioca

Aveia

Quinoa

Pão integral

Frutas

Banana

Maçã

Mamão

Morango

Melão

Abacaxi

Laranja

Vegetais

Brócolis

Cenoura

Alface

Tomate

Pepino

Abobrinha

Couve

Espinafre

Gorduras

Abacate

Castanhas

Amendoim

Azeite

Chia

Linhaça

Permitir pesquisar alimentos.

15. SELEÇÃO DE REFEIÇÕES

Ao clicar em:

Adicionar alimento

abrir modal com:

Pesquisar alimento

ou

Categorias.

Cada alimento deve possuir checkbox.

Permitir selecionar vários alimentos.

Exemplo:

ALMOÇO

☑ Frango grelhado
☑ Arroz integral
☑ Feijão
☑ Salada

Botão:

Adicionar à refeição

16. DIETA SEMANAL

Criar uma visualização:

Segunda-feira

Café da manhã
Ovos + fruta + aveia

Almoço
Frango + arroz + feijão + salada

Lanche
Iogurte + fruta

Jantar
Peixe + legumes

E assim por diante até domingo.

17. COPIAR DIETA

Adicionar botão muito visível:

📋 Copiar dieta

Ao clicar, gerar texto organizado:

MINHA DIETA DA SEMANA

SEGUNDA-FEIRA

Café da manhã:

Ovos

Banana

Aveia

Almoço:

Frango

Arroz

Feijão

Salada

...

Copiar diretamente para a área de transferência.

Mostrar feedback:

✓ Copiado!

18. LISTA DE COMPRAS

Essa é uma função importante.

Criar botão:

🛒 Gerar lista de compras

O aplicativo deve analisar os alimentos escolhidos durante a semana e criar automaticamente uma lista.

Exemplo:

Lista de compras

Proteínas

2 kg de frango

1 kg de peixe

2 dúzias de ovos

4 iogurtes

Frutas

Banana

Mamão

Maçã

Vegetais

Alface

Tomate

Brócolis

Permitir editar a lista.

Botão:

Copiar lista

19. RECOMENDAÇÕES DE ALIMENTAÇÃO

No topo da página Alimentação, criar uma seção:

💡 Alimentação durante o uso de GLP-1

Mostrar cards de recomendações gerais provenientes de fontes confiáveis.

Priorizar fontes como:

Cleveland Clinic

Site oficial do Mounjaro/Lilly

outras fontes médicas reconhecidas

Não inventar recomendações.

Não apresentar a seção como prescrição médica.

Utilizar linguagem:

Informações gerais

e:

Consulte seu médico ou nutricionista para uma orientação personalizada.

As informações gerais podem destacar:

priorizar alimentos nutricionalmente densos;

incluir proteína nas refeições;

consumir fibras de maneira adequada;

manter hidratação;

preferir refeições menores se houver desconforto;

observar alimentos que pioram náusea ou desconforto gastrointestinal.

A Cleveland Clinic destaca proteína e fibras como nutrientes importantes durante o uso de GLP-1 e recomenda alimentos como frutas, vegetais, proteínas magras, feijões e grãos integrais.

Também há orientação para hidratação e para distribuir proteína ao longo do dia.

20. BUSCA DE CONTEÚDO NA INTERNET

Se possível tecnicamente, criar uma seção:

📰 Recomendações recentes

Buscar na internet conteúdo relevante de fontes confiáveis sobre:

alimentação durante uso de GLP-1

Mounjaro

tirzepatida

proteína

hidratação

perda de peso

preservação de massa muscular

Mostrar:

título

fonte

data

pequeno resumo

botão "Ler"

Priorizar fontes médicas e oficiais.

Não utilizar blogs desconhecidos como fonte principal.

Não apresentar conteúdo encontrado na internet como recomendação médica personalizada.

21. HIDRATAÇÃO

Adicionar uma função que não estava no projeto inicial:

💧 Água

Permitir configurar uma meta diária.

Exemplo:

Meta: 2,5 L

Mostrar copos/quantidades:

250 ml

500 ml

Mostrar:

1,75 L / 2,5 L

Barra de progresso.

Botão:

+250 ml

Permitir editar a meta.

Não calcular automaticamente uma necessidade médica de água; a meta deve ser definida pelo usuário ou profissional de saúde.

22. SINTOMAS / COMO ESTOU ME SENTINDO

Adicionar uma seção opcional:

Como estou hoje?

Permitir registrar:

Náusea

Vômito

Constipação

Diarreia

Dor abdominal

Azia

Cansaço

Dor de cabeça

Sem sintomas

Outro

Usar intensidade:

🙂 Leve
😐 Moderado
😣 Forte

Adicionar data automaticamente.

Permitir observação.

Isso serve apenas como diário pessoal e não como diagnóstico.

23. DIÁRIO

Criar uma seção:

Diário

Permitir escrever:

Hoje me senti...

Registrar:

data

peso opcional

sintomas opcionais

observação

Isso pode ajudar o usuário a conversar com o médico sobre a evolução do tratamento.

24. RESUMO SEMANAL

Criar um card:

Resumo da semana

Mostrar:

💉 Aplicações
1

⚖️ Peso
-0,8 kg

💧 Hidratação média
2,1 L

🥗 Refeições planejadas
18

🎯 Progresso
+4%

O resumo deve ser visual e simples.

25. NOTIFICAÇÕES / LEMBRETES

Se tecnicamente possível no navegador:

Permitir criar lembretes para:

próxima aplicação

registrar peso

beber água

revisar dieta

Exemplo:

Lembrete

Sua aplicação está programada para amanhã.

Não executar nenhuma ação médica automaticamente.

26. CONFIGURAÇÕES

Criar tela:

Configurações

Opções:

Tratamento

Dia da aplicação

Estoque atual

Limite para alerta de estoque

Peso

Unidade kg

Meta de peso

Alimentação

Preferências alimentares

Alimentos que não gosta

Restrições alimentares

Aparência

Claro

Escuro

Automático

Dados

Exportar dados

Importar dados

Apagar todos os dados

27. EXPORTAÇÃO DOS DADOS

Criar botão:

Exportar meus dados

Permitir exportar em JSON ou CSV.

Incluir:

aplicações

peso

metas

dieta

hidratação

sintomas

diário

estoque

Criar também:

Importar dados

para restaurar um backup.

28. PRIVACIDADE

Os dados pessoais devem permanecer no navegador por padrão.

Não enviar informações de saúde para servidores externos sem necessidade e sem consentimento explícito.

Se houver backend/autenticação, deixar isso claro.

Não coletar informações desnecessárias.

29. PRIMEIRO ACESSO

Na primeira abertura, mostrar um onboarding extremamente simples.

Tela 1:

Vamos configurar seu acompanhamento.

Tela 2:

Qual é seu peso atual?

Tela 3:

Qual é sua meta de peso?

Tela 4:

Qual é o dia habitual da sua aplicação?

Tela 5:

Quantas doses você possui atualmente?

Tela 6:

Pronto!

Seu acompanhamento está configurado.

Botão:

Começar

Permitir pular o onboarding.

30. HOME IDEAL

Depois de configurado, a Home deve ficar aproximadamente assim:

Olá, Júnior 👋

Seu acompanhamento

💉 PRÓXIMA APLICAÇÃO

SEG
31 AGO

Em 3 dias

[ Marcar como tomada ]

⚖️ Peso

94,5 kg

↓ 82 kg

12,5 kg restantes

████████░░ 48%

💊 Estoque

4 doses

12 utilizadas

[ Gerenciar ]

💧 Água

1,75 L / 2,5 L

███████░░░

[ +250 ml ]

📅 Esta semana

Seg ✓
Ter
Qua
Qui
Sex
Sáb
Dom

🥗 Alimentação

18 refeições planejadas

[ Ver minha dieta ]

📊 Resumo

Peso: -0,8 kg
Aplicações: 1
Dieta: 18 refeições

31. EXPERIÊNCIA MOBILE

O aplicativo precisa ser desenvolvido primeiro pensando em celular.

Regras:

botões grandes o suficiente para toque;

navegação inferior;

cards compactos;

tipografia legível;

nenhuma tabela complexa na tela principal;

modais responsivos;

calendário adaptado para telas pequenas;

evitar excesso de informações simultâneas.

No desktop, aumentar o aproveitamento da tela sem perder a estética mobile.

32. TECNOLOGIA

Utilizar uma stack moderna compatível com Lovable.

Preferência:

React

TypeScript

Tailwind CSS

componentes reutilizáveis

Lucide Icons

armazenamento persistente

arquitetura organizada

Criar componentes separados para:

Dashboard

Calendar

DoseTracker

WeightTracker

WeightChart

HydrationTracker

DietPlanner

FoodSelector

ShoppingList

SymptomTracker

WeeklySummary

Settings

Modals

Não colocar toda a aplicação em um único arquivo.

33. BANCO DE DADOS / PERSISTÊNCIA

Se o Lovable utilizar Supabase, estruturar corretamente os dados.

Criar tabelas/estruturas separadas para:

profiles

doses

applications

weight_records

goals

meals

foods

hydration

symptoms

notes

settings

Caso a primeira versão seja sem login, utilizar armazenamento local de forma organizada, mas deixar a arquitetura preparada para posteriormente adicionar autenticação e sincronização em nuvem.

34. SEGURANÇA E CONFIABILIDADE

Validar todos os campos.

Não permitir:

números negativos

peso inválido

doses negativas

datas inválidas

Criar confirmação antes de:

Apagar todos os dados

Exemplo:

Tem certeza? Essa ação não poderá ser desfeita.

35. MICROINTERAÇÕES

Adicionar pequenas animações:

progresso da meta

peso atualizado

dose marcada

item da dieta selecionado

alimento adicionado

água registrada

meta atingida

As animações devem ser discretas.

Não exagerar.

36. ESTADOS VAZIOS

Criar estados vazios bonitos.

Exemplo:

Sem histórico:

Ainda não há registros.

Registre seu primeiro peso para começar a acompanhar sua evolução.

Sem dieta:

Sua semana ainda está vazia.

[ Montar minha dieta ]

Sem aplicações:

Nenhuma aplicação registrada.

37. ACESSIBILIDADE

Garantir:

contraste adequado

textos legíveis

navegação por teclado

labels em inputs

aria-label quando necessário

foco visível

botões acessíveis

funcionamento em telas pequenas

38. RESPONSIVIDADE

Testar obrigatoriamente:

celular pequeno

celular médio

tablet

notebook

desktop

O layout não pode quebrar em nenhuma dessas resoluções.

39. IMPORTANTE SOBRE O CONTEÚDO MÉDICO

O aplicativo NÃO deve:

prescrever dose;

recomendar aumento de dose;

recomendar redução de dose;

alterar intervalo de aplicação;

diagnosticar doenças;

substituir médico ou nutricionista;

apresentar uma dieta personalizada como tratamento médico.

Sempre que necessário utilizar:

"Informação geral. Para orientação individualizada, consulte seu médico ou nutricionista."

Criar uma pequena seção "Informações importantes" nas configurações.

40. RESULTADO FINAL

Quero que o resultado final pareça um aplicativo comercial profissional de saúde/wellness, e não um projeto genérico gerado por IA.

Prioridades, nesta ordem:

UX extremamente simples

Design clean e premium

Mobile-first

Facilidade para registrar aplicações

Controle de estoque

Evolução do peso

Meta de peso

Planejamento alimentar

Hidratação

Histórico

Privacidade

Performance

Não encher a Home com todas as funcionalidades.

A Home deve responder rapidamente às três perguntas principais:

Quando é minha próxima aplicação?

Como está minha evolução?

Quantas doses ainda tenho?

O restante deve estar organizado nas páginas secundárias.

Antes de finalizar, revise toda a aplicação procurando inconsistências de UX, botões sem função, dados que não persistem, cálculos incorretos, problemas de responsividade e estados vazios.

Entregue o projeto funcionando, com todas as telas navegáveis e todas as funcionalidades implementadas, e não apenas mockups visuais.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/7ab0cbcc-3978-4498-986c-c5aa4497545b).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
