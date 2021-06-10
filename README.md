# Pos Mecanica - Frontend
### Estrutura de Diretórios

    -> src
	    -> components
      -> hooks
      -> pages
      -> providers
      -> services
        -> manager
        -> requester
      -> Utils

**-> src**
* Pasta onde ficará código criado por nós, sendo ele dividido da seguinte forma:
	**-> components**
	* Pasta em que ficarão os components da aplicação frontend, ou seja, tudo aquilo que a gente definiu como conteúdos das nossas páginas que de alguma forma possam ser reaproveitadas e consigam nos ajudar quanto à produtividade e organização. Exemplo de componentes são botões e caixas de texto que são usadas em mais de uma página, ajudando-nos assim a gerar um padrão.
	
	**-> hooks**
	* Pasta em que é configurada a comunicação do nosso frontend com o backend, fazendo com que toda essa parte consiga ficar concentrada em um único arquivo.

  **-> pages**
  * Pasta onde ficam todas as páginas do nossos sistema, sendo que cada pasta corresponde a uma página. Normalmente, dentro de cada pasta desta, encontram-se o código JavaScript da página, o arquivo de estilização específico deste primeiro e o arquivo **index.js** de exportação desta página para uso em outras partes do código.  
  
  **-> providers**
  * Pasta onde fica a configuração dos React Context, configurando neste os dados a serem usados de forma mais genérica, independendo da conversação unilateral dos arquivos.
  
	**-> services**
  * Pasta em que intermediam a conversa do backend e do frontend, deixando tal de forma mais organizada. Tal processo é realizado com o auxílio das seguintes pastas:
	             **-> manager**
	             * Pasta onde fica toda a parte de contato com o backend que poderia ficar no código da própria função, mas que não fica para deixar o código principal da forma mais sintetizada possível. Tal forma de estrutura também ajuda para caso algum dia queiramos mudar a ferramenta com que temo.s esse contato com o backend, não iremos precisar acessar muitas páginas para concluir tal modificação
	             **-> requester**
	             * Pasta que possui a última etapa da requisição do backend.

	**-> Utils**
	* Pasta onde ficam arquivos utilitários dentro do sistema, como por exemplo códigos que contém de forma componentizazda os gêneros, estados e capitais do Brasil, raças, ...
	
### Ferramentas utilizadas
* [ReacjJS](https://firebase.google.com/docs/ "ReacjJS") -> Biblioteca JavaScript de código aberto que usamos para criação de interfaces de usuário em páginas web.
* [SCSS](http://knexjs.org/ "SCSS") -> Ferramenta de estilização que usamos que traz algumas funcionalidades que o CSS puro não conseguiria.
* [ESLint](https://eslint.org/docs/user-guide/getting-started "ESLint") -> Ferramenta utilizada para padronização do código e do estilo aplicados.
* [Material UI](https://www.npmjs.com/package/dotenv "Material UI") -> Biblioteca de componentes React para um desenvolvimento ágil e fácil de interfaces.
* [React toast notifications](https://nodemailer.com/about/ "React toast notifications") -> Ferramenta utilizada para envio de notificações na interface quando feitas certas requisições.
