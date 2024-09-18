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
                onclick="handleShowDetail('${tool.id}')"
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

// ! Function to handle see more button
const handleSeeMoreBtn = () => {
  fetchData(true); // Passing true to show all the data
};

// Initial data load
fetchData();

// ! Function to fetch API data for modal
const handleShowDetail = async (id) => {
  const response = await fetch(
    `https://openapi.programming-hero.com/api/ai/tool/${id}`
  );
  const json = await response.json();
  const toolDetailData = json.data;

  showAiToolDetail(toolDetailData);
};

const showAiToolDetail = (toolDetailData) => {
  console.log(toolDetailData);
  const aiToolModal = document.getElementById("details_modal");
  aiToolModal.innerHTML = `
  <div class="modal-box-wrapper w-[77.875rem] relative overflow-visible">
          <div class="modal-box min-w-full p-32 overflow-auto">
            <!-- * Modal Content -->
            <div class="modalContentContainer grid grid-cols-2 gap-5">
              <!-- Features and pricings -->
              <div
                class="bg-[#eb57570D] p-8 rounded-2xl border border-[#eb5757]"
              >
                <h2 class="Heading text-2xl font-semibold leading-normal mb-6">
                  ${toolDetailData.description}
                </h2>

                <div class="Pricings grid grid-cols-3 gap-4 text-center mb-6">
                  <p
                    class="bg-white text-[#03a30a] font-bold px-[26px] py-[22px] rounded-2xl flex items-center"
                  >
                    $10/month <br />Basic
                  </p>
                  <p
                    class="bg-white text-[#f28927] font-bold px-[26px] py-[22px] rounded-2xl flex items-center"
                  >
                    $50/month <br />
                    Pro
                  </p>
                  <p
                    class="bg-white text-[#eb5757] font-bold px-[26px] py-[22px] rounded-2xl flex items-center"
                  >
                    Contact us Enterprise
                  </p>
                </div>

                <div class="FeaturesAndIntegrations flex gap-6">
                  <div class="Features">
                    <h3 class="text-2xl font-semibold mb-4">Features</h3>
                    <ul
                      class="list-inside list-disc text-[#585858] leading-relaxed ml-2"
                    >
                      <li>Customizable responses</li>
                      <li>Multilingual support</li>
                      <li>Seamless integration</li>
                    </ul>
                  </div>

                  <div class="Integrations">
                    <h3 class="text-2xl font-semibold mb-4">Integrations</h3>
                    <ul
                      class="list-inside list-disc text-[#585858] leading-relaxed ml-2"
                    >
                      <li>FB Messenger</li>
                      <li>Slack</li>
                      <li>Telegram</li>
                    </ul>
                  </div>
                </div>
              </div>

              <!-- Image and accuracy -->
              <div class="p-6 border rounded-2xl">
                <div class="imgContainer rounded-2xl relative mb-6">
                  <img
                    class="w-full aspect-[437/340] rounded-2xl object-cover"
                    src="./assets/images/dummy-modal.jpg"
                    alt=""
                  />
                  <p
                    class="font-semibold text-white bg-[#eb5757] rounded-lg w-fit px-4 py-2 absolute top-3 right-2"
                  >
                    94% accuracy
                  </p>
                </div>

                <div class="text-center max-w-[360px] mx-auto space-y-4">
                  <h2 class="text-2xl font-semibold">
                    Hi, how are you doing today?
                  </h2>
                  <p class="text-[#585858] leading-relaxed">
                    I'm doing well, thank you for asking. How can I assist you
                    today?
                  </p>
                </div>
              </div>
            </div>
          </div>

          <form method="dialog" class="">
            <button
              class="btn btn-md btn-circle outline-none text-md text-white btn-ghost absolute -right-4 -top-4 bg-[#eb5757]"
            >
              ✕
            </button>
          </form>
        </div>
  `;

  details_modal.showModal();
};
