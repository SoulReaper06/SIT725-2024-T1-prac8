document.addEventListener("DOMContentLoaded", function () {
  var elems = document.querySelectorAll(".modal");
  var instances = M.Modal.init(elems);

  const socket = io("http://localhost:3000");

  socket.on("connect", () => {
    console.log("Connected to the server");
    socket.emit("send-message", "Hello server!");
  });

  socket.on("receive-message", (message) => {
    console.log("Message from server:", message);
    const msgContainer = document.getElementById("messages");
    const msgElement = document.createElement("div");
    msgElement.textContent = message;
    msgContainer.appendChild(msgElement);
  });
  socket.on('number',(msg)=>{
    console.log('Random Number: ' + msg);
  });
});

$(document).ready(function () {
  $.get("/api/pets", function (pets) {
    var cardSection = $("#card-section");
    pets.forEach((pet) => {
      var cardHtml = `
          <div class="col s12 m4">
          <div class="card hoverable"> 
              <div class="card-image ">
                  <img src="${pet.imageUrl}" alt="Pet 1">
                  <span class="card-title">${pet.petName}</span>
              </div>
              <div class="card-content">
                  <p>${pet.description}</p>
              </div>
              <div class="card-action">
                  <a href="#modal1" class="modal-trigger">Adopt Me</a>
              </div>
          </div>
      </div>`;
      cardSection.append(cardHtml);
    });
  });
});
