document.addEventListener("DOMContentLoaded", function () {
    const searchForm = document.getElementById("search-form");
    const inputBox = document.getElementById("search-box");
    const searchResults = document.getElementById("search-result");
    const showMoreBtn = document.getElementById("show-more-btn");
    const accessKey = "uh0pw42f0sf8TFBWx-SkT8VVBidgzhqP1bigRfhxeOA";

    let page = 1;
    let keyword = "";
    async function fetchData() {
        try {
            keyword = inputBox.value;
            const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}&per_page=12`;
            const response = await fetch(url);
            const data = await response.json();
            if(page === 1) {
                searchResults.innerHTML = "";
            }
            
            const results = data.results;
            
           
            results.map((result)=>{
                const img = document.createElement("img");
                img.src = result.urls.small;
                const imgLink = document.createElement("a");
                imgLink.href = result.links.html;
                imgLink.target = "_blank";

                imgLink.appendChild(img);
                searchResults.appendChild(imgLink);

            })
            showMoreBtn.style.display="block";
        //     console.log(data);
        }
        catch {
            console.log("Encountered error: ");
        }

    }

    searchForm.addEventListener("submit", (e) => {
        e.preventDefault();
        page = 1;
        fetchData();
    })

    

    showMoreBtn.addEventListener("click", (e) => {
        page++;
        fetchData();
    })
})