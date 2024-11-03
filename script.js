let fields = [
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null
];

let currentPlayer = "cross"; // Startspieler

function init() {
    render();
    updateStatus(); // Initialer Status
}

function render() {
    const contentDiv = document.getElementById('content');
    let tableHTML = '<table>';

    for (let i = 0; i < 3; i++) {
        tableHTML += '<tr>';
        for (let j = 0; j < 3; j++) {
            const index = i * 3 + j; // Berechnet den richtigen Index im Array
            tableHTML += `<td id="cell-${index}" onclick="cellClicked(${index})"></td>`;
        }
        tableHTML += '</tr>';
    }

    tableHTML += '</table>';
    contentDiv.innerHTML = tableHTML;
}

function createAnimatedCircle() {
    const svgNamespace = "http://www.w3.org/2000/svg";
    
    const svg = document.createElementNS(svgNamespace, "svg");
    svg.setAttribute("width", "70");
    svg.setAttribute("height", "70");

    const circle = document.createElementNS(svgNamespace, "circle");
    circle.setAttribute("cx", "35");
    circle.setAttribute("cy", "35");
    circle.setAttribute("r", "30");
    circle.setAttribute("fill", "none");
    circle.setAttribute("stroke", "#00B0EF");
    circle.setAttribute("stroke-width", "8");

    const fillAnimation = document.createElementNS(svgNamespace, "animate");
    fillAnimation.setAttribute("attributeName", "stroke-dasharray");
    fillAnimation.setAttribute("from", "0, 188.4");
    fillAnimation.setAttribute("to", "188.4, 0");
    fillAnimation.setAttribute("dur", "500ms");
    fillAnimation.setAttribute("fill", "freeze");

    circle.setAttribute("stroke-dasharray", "0, 188.4");
    circle.appendChild(fillAnimation);
    svg.appendChild(circle);
    
    return svg.outerHTML;
}

function createAnimatedCross() {
    const svgNamespace = "http://www.w3.org/2000/svg";
    
    const svg = document.createElementNS(svgNamespace, "svg");
    svg.setAttribute("width", "70");
    svg.setAttribute("height", "70");

    const line1 = document.createElementNS(svgNamespace, "line");
    line1.setAttribute("x1", "10");
    line1.setAttribute("y1", "10");
    line1.setAttribute("x2", "60");
    line1.setAttribute("y2", "60");
    line1.setAttribute("stroke", "#FFC000");
    line1.setAttribute("stroke-width", "8");
    line1.setAttribute("stroke-dasharray", "70.71");
    line1.setAttribute("stroke-dashoffset", "70.71");

    const line2 = document.createElementNS(svgNamespace, "line");
    line2.setAttribute("x1", "10");
    line2.setAttribute("y1", "60");
    line2.setAttribute("x2", "60");
    line2.setAttribute("y2", "10");
    line2.setAttribute("stroke", "#FFC000");
    line2.setAttribute("stroke-width", "8");
    line2.setAttribute("stroke-dasharray", "70.71");
    line2.setAttribute("stroke-dashoffset", "70.71");

    const fillAnimation1 = document.createElementNS(svgNamespace, "animate");
    fillAnimation1.setAttribute("attributeName", "stroke-dashoffset");
    fillAnimation1.setAttribute("from", "70.71");
    fillAnimation1.setAttribute("to", "0");
    fillAnimation1.setAttribute("dur", "500ms");
    fillAnimation1.setAttribute("fill", "freeze");

    const fillAnimation2 = document.createElementNS(svgNamespace, "animate");
    fillAnimation2.setAttribute("attributeName", "stroke-dashoffset");
    fillAnimation2.setAttribute("from", "70.71");
    fillAnimation2.setAttribute("to", "0");
    fillAnimation2.setAttribute("dur", "500ms");
    fillAnimation2.setAttribute("fill", "freeze");

    line1.appendChild(fillAnimation1);
    line2.appendChild(fillAnimation2);

    svg.appendChild(line1);
    svg.appendChild(line2);
    
    return svg.outerHTML;
}

function cellClicked(index) {
    // Überprüfen, ob das Feld bereits belegt ist
    if (fields[index] === null) {
        // Füge das aktuelle Zeichen in das Feld ein
        fields[index] = currentPlayer;

        // Füge den SVG-Code in das entsprechende <td>-Element ein
        const cell = document.getElementById(`cell-${index}`);
        if (currentPlayer === "circle") {
            cell.innerHTML = createAnimatedCircle();
            currentPlayer = "cross"; // Wechsle den Spieler
        } else {
            cell.innerHTML = createAnimatedCross();
            currentPlayer = "circle"; // Wechsle den Spieler
        }

        // Überprüfe, ob das Spiel zu Ende ist
        const winningCombination = checkWinner();
        if (winningCombination) {
            highlightWinningLine(winningCombination);
            updateStatus(`${fields[winningCombination[0]]} gewinnt!`);
            disableBoard(); // Deaktiviert das Spielbrett nach dem Gewinn
        } else {
            updateStatus(); // Aktualisiere den Status für den nächsten Spieler
        }

        // Entferne das onclick-Attribut
        cell.onclick = null;
    }
}

function checkWinner() {
    const winningCombinations = [
        [0, 1, 2], // Erste Reihe
        [3, 4, 5], // Zweite Reihe
        [6, 7, 8], // Dritte Reihe
        [0, 3, 6], // Erste Spalte
        [1, 4, 7], // Zweite Spalte
        [2, 5, 8], // Dritte Spalte
        [0, 4, 8], // Diagonale
        [2, 4, 6]  // Diagonale
    ];

    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (fields[a] && fields[a] === fields[b] && fields[a] === fields[c]) {
            return combination; // Gibt die Gewinnkombination zurück
        }
    }
    return false; // Kein Gewinner
}

function highlightWinningLine(combination) {
    if (combination) {
        const line = document.createElement('div');
        line.style.position = 'absolute';
        line.style.backgroundColor = 'white'; // Farbe der Gewinnlinie
        line.style.zIndex = '10'; // Stelle sicher, dass die Linie über den Zellen liegt

        if (combination[0] === 0 && combination[1] === 1 && combination[2] === 2) {
            // Horizontale Linie (1. Reihe)
            line.style.width = '100%';
            line.style.height = '8px';
            line.style.top = '20%'; // Positioniert in der Mitte der Zeile
            line.style.left = '0';
            line.style.transform = 'translateY(0) rotate(0deg)';
        } else if (combination[0] === 3 && combination[1] === 4 && combination[2] === 5) {
            // Horizontale Linie (2. Reihe)
            line.style.width = '100%';
            line.style.height = '8px';
            line.style.top = '50%'; // Positioniert in der Mitte der Zeile
            line.style.left = '0';
            line.style.transform = 'translateY(-50%) rotate(0deg)';
        } else if (combination[0] === 6 && combination[1] === 7 && combination[2] === 8) {
            // Horizontale Linie (3. Reihe)
            line.style.width = '100%';
            line.style.height = '8px';
            line.style.top = '80%'; // Positioniert in der Mitte der Zeile
            line.style.left = '0';
            line.style.transform = 'translateY(-50%) rotate(0deg)';
        } else if (combination[0] === 0 && combination[1] === 3 && combination[2] === 6) {
            // Vertikale Linie (1. Spalte)
            line.style.width = '8px';
            line.style.height = '88%';
            line.style.left = '15%'; // Positioniert in der Mitte der Spalte
            line.style.top = '50%';
            line.style.transform = 'translateY(-50%) rotate(0deg)';
        } else if (combination[0] === 1 && combination[1] === 4 && combination[2] === 7) {
            // Vertikale Linie (2. Spalte)
            line.style.width = '8px';
            line.style.height = '88%';
            line.style.left = '50%';
            line.style.top = '50%';
            line.style.transform = 'translateY(-50%) rotate(0deg)';
        } else if (combination[0] === 2 && combination[1] === 5 && combination[2] === 8) {
            // Vertikale Linie (3. Spalte)
            line.style.width = '8px';
            line.style.height = '88%';
            line.style.left = '83%';
            line.style.top = '50%';
            line.style.transform = 'translateY(-50%) rotate(0deg)';
        } else if (combination[0] === 0 && combination[1] === 4 && combination[2] === 8) {
            // Diagonale von links oben nach rechts unten
            line.style.width = '8px';
            line.style.height = '120%';
            line.style.left = '50%';
            line.style.top = '50%';
            line.style.transform = 'translateY(-50%) rotate(-45deg)';
        } else if (combination[0] === 2 && combination[1] === 4 && combination[2] === 6) {
            // Diagonale von links unten nach rechts oben
            line.style.width = '8px';
            line.style.height = '120%';
            line.style.left = '50%';
            line.style.top = '50%';
            line.style.transform = 'translateY(-50%) rotate(45deg)';
        }

        document.getElementById('content').appendChild(line); // Füge die Linie zum Content hinzu
    }
}

function disableBoard() {
    const cells = document.querySelectorAll('td');
    cells.forEach(cell => {
        cell.onclick = null; // Deaktiviere das Klicken
        cell.style.pointerEvents = 'none'; // Deaktiviere den Hover-Effekt
        cell.style.cursor = 'default'; // Setze den Cursor zurück
    });
}

function resetGame() {
    fields.fill(null); // Leere das Feld
    currentPlayer = "cross"; // Setze den aktuellen Spieler zurück
    init(); // Starte das Spiel neu
}

// Funktion zum Aktualisieren des Status
function updateStatus(message) {
    const statusDiv = document.getElementById('status');
    if (message) {
        statusDiv.innerHTML = message; // Setze die Gewinnmeldung
    } else {
        statusDiv.innerHTML = `${currentPlayer.charAt(0).toUpperCase() + currentPlayer.slice(1)} ist am Zug!`;
    }
}

// Starte das Spiel
init();
