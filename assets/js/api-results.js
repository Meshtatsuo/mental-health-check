// This script will pull the information from quiz results
// and use our api's to generate in the moment youtube vidoes
// and out of the moment book recommendations from google books

let videosToDisplay = [];
let booksToDisplay = [];
let fetchedBooks = [];
let savedResources = [];
let quizResults = [];
// grabbing querystring
let queryString = document.location.search;
let quizResultArray = queryString.split("&");
for ( i = 0; i < quizResultArray.length; i++ ) {
  let stringParse = quizResultArray[i].split("=");
  // console.log(stringParse);
  if (stringParse[1] == "true") {
    // console.log("tested has symptoms of " + stringParse[0]);
    quizResults.push(stringParse[0]);
  }
  else if (stringParse[1] == "false") {
    // console.log("tested does not have symptoms of " + stringParse[0]);
  }
}
console.log(quizResults)
// function to translate into api searches
// figure out better search terms
function getApiQueries (results) {
  // console.log(results);
  let bookSearchArray = [];
  let videoSearchArray = [];

  // fetchBooks (results);
  if (results.includes("?depression")) {
    // console.log("The result was positive for depression")
    // videoSearchArray.push("dogs");
    bookSearchArray.push("depression")
  }
  if (results.includes("anx")) {
    // console.log("The result was positive for anxiety")
    // videoSearchArray.push("meditation");
    bookSearchArray.push("anxiety")
  }
  if (results.includes("ptsd")) {
    // console.log("The result was positive for ptsd")
    // videoSearchArray.push("meditation");
    bookSearchArray.push("ptsd")
  }
  if (results.includes("sch")) {
    // console.log("The result was positive for sch")
    // videoSearchArray.push("dogs");
    bookSearchArray.push("schizophrenia")
  }
  if (results.includes("add")) {
    // console.log("The result was positive for addiction")
    // videoSearchArray.push("addiction");
    bookSearchArray.push("addiction")
  }
  // not single choice, will need to check for empty array
  // else {
  //   // console.log("Negative for symptoms on all checked counts")
  //   // don't fetch, just push the congratulations video
  // };
  
  fetchData(bookSearchArray);
};

const fetchData = function (books) {
  const promises = [];

  for (let i = 0; i < books.length; i++ ){
    promises.push(fetchBooks(books[i]));
  }

  console.log(promises);
  Promise.all(promises)
  .then(() => {
    // debugger;
    console.log(fetchedBooks);
    for ( i = 0; i < 3; i++ ){
      let a = Math.floor(Math.random() * fetchedBooks.length);
      let book = fetchedBooks[a];
      // console.log(book)
      // to check for duplicates
      if (booksToDisplay.includes(book)) {
        i--
      }
      else {
        booksToDisplay.push(book);
        displayBook(book, i);
      };
    }
  })
  .catch((e) => {
    console.log("there was an issues somewhere", e);
  });
};

// function for youtube api fetch
async function fetchVideos (searchTerm) {
  // want to find a way to check for only embeddable videos
  fetch("https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=" + searchTerm + "&safeSearch=moderate&format=5&key=AIzaSyApk2KxjyUh_kVnvLVoPNRgeDIW5eXZmXM")
    .then(function (result) {
      return result.json();
    })
    .then(function (result) {
      // find random 4 videos out of the 10 generated
      for ( i = 0; i < 4; i++) { 
        let a = Math.floor(Math.random() * 10);
        let video = result.items[a].id.videoId;
        // console.log(video);
        // to check for duplicates
        if (videosToDisplay.includes(video)) {
          i--
        }
        else {
          videosToDisplay.push(video);
          displayVideo(video, i);
          // console.log(video)
        };
      };
    }).catch(function(error) {
      // logs error if a problem occurs
      console.log(error);
    });
};

// function for google books api fetch
async function fetchBooks (searchTerm) {
  // debugger;
  // currently grabs a lot of academic books, want to get rid of those eventually I think
  fetch("https://www.googleapis.com/books/v1/volumes?q=" + searchTerm)
    .then(function (result) {
      return result.json();
    })
    .then(function (result) {
      // retrieves random 3 books from response and calls displayBook to output to viewport
      for ( i = 0; i < 3; i++) { 
        let a = Math.floor(Math.random() * 10);
        let book = result.items[a].volumeInfo;

        // to check for duplicates
        if (fetchedBooks.includes(book)) {
          i--
        }
        else {
          fetchedBooks.push(book);
          // displayBook(book, i);
        };
      };
    }).catch(function(error) {
      // logs error if a problem occurs
      console.log(error);
    });
  return fetchedBooks;
};

// functions for printing content to screen
function displayBook (bookInfo, i) {
  let bookEl = $("#suggestion-" + i);
  let bookLink = $("<a>");
  bookLink.attr("href", bookInfo.infoLink);
  bookLink.attr("target", "_blank");
  let bookImg = $("<img>");
  bookImg.attr("alt", bookInfo.title + " image preview");
  bookImg.attr("src", bookInfo.imageLinks.thumbnail);
  bookImg.attr("class", "offset-s1, z-depth-3"); // add class/style

  bookLink.append(bookImg);
  bookEl.append(bookLink);
};

function displayVideo (video, i) {
  $("#video-" + i).attr("src", "https://www.youtube.com/embed/" + video)
}

// function to save recents, keeping 3 total replacing the oldest
$("#save-btn").click(function () {
  console.log("the results are saved!");
  let savedResults = {
    "books" : booksToDisplay,
    "videos" : videosToDisplay
  };

  savedResources.unshift(savedResults);

  if (savedResources.length <= 3) {
    localStorage.setItem("previousResources", JSON.stringify(savedResources))
    // console.log("saved is less than or eqaual to 3");
  }
  else {
    savedResources.pop();
    localStorage.setItem("previousResources", JSON.stringify(savedResources))
    // console.log(savedResources);
  };
});

function loadSavedResources () {
  // console.log(savedResources);
  if (localStorage.getItem("previousResources")) {
    savedResources = JSON.parse(localStorage.getItem("previousResources"));
  }
  else {
    savedResources = [];
  }
}

getApiQueries(quizResults);
loadSavedResources();