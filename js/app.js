import { countries } from "./contries.js";

const selectTag = document.querySelectorAll('select'),
    traslateButtom = document.querySelector('button'),
    fromText = document.querySelector('.from-text'),
    toText = document.querySelector('.to-text'),
    exchangeIcon = document.querySelector('i.ri-arrow-left-right-fill'),
    icons = document.querySelectorAll('.row i');

[...selectTag].map((tag, id) => {
    for (const contries_code in countries) {

        let options = countries[contries_code];
        let selected;

        if (id === 0 && contries_code === 'en-GB') {
            selected = 'selected';
        } else if (id === 1 && contries_code === 'hi-IN') {
            selected = 'selected';
        };

        let option = `
             <option value="${contries_code}" ${selected} >${options}</option>
        `;
        tag.insertAdjacentHTML('beforeend', option)
    };
});

traslateButtom.addEventListener('click', async () => {
    let text = fromText.value,
        traslateFrom = selectTag[0].value,
        translateTo = selectTag[1].value;
    if (!text) return;
    const apiUrl = `https://api.mymemory.translated.net/get?q=${text} World!&langpair=${traslateFrom}|${translateTo}`;

    trasnlate(apiUrl);
    toText.setAttribute('placeholder', 'Traducinedo ....')

});

exchangeIcon.addEventListener('click', () => {
    let temText = fromText.value,
        temLag = selectTag[0].value;
    selectTag[0].value = selectTag[1].value;
    fromText.value = toText.value;
    toText.value = temText;
    selectTag[1].value = temLag;
});

[...icons].map(icon => {
    icon.addEventListener('click', ({ target }) => {
        if (target.classList.contains('ri-file-copy-line')) {
            if (target.id === 'from') {
                navigator.clipboard.writeText(fromText.value);
            } else {
                navigator.clipboard.writeText(toText.value);
            };
        } else {
            let utterance;
            if (target.id === 'from') {
                utterance = new SpeechSynthesisUtterance(fromText.value);
                utterance.lang = selectTag[0].value;
            } else {
                utterance = new SpeechSynthesisUtterance(toText.value);
                utterance.lang = selectTag[1].value;
            };
            speechSynthesis.speak(utterance);
        };
    });
});

const trasnlate = async (urlFech) => {

    try {

        const response = await fetch(urlFech);
        const data = await response.json();
        const { translatedText } = data.responseData;

        toText.value = translatedText;

    } catch (error) {
        console.log(error)
    }
};
