const colors = [
    { bg: 'linear-gradient(135deg, #667eea, #764ba2)', text: 'white' },
    { bg: 'linear-gradient(135deg, #f093fb, #f5576c)', text: 'white' },
    { bg: 'linear-gradient(135deg, #4facfe, #00f2fe)', text: 'white' },
    { bg: 'linear-gradient(135deg, #43e97b, #38f9d7)', text: 'white' },
    { bg: 'linear-gradient(135deg, #fa709a, #fee140)', text: 'white' },
    { bg: 'linear-gradient(135deg, #ff9a9e, #fecfef)', text: '#333' },
    { bg: 'linear-gradient(135deg, #a8edea, #fed6e3)', text: '#333' },
    { bg: 'linear-gradient(135deg, #84fab0, #8fd3f4)', text: '#333' }
];

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
        changeColors();
        
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

function changeColors() {
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    document.body.style.background = randomColor.bg;
    document.body.style.color = randomColor.text;
}

newQuoteBtn.addEventListener('click', getNewQuote);

getNewQuote();