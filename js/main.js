// ! Function to fetch data from API
const fetchData = async () => {
  const response = await fetch(
    "https://openapi.programming-hero.com/api/ai/tools"
  );
  const json = await response.json();
  const data = json.data.tools;
  showAiToolsCard(data);
};

// ! Function to show all the AI tools card
const showAiToolsCard = (tools) => {
  const cardsContainer = document.getElementById("cards-container");

  tools.forEach((tool) => {
    const aiToolsCard = document.createElement("div");
    aiToolsCard.classList = "card bg-white p-6  border";
    aiToolsCard.innerHTML = `
    <figure class="pb-5">
            <img
              src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
              alt="Shoes"
              class="rounded-xl"
            />
          </figure>

          <div class="card-body p-0 gap-0">
            <div id="features" class="pb-6 mb-6 border-b border-[#11111133]">
              <h2 class="card-title mb-4 text-2xl font-semibold">Features</h2>
              <ol class="list-decimal list-inside text-[#585858]">
                <li>Natural language processing</li>
                <li>Context Understanding</li>
                <li>Text Generation</li>
              </ol>
            </div>

            <div class="card-actions items-center justify-between">
              <div>
                <h2 class="mb-4 text-2xl font-semibold">Chat GPT</h2>
                <div class="flex gap-2">
                  <img src="./assets/images/calender.svg" alt="" />
                  <p class="text-[#585858] font-medium">11/01/2022</p>
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
  });
};
fetchData();
