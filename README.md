# Prototypischer LLM-Chatbot als Verkaufassistent für die WGV-Versicherung
Das Ziel dieses Projekts ist die prototypische Implementierung eines LLM-Chatbots als Verkaufassistenten für die WGV-Versicherung. Dieser soll zur Informationsvermittlung und zum Vertrieb der Versicherungsprodukte des Unternehmens dienen.

## Requirementes
Die Installation der Anwendung setzt die Installation von Docker voraus. Des Weiteren muss `NodeJS` und die dazugehörigen Libraries installiert werden. Außerdem setzt die Nutzung des Chatbots eine stabile Internetverbindung voraus.

## Installationsanleitung
Repository klonen
~~~
git clone https://github.com/BuenyA/WGV-Verkaufsassistent
~~~
Navigation in Zielordner
~~~
cd WGV-Verkaufassistent
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
Copyright (C) 2024 DHBW-Stuttgart und WGV-Versicherung

Dieses Programm wurde im Rahmen einer wissenschaftlichen Arbeit in Kooperation zwischen der DHBW Stuttgart und der WGV-Versicherung entwickelt. Beide Parteien behalten sich die Verwertungsrechte vor.
