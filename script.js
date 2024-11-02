let fields = [
    null,
    null,
    'circle',
    null,
    'cross',
    null,
    null,
    null,
    null
];

function init() {
    render();
}

function render() {
    const contentDiv = document.getElementById('content');
    let tableHTML = '<table>';

    for (let i = 0; i < 3; i++) {
        tableHTML += '<tr>';
        for (let j = 0; j < 3; j++) {
            const index = i * 3 + j; // Berechnet den richtigen Index im Array
            const cellValue = fields[index];

            tableHTML += `<td>${cellValue ? cellValue === 'circle' ? createAnimatedCircle() : createAnimatedCross() : ''}</td>`;
        }
        tableHTML += '</tr>';
    }

    tableHTML += '</table>';
    contentDiv.innerHTML = tableHTML;
}

function createAnimatedCircle() {
    const svgNamespace = "http://www.w3.org/2000/svg";
    
    // Erstelle das SVG-Element
    const svg = document.createElementNS(svgNamespace, "svg");
    svg.setAttribute("width", "70");
    svg.setAttribute("height", "70");

    // Erstelle den Kreis
    const circle = document.createElementNS(svgNamespace, "circle");
    circle.setAttribute("cx", "35"); // X-Koordinate des Kreismittelpunkts
    circle.setAttribute("cy", "35"); // Y-Koordinate des Kreismittelpunkts
    circle.setAttribute("r", "30"); // Radius
    circle.setAttribute("fill", "none"); // Nur der Rand sichtbar
    circle.setAttribute("stroke", "#00B0EF"); // Randfarbe
    circle.setAttribute("stroke-width", "8"); // Dicke des Randes

    // Erstelle die Füllanimation
    const fillAnimation = document.createElementNS(svgNamespace, "animate");
    fillAnimation.setAttribute("attributeName", "stroke-dasharray");
    fillAnimation.setAttribute("from", "0, 188.4"); // 188.4 ist die Länge des Kreises
    fillAnimation.setAttribute("to", "188.4, 0"); // Nur der Rahmen sichtbar
    fillAnimation.setAttribute("dur", "500ms"); // Dauer der Animation
    fillAnimation.setAttribute("fill", "freeze"); // Behalte das Endergebnis der Animation

    // Setze stroke-dasharray für die Animation
    circle.setAttribute("stroke-dasharray", "0, 188.4"); // Initialisierung für die Animation

    // Füge die Animation dem Kreis hinzu
    circle.appendChild(fillAnimation);

    // Füge den Kreis zum SVG hinzu
    svg.appendChild(circle);
    
    // Rückgabe des SVG-Codes als String
    return svg.outerHTML;
}

// Beispiel: Ausgabe des SVG-Codes in der Konsole
console.log(createAnimatedCircle());

function createAnimatedCross() {
    const svgNamespace = "http://www.w3.org/2000/svg";
    
    // Erstelle das SVG-Element
    const svg = document.createElementNS(svgNamespace, "svg");
    svg.setAttribute("width", "70");
    svg.setAttribute("height", "70");

    // Erstelle die beiden Linien des Kreuzes
    const line1 = document.createElementNS(svgNamespace, "line");
    line1.setAttribute("x1", "10"); // Startpunkt X für die erste Linie
    line1.setAttribute("y1", "10"); // Startpunkt Y für die erste Linie
    line1.setAttribute("x2", "60"); // Endpunkt X für die erste Linie
    line1.setAttribute("y2", "60"); // Endpunkt Y für die erste Linie
    line1.setAttribute("stroke", "#FFC000"); // Farbe der Linie
    line1.setAttribute("stroke-width", "8"); // Dicke der Linie
    line1.setAttribute("stroke-dasharray", "70.71"); // Länge der Diagonale
    line1.setAttribute("stroke-dashoffset", "70.71"); // Anfangs nicht sichtbar

    const line2 = document.createElementNS(svgNamespace, "line");
    line2.setAttribute("x1", "10"); // Startpunkt X für die zweite Linie
    line2.setAttribute("y1", "60"); // Startpunkt Y für die zweite Linie
    line2.setAttribute("x2", "60"); // Endpunkt X für die zweite Linie
    line2.setAttribute("y2", "10"); // Endpunkt Y für die zweite Linie
    line2.setAttribute("stroke", "#FFC000"); // Farbe der Linie
    line2.setAttribute("stroke-width", "8"); // Dicke der Linie
    line2.setAttribute("stroke-dasharray", "70.71"); // Länge der Diagonale
    line2.setAttribute("stroke-dashoffset", "70.71"); // Anfangs nicht sichtbar

    // Erstelle die Füllanimation für beide Linien
    const fillAnimation1 = document.createElementNS(svgNamespace, "animate");
    fillAnimation1.setAttribute("attributeName", "stroke-dashoffset");
    fillAnimation1.setAttribute("from", "70.71"); // Startwert
    fillAnimation1.setAttribute("to", "0"); // Endwert
    fillAnimation1.setAttribute("dur", "500ms"); // Dauer der Animation
    fillAnimation1.setAttribute("fill", "freeze"); // Behalte das Endergebnis der Animation

    const fillAnimation2 = document.createElementNS(svgNamespace, "animate");
    fillAnimation2.setAttribute("attributeName", "stroke-dashoffset");
    fillAnimation2.setAttribute("from", "70.71"); // Startwert
    fillAnimation2.setAttribute("to", "0"); // Endwert
    fillAnimation2.setAttribute("dur", "500ms"); // Dauer der Animation
    fillAnimation2.setAttribute("fill", "freeze"); // Behalte das Endergebnis der Animation

    // Füge die Animationen den Linien hinzu
    line1.appendChild(fillAnimation1);
    line2.appendChild(fillAnimation2);

    // Füge die Linien zum SVG hinzu
    svg.appendChild(line1);
    svg.appendChild(line2);
    
    // Rückgabe des SVG-Codes als String
    return svg.outerHTML;
}

// Beispiel: Ausgabe des SVG-Codes in der Konsole
console.log(createAnimatedCross());