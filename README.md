# Fábrica de Software Fitness por IA

A **Fábrica de Software Fitness por IA** é uma iniciativa focada no desenvolvimento rápido e otimizado de aplicações web customizadas para o nicho fitness, atendendo personal trainers, academias, atletas e praticantes de esportes. O sistema tem como objetivo principal digitalizar soluções através da geração de código utilizando Inteligência Artificial Generativa.

O grande diferencial do projeto é o uso prático da Engenharia de Prompts e de um ciclo de vida estruturado, garantindo que o código gerado pela IA passe por testes rigorosos até se tornar um produto funcional, seguro e de alta qualidade para o cliente final.

---

## Especificação de Requisitos de Software

Especificação dos Requisitos de Software (SRE)
Estrutura Baseada na ISO/IEC/IEEE 29148:2018

### 1. Introdução

#### 1.1 Escopo do Sistema

Este documento define os processos e requisitos para a Fábrica de Software voltada à criação de aplicações *fitness*. O sistema visa gerir todo o ciclo de vida do desenvolvimento, desde a captação do problema do usuário até a entrega de um protótipo web funcional.

As aplicações geradas utilizarão essencialmente tecnologias de Front-end (HTML, CSS e JavaScript puro) e farão uso do armazenamento local no navegador do usuário (`localStorage`) para a persistência dos dados, eliminando a necessidade inicial de um banco de dados complexo.

#### 1.2 Propósito

O propósito é fornecer um modelo estruturado de operação onde uma IA atua como motor primário de geração de código, enquanto a equipa projeta as regras de negócio, testa o comportamento do sistema e audita os aplicativos gerados. Isso permite a criação rápida de ferramentas customizadas, como diários de evolução marcial, calculadoras de IMC e fichas de treino.

### 2. Descrição Global

#### 2.1 Funções do Sistema (Ciclo de Operação)

* Captar informações e dores dos futuros usuários para elaborar o *briefing* inicial.
* Estruturar os dados do aplicativo no formato JSON.
* Transformar os requisitos do cliente em *Master Prompts* (comandos detalhados para a IA).
* Gerar o código da aplicação (HTML/CSS/JS) através da Inteligência Artificial.
* Realizar testes de borda e aplicar refinamentos contínuos no código gerado (Loops de Ajustes).
* Auditar o sistema final através de uma *checklist* de qualidade antes da entrega.

---

## 3. Requisitos do Sistema 

### 3.1 Requisitos Funcionais

#### Módulo de Interface e Interação
| ID | Título | Descrição | Prioridade |
| :--- | :--- | :--- | :--- |
| **RF01** | Interface de Entrada | Todo aplicativo gerado deve possuir uma interface clara para a entrada de dados (formulários, botões e campos de texto). | Alta |
| **RF02** | Exibição Dinâmica | O sistema deve exibir os resultados, cálculos ou listas de forma dinâmica e imediata na interface visual. | Alta |

#### Módulo de Gestão de Dados
| ID | Título | Descrição | Prioridade |
| :--- | :--- | :--- | :--- |
| **RF03** | Persistência Local | O sistema deve persistir as informações inseridas localmente no navegador utilizando `localStorage`, evitando perda de dados ao recarregar a página. | Alta |
| **RF04** | Limpeza de Dados | Todo aplicativo deve incluir uma função acessível de "Limpar Dados" para apagar os registros do `localStorage` e facilitar testes de novos usuários. | Média |

---

### 3.2 Requisitos Não Funcionais

| ID | Título | Descrição | Prioridade |
| :--- | :--- | :--- | :--- |
| **RNF01** | Usabilidade (Responsividade) | O design gerado deve ser minimalista, intuitivo e totalmente responsivo, funcionando adequadamente em computadores e dispositivos móveis. | Alta | 
| **RNF02** | Confiabilidade (Validação) | O código deve possuir validações básicas de Front-end para impedir que o usuário insira campos vazios ou dados matematicamente absurdos (ex: pesos negativos). | Alta |
| **RNF03** | Manutenibilidade | Todo o código-fonte gerado pela IA e validado pelo desenvolvedor deve ser rigorosamente comentado, facilitando futuras manutenções. | Alta | 

---

### 3.3 Regras de Negócio

| ID | Título | Regra / Condição de Execução |
| :--- | :--- | :--- |
| **RN01** | Aprovação de Refinamento de Código | O aplicativo só pode ser considerado funcional se passar pela validação de testes do Desenvolvedor (Davi), que deve instruir a IA a corrigir falhas (Loop de Ajustes) até a eliminação de todos os bugs visuais e lógicos. | 
| **RN02** | Auditoria de Qualidade Pré-Entrega | Nenhum aplicativo será aprovado para uso final sem que a Analista de Qualidade (Carolline) verifique o cumprimento integral das métricas de Usabilidade (RNF01) e Confiabilidade (RNF02) estipuladas nesta documentação. | 

---