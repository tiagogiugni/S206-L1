Feature: Testando API de Naruto Clássico

Background: Executa antes de cada teste
    * def url_base = "https://hp-api.onrender.com/"

Scenario: Verificando um personagem pelo ID
    Given url url_base
    And path "/api/character/af95bd8a-dfae-45bb-bc69-533860d34129"
    When method get
    Then status 200
    Then match $.name == 'Draco Malfoy'

Scenario: Verificando se a busca por personagens retornou não retorna um array vazio
    Given url url_base
    And path "/api/characters"
    When method get
    Then status 200
    Then match $ != '#[]'

Scenario: Verificando informações dos personagens da Grifinória
    Given url url_base
    And path "/api/characters/house/gryffindor"
    When method get
    Then status 200
    Then match $[0].name == 'Harry Potter'

Scenario: Verificando informações sobre os feitiços
    Given url url_base
    And path "/api/spells"
    When method get
    Then status 200
    Then match $[8].name == 'Avada Kedavra'
    Then match $[8].description == 'Also known as The Killing Curse, the most evil spell in the Wizarding World; one of three Unforgivable Curses; Harry Potter is the only known witch or wizard to survive it'

Scenario: Tentando acessar uma página inexistente
    Given url url_base
    And path "/api/character"
    When method get
    Then status 404

Scenario: Tentandor obter os dados de um personagem inexistente
    Given url url_base
    And path "/api/character/1234"
    When method get
    Then status 200
    Then match $ == '#[]'