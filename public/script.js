document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.modal');
  var instances = M.Modal.init(elems);
});

$(document).ready(function () {
  $.get('/api/pets', function (pets) {
      var cardSection = $('#card-section');
      pets.forEach(pet => {
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
