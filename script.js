function generatePlaylist() {
  const urls = document.getElementById("bandcampUrls").value.trim().split("\n");
  const container = document.getElementById("playlistContainer");
  container.innerHTML = "";

  urls.forEach((url, index) => {
    const callbackName = `handleEmbed${index}`;
    window[callbackName] = function(data) {
      const div = document.createElement("div");
      div.className = "track";
      div.innerHTML = data.html;
      container.appendChild(div);
      delete window[callbackName];
    };

    const script = document.createElement("script");
    script.src = `https://bandcamp.com/oembed?url=${encodeURIComponent(url)}&format=json&callback=${callbackName}`;
    script.onerror = () => {
      const error = document.createElement("p");
      error.textContent = `⚠️ Could not embed: ${url}`;
      error.style.color = "red";
      container.appendChild(error);
    };
    document.body.appendChild(script);
  });
}
