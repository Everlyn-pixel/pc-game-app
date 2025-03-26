document.addEventListener("DOMContentLoaded", () => {
  const gamesList = document.getElementById("games-list");

  // Example games data
  const games = [
    { id: 1, name: "Game 1", likes: 0, comments: [] },
    { id: 2, name: "Game 2", likes: 0, comments: [] },
    { id: 3, name: "Game 3", likes: 0, comments: [] },
  ];

  // Function to render games
  function renderGames() {
    gamesList.innerHTML = ""; // Clear the list
    games.forEach((game) => {
      const gameCard = document.createElement("div");
      gameCard.className = "game-card";
      gameCard.innerHTML = `
        <h3>${game.name}</h3>
        <button class="like-btn">Like (${game.likes})</button>
        <button class="comment-btn">Comment</button>
        <button class="order-btn">Order</button>
        <div class="comments">
          ${game.comments.map((comment) => `<p>${comment}</p>`).join("")}
        </div>
      `;
      gamesList.appendChild(gameCard);

      // Like button functionality
      gameCard.querySelector(".like-btn").addEventListener("click", () => {
        game.likes++;
        renderGames();
      });

      // Comment button functionality
      gameCard.querySelector(".comment-btn").addEventListener("click", () => {
        const comment = prompt("Enter your comment:");
        if (comment) {
          game.comments.push(comment);
          renderGames();
        }
      });

      // Order button functionality
      gameCard.querySelector(".order-btn").addEventListener("click", () => {
        alert(`You ordered ${game.name}!`);
      });
    });
  }

  // Initial render
  renderGames();
});