                                                        

(function (global) {
    function createCard(options) {
      const { imageUrl, videoUrl, description, price, containerId } = options;
  
      // Check if container exists
      const container = containerId ? document.getElementById(containerId) : document.body;
  
      if (!container) {
        console.warn(`Container with ID "${containerId}" not found. Appending to body.`);
      }
  
      // Card container
      const card = document.createElement('div');
      card.className = 'kechup-card';
  
      // Image or Video Element
      if (imageUrl) {
        const img = document.createElement('img');
        img.src = imageUrl;
        img.className = 'kechup-card-image';
        card.appendChild(img);
      } else if (videoUrl) {
        const video = document.createElement('video');
        video.src = videoUrl;
        video.controls = true;
        video.className = 'kechup-card-video';
        card.appendChild(video);
      }
  
      // Description
      if (description) {
        const desc = document.createElement('p');
        desc.className = 'kechup-card-description';
        desc.innerText = description;
        card.appendChild(desc);
      }
  
      // Price
      if (price) {
        const priceElement = document.createElement('p');
        priceElement.className = 'kechup-card-price';
        priceElement.innerText = `Price: ${price}`;
        card.appendChild(priceElement);
      }
  
      // Append card to the specified container or body
      (container || document.body).appendChild(card);
    }
  
    // Expose to global scope
    global.Ketchup = {
      createCard,
    };
  })(window);
  