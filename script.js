const API_URL = "games.json"; // Replace with your API endpoint if available

document.addEventListener("DOMContentLoaded", async () => {
  const gamesList = document.getElementById("games-list");

  // Fetch games from the API or local JSON file
  async function fetchGames() {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error("Failed to fetch games");
      return await response.json();
    } catch (error) {
      console.error("Error fetching games:", error);
      return [];
    }
  }

  // Render games
  async function renderGames() {
    const games = await fetchGames();
    gamesList.innerHTML = ""; // Clear the list

    games.forEach((game) => {
      const gameCard = document.createElement("div");
      gameCard.className = "game-card";
      gameCard.innerHTML = `
        <h3>${game.name}</h3>
        <p><strong>Genre:</strong> ${game.genre}</p>
        <p><strong>Release Date:</strong> ${game.releaseDate}</p>
        <p><strong>Developer:</strong> ${game.developer}</p>
        <button class="like-btn">Like (${game.likes || 0})</button>
        <button class="comment-btn">Comment</button>
        <button class="order-btn">Order</button>
        <div class="comments">
          ${game.comments?.map((comment) => `<p>${comment}</p>`).join("") || ""}
        </div>
      `;
      gamesList.appendChild(gameCard);

      // Like button functionality
      gameCard.querySelector(".like-btn").addEventListener("click", () => {
        game.likes = (game.likes || 0) + 1;
        gameCard.querySelector(".like-btn").textContent = `Like (${game.likes})`;
      });

      // Comment button functionality
      gameCard.querySelector(".comment-btn").addEventListener("click", () => {
        const comment = prompt("Enter your comment:");
        if (comment) {
          game.comments = game.comments || [];
          game.comments.push(comment);
          gameCard.querySelector(".comments").innerHTML = game.comments
            .map((c) => `<p>${c}</p>`)
            .join("");
        }
      });

      // Order button functionality
      gameCard.querySelector(".order-btn").addEventListener("click", () => {
        alert(`You ordered ${game.name}!`);
      });
    });
  }

  renderGames();
});
