const quotContainer=document.getElementById('quote-container');
const quoteText=document.getElementById('text');
const quoteAuthor=document.getElementById('author');
const twitterBtn=document.getElementById('twitter');
const newQuoteBtn=document.getElementById('newquote')


apiQuotes=[]

function loading(){
    loader.hidden=false;
    quotContainer.hidden=true;
}
// loading complete
function complete(){
    quotContainer.hidden=false;
    loader.hidden=true;
}

function newQuote(){
    loading();
    const quote= apiQuotes[Math.floor(Math.random()*apiQuotes.length)];
    
    if(!quote.author){
        quoteAuthor.textContent='unknown';
    }
    else{
        quoteAuthor.textContent= quote.author;
    }
    // check quote length
    if(quote.text.length>120){
        quoteText.classList.add('large-text');
    }
    else{
        quoteText.classList.remove('large-text')
    }

    // set quote

    quoteText.textContent=quote.text;
    complete();  
}

// Get Quotes from API
async function getQuotes(){
    loading();
    const apiUrl ='https:/type.fit/api/quotes';
    try{
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote()
    }catch (error){
        
    }
}
// tweet quote
function tweet(){
    const twitterUrl=`https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${quoteAuthor.textContent}`;
    window.open(twitterUrl, '_blank')
}
// event listeners
newQuoteBtn.addEventListener('click', newQuote)
twitterBtn.addEventListener('click' ,tweet)

// On load
getQuotes()
