const textDisplay = document.getElementById('text-display');
const inputArea = document.getElementById('input-area');
const wpmDisplay = document.getElementById('wpm');
const accuracyDisplay = document.getElementById('accuracy');
const newTextButton = document.getElementById('new-text');
const virtualKeyboard = document.getElementById('virtual-keyboard');

let startTime, endTime;
let textArray = [];
let currentIndex = 0;

const turkishTexts = [
    "Şişli'de yüzlerce şişe şişelenmiş.",
    "Üç Türk ünlüsü Ünye'de ültimatom verdi.",
    "İğneli çiçekler İğneada'da görüldü.",
    "Öğretmen öğrencilere ödev önerdi.",
    "Çekoslavakyalılaştıramadıklarımızdan mısınız?",
    "Afyonkarahisarlılaştırabildiklerimizdenmişsinizcesine",
    "Zımpara kağıdı ile zımparaladığım odunları zımbaladım.",
    "Müdür müdür müdür müdür?",
    "Paşa tası ile taşa taşı.",
    "Keşkekçi keşkeklendiricilerden misin?",
    "Al yanaklı Yalovalı Ayla yaylaları yaya yaya aştı."
];

const turkishQKeyboard = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', 'Ğ', 'Ü'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Ş', 'İ'],
    ['Z', 'X', 'C', 'V', 'B', 'N', 'M', 'Ö', 'Ç']
];

function getRandomText() {
    return turkishTexts[Math.floor(Math.random() * turkishTexts.length)];
}

function startTest() {
    const text = getRandomText();
    textArray = text.split('');
    currentIndex = 0;
    inputArea.value = '';
    textDisplay.innerHTML = text;
    startTime = new Date();
    updateVirtualKeyboard();
}

function calculateWPM() {
    const words = inputArea.value.trim().split(/\s+/).length;
    const minutes = (endTime - startTime) / 60000;
    return Math.round(words / minutes);
}

function calculateAccuracy() {
    const typedChars = inputArea.value.split('');
    let correctChars = 0;
    typedChars.forEach((char, index) => {
        if (char === textArray[index]) {
            correctChars++;
        }
    });
    return Math.round((correctChars / Math.min(typedChars.length, textArray.length)) * 100);
}

function updateVirtualKeyboard() {
    virtualKeyboard.innerHTML = '';
    turkishQKeyboard.forEach(row => {
        const rowElement = document.createElement('div');
        rowElement.className = 'keyboard-row';
        row.forEach(key => {
            const keyElement = document.createElement('button');
            keyElement.textContent = key;
            keyElement.className = 'key';
            if (key.toLowerCase() === textArray[currentIndex]?.toLowerCase()) {
                keyElement.classList.add('highlight');
            }
            rowElement.appendChild(keyElement);
        });
        virtualKeyboard.appendChild(rowElement);
    });
}

inputArea.addEventListener('input', () => {
    const typedText = inputArea.value;
    const originalText = textArray.join('');
    
    currentIndex = typedText.length;
    updateVirtualKeyboard();
    
    if (typedText === originalText) {
        endTime = new Date();
        wpmDisplay.textContent = calculateWPM();
        accuracyDisplay.textContent = calculateAccuracy() + '%';
    } else {
        wpmDisplay.textContent = '0';
        accuracyDisplay.textContent = calculateAccuracy() + '%';
    }
});

newTextButton.addEventListener('click', startTest);

// Initialize the test
startTest();
