interface Book {
  id?: number;
  title: string;
  author: string;
  publisher: string;
  year: number;
  pages: number;
  plot: string;
  audience: string;
  color: string;
  coverUrl: string;
  purchaseLink: string;
}

/* ------------------------- global variables  ------------------------- */

let bookInfo: Book[] = []; //result of the Api's request
let book: Book | null = null; //single element of bookInfo
let searchResults: Book[];
let resultsArray: HTMLElement[] = [];

const searchElement: HTMLInputElement | null = document.querySelector("#search")!;
const submitBtn: HTMLButtonElement = document.querySelector("#submitBtn")!;
const searchForm: HTMLElement = document.querySelector("#searchForm")!;
const resultsDiv: HTMLDivElement = document.createElement("div")!;
const booksArray: HTMLElement[] = createClickableBooksList();
const firstPage: HTMLElement = document.querySelector("#booksContainer")!;
const secondPage: HTMLElement = document.querySelector("#bookInfoContainer")!;
const bookNameInfoPage: HTMLElement = document.querySelector(".infoPageBookName")!;
const authorNameInfoPage: HTMLElement = document.querySelector(".infoPageAuthorName")!;
const bookNameInfoPage2: HTMLElement = document.querySelector(".infoPageBookName2")!;
const authorNameInfoPage2: HTMLElement = document.querySelector(".infoPageAuthorName2")!;
const goBackBtn: HTMLButtonElement = document.querySelector(".goBackBtn")!;
const infoPageCover: HTMLImageElement = document.querySelector(".infoPageCover")!;
const bookDescription: HTMLElement = document.querySelector(".bookDescription")!;
const bookContainer: NodeListOf<HTMLElement> = document.querySelectorAll(".book")!;
const infoBookContainer: HTMLDivElement | null = document.querySelector(".infoBook");
const purchaseLinksList: string[] = [
  "https://www.amazon.co.uk/s?k=goodnight+moon+books+for+babies&adgrpid=1172080299680144&hvadid=73255218919932&hvbmt=bb&hvdev=c&hvlocphy=153541&hvnetw=o&hvqmt=b&hvtargid=kwd-73255163107393%3Aloc-174&hydadcr=24834_1854582&tag=mh0a9-21&ref=pd_sl_68iejd3qhb_b",
  "https://www.wob.com/en-gb/books/eric-carle/very-hungry-caterpillar/9780140569322?msclkid=6a9c32314b5115cfd45657be71ab63c0&utm_source=bing&utm_medium=cpc&utm_campaign=Wob%20-%20GBR%20-%20Bing%20-%20Standard%20Shopping%20-%20GOR%20-%20EN%20-%20XX%20-%20Used%20Books%20-%20SalesRank%3A%201001%20-%205000&utm_term=4574861742249794&utm_content=Ad%20group",
  "https://www.ebay.com/itm/374934592489?_trkparms=amclksrc%3DITM%26aid%3D1110006%26algo%3DHOMESPLICE.SIM%26ao%3D1%26asc%3D20231107084023%26meid%3D4b1e07aa39334fceb4f19cb145df1cfe%26pid%3D101875%26rk%3D3%26rkt%3D4%26sd%3D144493721142%26itm%3D374934592489%26pmt%3D1%26noa%3D0%26pg%3D4429486%26algv%3DSimplAMLv11WebTrimmedV3MskuWithLambda85KnnRecallV1V2V4ItemNrtInQueryAndCassiniVisualRankerAndBertRecallWithVMEV3CPCAuto&_trksid=p4429486.c101875.m1851&amdata=cksum%3A3749345924894b1e07aa39334fceb4f19cb145df1cfe%7Cenc%3AAQAIAAABYObhgc4Nk8%252BdtAwOww4FKLaj%252FQ5qqgDlQCuqZA43WcPFUWDERCUugbbOk7XQv0JXlBfqCg2xKF3WcPghxGMFw2oSlXvfExEaMYr7I7LmrHcP6czY1wIMt0ORyKiCWt95xldincyyBx3g%252BNDW%252B%252FhWUgTaBhK6xAm%252BJIbCOMehu%252BdwvWiwwosq1nTizjCzFuZ7z9lZwjUQiEz%252Bc40wD5G5mPUuuyuoP1H4rtFbtUqUhUi9UPJgrMVJCflygu1po8VoJzaV7k5AAr1mX%252FPixgrp6mXq7xSzV8DfLTS8GV8Xps1hRIyczBqDSzpgKoA3pRpVo8U9hpykvYnxqx7AC4QYe51wdr6g55hwYQYyP5OmigO6T%252BC3ju3%252FtTabgbyWWmcLfJ6r7l335LUx26no3p2FBjzfQcR4Ojy8IunaC2nKzQfW7AuAb6q069NP2eI54JB0eD8%252BRHzSVNUy%252F7YTYOUeBOA%253D%7Campid%3APL_CLK%7Cclp%3A4429486&epid=14038273796",
  "https://www.wob.com/en-gb/books/crockett-johnson/harold-and-the-purple-crayon/9780060229351?msclkid=5113e54f2dee187cd18980c01687e58a&utm_source=bing&utm_medium=cpc&utm_campaign=Wob%20-%20GBR%20-%20Bing%20-%20Standard%20Shopping%20-%20GOR%20-%20EN%20-%20XX%20-%20Used%20Books%20-%20SalesRank%3A%203000001%20-%204000000&utm_term=4575480218311219&utm_content=Ad%20group",
  "https://www.amazon.co.uk/Where-Wild-Things-Maurice-Sendak/dp/1435208927?ie=UTF8&tag=mh0a9-21&hvadid=&hvpos=&hvexid={aceid}&hvnetw=o&hvrand=&hvpone=&hvptwo=&hvqmt=b&hvdev=c&ref=pd_sl_7dy1f5hemb_e",
  "https://www.amazon.co.uk/s?k=ludwig+bemelmans+books&i=stripbooks&adgrpid=1187473574945374&hvadid=74217322335108&hvbmt=bp&hvdev=c&hvlocphy=153541&hvnetw=o&hvqmt=p&hvtargid=kwd-74217299968475%3Aloc-174&hydadcr=24429_2219239&tag=mh0a9-21&ref=pd_sl_76a190tij8_p",
  "https://www.amazon.co.uk/s?k=the+tale+of+peter+rabbit+hieroglyph+edition&adgrpid=1184175039985531&hvadid=74011162763008&hvbmt=bb&hvdev=c&hvlocphy=153541&hvnetw=o&hvqmt=b&hvtargid=kwd-74011141358501%3Aloc-174&hydadcr=24492_2219297&tag=mh0a9-21&ref=pd_sl_7dfanvv9qu_b",
  "https://www.wob.com/en-gb/books/e-b-white/charlotte-s-web/9780141329680?msclkid=e4f1c9ccef8818187e3cac43d3ef7160&utm_source=bing&utm_medium=cpc&utm_campaign=Wob%20-%20GBR%20-%20Bing%20-%20Standard%20Shopping%20-%20GOR%20-%20EN%20-%20XX%20-%20Used%20Books%20-%20SalesRank%3A%201000001%20-%202000000&utm_term=4575411497703322&utm_content=Ad%20group",
];

// function: gets info from Api
async function getInfoBook(): Promise<void> {
  try {
    const response: Response = await fetch(
      "https://my-json-server.typicode.com/zocom-christoffer-wallenberg/books-api/books"
    );

    if (!response.ok) {
      throw new Error("Error during the API request");
    }

    bookInfo = await response.json();

    // Chiamare la funzione per aggiornare gli elementi HTML dopo aver ottenuto i dati
    updateBookCover();

    // Chiamare la funzione per aggiungere gli eventi di click dopo aver ottenuto i dati
    attachClickEvent();
  } catch (error) {
    console.error(error.message);
  }
}

//function: creates an array from a node-list with elements with class 'book'
function createClickableBooksList(): HTMLElement[] {
  const clickableBooks: NodeListOf<HTMLElement> = document.querySelectorAll(".book");

  return Array.from(clickableBooks);
}

//function: pairs the book by id (Api element) and data-id (HTML element)
//          fills information inside the cover-side using Api's info
function updateBookCover(): void {
  for (const bookElement of booksArray) {
    const dataId: string | null = bookElement.getAttribute("data-id");
    const bookId: number = dataId ? +dataId : 0;
    //if string dataId is not null, wil be converted in a number

    book = bookInfo.find((book) => book.id === bookId);
    // checks every single book in the array bookInfo and compares the book.id from the Api and
    // the data-id of the HTMLElement after has been converted in a number(bookId)
    // if the IDs match the informations willl be filled
    if (book) {
      const bookNameElement: HTMLElement | null = bookElement.querySelector(".bookName");
      const authorNameElement: HTMLElement | null = bookElement.querySelector(".authorName");

      if (bookNameElement && authorNameElement) {
        bookNameElement.textContent = book.title;
        authorNameElement.textContent = book.author;
        bookElement.style.backgroundColor = book.color || "";
      }
    }
  }
}

//function: fill the info-container with Api's info
//          called in the attachClickEvent
function displayBookInfoContainer(): void {
  goBackBtn.style.display = "block";
  firstPage.style.display = "none";
  secondPage.style.display = "flex";
  resultsDiv.innerHTML = "";
  searchElement.value = "";

  bookNameInfoPage.textContent = book.title || "";
  authorNameInfoPage.textContent = book.author || "";
  bookNameInfoPage2.textContent = book.title || "";
  authorNameInfoPage2.textContent = book.author || "";
  bookDescription.textContent = book.plot || "";
  infoPageCover.src = book.coverUrl || "";
  infoBookContainer.style.backgroundColor = book.color || "";

  updateDetailsBox();
}

//create the main event listener
function attachClickEvent(): void {
  booksArray.forEach((bookElement) => {
    bookElement.addEventListener("click", () => {
      const dataId: string | null = bookElement.getAttribute("data-id");
      const bookId: number = dataId ? +dataId : 0;
      // checks every single book in the array bookInfo and compares the book.id from the Api and
      // the data-id of the HTMLElement after has been converted in a number(bookId)
      // if the IDs match the informations willl be filled

      const clickedBook = bookInfo.find((book) => book.id === bookId);

      if (clickedBook) {
        // Updates the current book with the clicked one
        book = clickedBook;

        // Gets the cover's url of the single book
        const coverUrl: string | null = bookElement.querySelector(".cover")?.getAttribute("src");

        // injects the cover in clickedBook
        clickedBook.coverUrl = coverUrl || "";

        // shows infos
        displayBookInfoContainer();
      }
    });
  });
}

function updateDetailsBox(): void {
  const detailsBox: HTMLElement = document.querySelector(".detailsBox");

  if (detailsBox) {
    detailsBox.innerHTML = "";
    // adds details dynamically and appends them to the HTML detailsBox
    const audienceItem: HTMLElement = document.createElement("div");
    audienceItem.innerHTML = `
      <li><strong>Audience: </strong>${book?.audience || ""}</li>
      <li><strong>First published: </strong>${book?.year || ""}</li>
    `;
    detailsBox.appendChild(audienceItem);

    const additionalDetailsItem: HTMLElement = document.createElement("div");
    additionalDetailsItem.innerHTML = `
      <li><strong>Pages: </strong>${book?.pages || ""}</li>
      <li><strong>Publisher: </strong>${book?.publisher || ""}</li>
    `;
    detailsBox.appendChild(additionalDetailsItem);
  }
}

function attachBackButton(): void {
  goBackBtn.addEventListener("click", () => {
    window.location.reload();
  });
}

//generic function that gets the index from the links list that matches with the right books.id
function getPurchaseLinkIndex(id: number): number {
  return id - 1;
}

function attachBuyButton(): void {
  const buyBtn: HTMLButtonElement | null = document.querySelector(".buyBtn");

  if (buyBtn) {
    buyBtn.addEventListener("click", () => {
      console.log("button clicked");

      // checks if the id is valid
      // use book.id as argument in the previous function to get the right index
      if (book && book.id !== undefined && book.id >= 1 && book.id <= purchaseLinksList.length) {
        const purchaseLinkIndex = getPurchaseLinkIndex(book.id);

        // checks if the gotten index is usable
        if (purchaseLinkIndex >= 0 && purchaseLinkIndex < purchaseLinksList.length) {
          const purchaseLink = purchaseLinksList[purchaseLinkIndex];

          if (purchaseLink) {
            // sends the user to the web address in a new page
            window.open(purchaseLink, "_blank");
          } else {
            console.error("Not avaible");
          }
        } else {
          console.error("Not avaible");
        }
      } else {
        console.error("ID not valid");
      }
    });
  }
}

//function: compares the input's field to with the books' titles and authors
function searchBook(): void {
  if (searchElement) {
    const searchTerm = searchElement.value.toLowerCase();

    searchResults = bookInfo.filter(
      (book) => book.title.toLowerCase().includes(searchTerm) || book.author.toLowerCase().includes(searchTerm)
    );
    //if the input is empty, resultsDiv's empty too
    if (searchElement.value == "") {
      resultsDiv.innerHTML = "";
    }

    if (searchResults.length > 0) {
      //eventual results will be displayed
      displaySearchResults(searchResults);
    } else {
      displayNoResultsMessage();
    }
    attachClickEventToResults();
  }
}

//generic function to display results, then used with searchResults as argument
function displaySearchResults(results: Book[]): void {
  resultsDiv.innerHTML = "";

  // loops in the resultsDiv to get the simple result and sets a data-id on it,
  // to add a css class and the matching book's color
  results.forEach((result) => {
    const resultDiv = document.createElement("div");
    resultDiv.classList.add("resultDiv");
    resultDiv.setAttribute("data-id", result.id.toString()); // Aggiungi l'ID del libro come data-id
    resultDiv.style.backgroundColor = `${result.color}`;
    resultDiv.innerHTML = `
      <h3>${result.title}</h3>
      <p><strong>Author:</strong> ${result.author}</p>
    `;

    //filled element gets append to the containers
    resultsDiv.appendChild(resultDiv);
  });
  searchForm.appendChild(resultsDiv);

  // updates the array with clickable results
  updateResultsArray();

  // calls the function after the results are generated
  attachClickEventToResults();
}

//creates an array from a node-list with clickable elements (same as createClickableBooksList() and clickableBooks)
function createClickableResultsList(): HTMLElement[] {
  const clickableResults: NodeListOf<HTMLElement> = document.querySelectorAll(".resultDiv");

  return Array.from(clickableResults);
}

function attachClickEventToResults(): void {
  resultsArray.forEach((resultElement) => {
    resultElement.addEventListener("click", () => {
      // makes the book id number to become the result element's data-id
      const bookId: number = +resultElement.getAttribute("data-id") || 0;
      console.log(bookId);

      // searches in booksArray (clickableList()) and extracts the id
      // if the extraxted and converted array's element id is the same of book.id the callback return true
      const bookElement = booksArray.find((element) => {
        const dataId: string | null = element.getAttribute("data-id");
        const elementBookId: number = dataId ? +dataId : 0;
        return elementBookId === bookId;
      });
      if (bookElement) {
        const coverUrl: string | null = bookElement.querySelector(".cover")?.getAttribute("src");

        // find the matching book in the array bookInfo
        const clickedBook = bookInfo.find((book) => book.id === bookId);

        if (clickedBook) {
          // Aggiorna il libro corrente con il libro cliccato
          book = clickedBook;

          // inject cover in clickedBook
          clickedBook.coverUrl = coverUrl || "";

          // show the page with the infos of the book
          displayBookInfoContainer();
        }
      }
    });
  });
}

function updateResultsArray() {
  resultsArray = createClickableResultsList();
}

function displayNoResultsMessage(): void {
  resultsDiv.innerHTML = "";

  resultsDiv.textContent = "No Results";
}

//create the event for both click and enter submit
function createSubmitEvent(): void {
  if (searchElement) {
    searchElement.addEventListener("input", () => {
      searchBook();
      if (searchElement.value === "") {
        resultsDiv.innerHTML = "";
      }
    });
  }

  if (submitBtn && searchForm) {
    submitBtn.addEventListener("click", () => {
      console.log("submitted");
      searchBook();
    });

    searchForm.addEventListener("submit", (event) => {
      event.preventDefault(); //avoid normal submit
      console.log("submitted");
      searchBook();
    });
  }
}

createSubmitEvent();
getInfoBook();
attachBackButton();
attachBuyButton();
