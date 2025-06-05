function generatePlaylist() {
  const urls = document.getElementById("bandcampUrls").value.trim().split("\n");
  const container = document.getElementById("playlistContainer");
  container.innerHTML = ""; // clear previous

  urls.forEach((url) => {
    fetch(`/.netlify/functions/oembed?url=${encodeURIComponent(url)}`)
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then(data => {
        const div = document.createElement("div");
        div.className = "track";
        div.innerHTML = data.html; // Bandcamp returns full iframe embed
        container.appendChild(div);
      })
      .catch(err => {
        const error = document.createElement("p");
        error.textContent = `⚠️ Could not embed: ${url}`;
        error.style.color = "red";
        container.appendChild(error);
      });
  });
}
