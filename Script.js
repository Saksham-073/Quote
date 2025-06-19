function randomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return { r, g, b };
}

function getluminance(r, g, b) {
    return 0.299 * r + 0.587 * g + 0.114 * b;
}

function genColors() {
    const color1 = randomColor();
    const color2 = randomColor();
    
    const bgGradient = `linear-gradient(135deg, rgb(${color1.r}, ${color1.g}, ${color1.b}), rgb(${color2.r}, ${color2.g}, ${color2.b}))`;
    const luminance = getluminance(color1.r, color1.g, color1.b);
    const textColor = luminance > 150 ? 'black' : 'white';

    document.body.style.background = bgGradient;
    document.body.style.color = textColor;
}

const quote = document.getElementById('quote');
const author = document.getElementById('author');
const newQuoteBtn = document.getElementById('new-quote');
const twitterBtn = document.getElementById('twitter');
const loading = document.getElementById('loading');

let currentQuote = '';
let currentAuthor = '';

async function getNewQuote() {
    loading.style.display = 'block';
    newQuoteBtn.disabled = true;
    
    quote.classList.add('fade-out');
    author.classList.add('fade-out');

    try {
        const response = await fetch('https://api.api-ninjas.com/v1/quotes', {
            headers: {
                'X-Api-Key': 'tgr/6dTSZr3GtaiPuxxHaQ==RNubjqK5yKgBdo3F'
            },
        });
        const data = await response.json();
        
        if (data && data[0]) {
            currentQuote = data[0].quote;
            currentAuthor = data[0].author;
        } else {
            throw new Error('No quote received');
        }
    } catch (error) {
        console.error('Error fetching quote:', error);
        currentQuote = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis, asperiores!";
        currentAuthor = "lorem1";
    }

    await new Promise(resolve => setTimeout(resolve, 500));

    setTimeout(() => {
        quote.textContent = `"${currentQuote}"`;
        author.textContent = currentAuthor;
        updateTwitterLink();
        genColors();
        
        quote.classList.remove('fade-out');
        author.classList.remove('fade-out');
        
        loading.style.display = 'none';
        newQuoteBtn.disabled = false;
    }, 300);
}

function updateTwitterLink() {
    const text = `"${currentQuote}" — ${currentAuthor}`;
    const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
    twitterBtn.href = tweetUrl;
}

newQuoteBtn.addEventListener('click', getNewQuote);
getNewQuote();