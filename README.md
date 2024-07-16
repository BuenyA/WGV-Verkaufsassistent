# Prototypischer LLM-Chatbot als Verkaufsassistent für die WGV-Versicherung
Das Ziel dieses Projekts ist die prototypische Implementierung eines LLM-Chatbots als Verkaufsassistenten für die WGV-Versicherung. Dieser soll zur Informationsvermittlung und zum Vertrieb der Versicherungsprodukte des Unternehmens dienen.

## Requirements
Die Installation der Anwendung setzt die Installation von Docker voraus. Des Weiteren muss `NodeJS` und die dazugehörigen Libraries installiert werden. Außerdem setzt die Nutzung des Chatbots eine stabile Internetverbindung voraus.

## Installationsanleitung
Repository klonen (Das Repository ist nicht öffentlich! Die Benutzung bedarf einer Anfrage an den Creator: BuenyA)
~~~
git clone https://github.com/BuenyA/WGV-Verkaufsassistent
~~~
Navigation in Zielordner
~~~
cd WGV-Verkaufsassistent
~~~
Docker-Container aufsetzen
~~~
docker-compose up -d
~~~
Installation und Ausführung der Angular-Applikation
~~~zsh
cd angular

# Installation Libraries
npm install

# Start der Angular-Anwendung
ng serve
~~~

Der WGV-Verkaufsassistent steht bei erfolgreicher Installation über den `localhost:4200` zur Verfügung.

## Repository Struktur
### Angular
> Dieses Verzeichnis beinhaltet die Anwendungslogik des Frontends

### Dataset
> In diesem Verzeichnis sind die Broschüren und Vertragsbedingungen für das LLM gesammelt

### DB
> Dieses Verzeichnis beinhaltet die relationale Datebank des Backends

### Documentation
> In diesem Verzeichnis befinden sich beispielhafte Aufzeichnung des LLM-Chatbots

### Server
> In diesem Verzeichnis befindet sich die Anwendungslogik des Backends

## Lizenz
Copyright © 2024 DHBW-Stuttgart und WGV-Informatik und Media GmbH

Dieses Programm wurde im Rahmen einer wissenschaftlichen Arbeit in Kooperation zwischen der DHBW Stuttgart und der WGV-Versicherung entwickelt. Beide Parteien behalten sich die Verwertungsrechte vor.
