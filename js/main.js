// ! Function to fetch data from API
const fetchData = async (showAllData = false) => {
  const response = await fetch(
    "https://openapi.programming-hero.com/api/ai/tools"
  );
  const json = await response.json();
  const data = json.data.tools;

  showAiToolsCard(data, showAllData);
};

// ! Function to show all the AI tools card
const showAiToolsCard = (tools, showAllData) => {
  const cardsContainer = document.getElementById("cards-container");
  cardsContainer.innerHTML = "";
  const seeMoreBtn = document.getElementById("see-more-btn");

  // todo: logic for showing or not showing the showSeeMoreBtn
  if (tools.length > 6 && !showAllData) {
    seeMoreBtn.classList.remove("hidden");
  } else {
    seeMoreBtn.classList.add("hidden");
  }

  // todo: Logic for slicing the tools array to 6 if not showing all data
  if (!showAllData) {
    tools = tools.slice(0, 6);
  }

  //  todo: show AI cards
  tools.forEach((tool) => {
    const aiToolsCard = document.createElement("div");
    aiToolsCard.classList = "card bg-white p-6  border";
    aiToolsCard.innerHTML = `
    <figure class="pb-5">
            <img
              src="${
                tool?.image || "../assets/images/no-image-available-resized.png"
              }"
              alt="Shoes"
              class="rounded-xl h-[246px]"
              id="tool-img"
              onerror="this.onerror=null;this.src='../assets/images/no-image-available-resized.png';"
              
            />
          </figure>

          <div class="card-body p-0 gap-0">
            <div id="features" class="pb-6 mb-6 border-b border-[#11111133]">
              <h2 class="card-title mb-4 text-2xl font-semibold">Features</h2>
              <ol id="features-container-${
                tool.id
              }" class="list-decimal list-inside text-[#585858]">
                
              </ol>
            </div>

            <div class="card-actions items-center justify-between">
              <div>
                <h2 class="mb-4 text-2xl font-semibold">${tool?.name}</h2>
                <div class="flex gap-2">
                  <img src="./assets/images/calender.svg" alt="" />
                  <p class="text-[#585858] font-medium">${
                    tool?.published_in
                  }</p>
                </div>
              </div>
              <button
                class="shrink-button h-12 w-12 rounded-full bg-[#fef7f7] flex items-center justify-center"
              >
                <img src="./assets/images/rightArrow.svg" alt="" class="w-6" />
              </button>
            </div>
          </div>
    `;

    cardsContainer.appendChild(aiToolsCard);

    const featuresContainer = document.getElementById(
      `features-container-${tool.id}`
    );

    getFeatures(featuresContainer, tool.features);
  });
};

// ! Function to show the features of each card
const getFeatures = (elementToAppend, features) => {
  features.forEach((feature) => {
    const li = document.createElement("li");
    li.innerText = feature;
    elementToAppend.appendChild(li);
  });
};

// // ! Add event listener for the 'See More' button
// document.getElementById("see-more-btn").addEventListener("click", () => {
//   handleSeeMoreBtn();
// });

// ! Function to handle see more button
const handleSeeMoreBtn = () => {
  fetchData(true); // Passing true to show all the data
};

// Initial data load
fetchData();
