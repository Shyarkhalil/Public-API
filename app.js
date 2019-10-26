const close = document.querySelector('.close-error');
const overlayWindow = document.querySelector('.overlay-window');

close.addEventListener('click', function(e) {
  overlayWindow.style.display = 'none';
});

function overlayHTML() {
  $('.modal-window .mem-img').removeClass('mem-img');
  $('.modal-window .mem-mail').removeClass('mem-mail');
  $('.modal-window .mem-name').removeClass('mem-name');
  $('.modal-window div p')
    .first()
    .addClass('bold');
  $('.mem-info').show();
  $('.close-error').show();
  $('.right-arrow').show();
  $('.left-arrow').show();
  $('.arrows').show();
  $('.mem-item .mem-info').hide();
}
let apiHTML = '<div class="new-mem">';

$.ajax({
  url: 'https://randomuser.me/api/?results=12&nat=gb,us,au&noinfo',
  dataType: 'json',
  success: buildDom,
});

function buildDom(data) {
  data.results.forEach(user => {
    const resultsData = user;
    const firstDate = resultsData.dob;
    apiHTML += '<div class="mem-item">';

    apiHTML += '<div class="mem-img">';
    apiHTML += '<img src="' + resultsData.picture.large + '">';
    apiHTML += '</div>';

    apiHTML += '<div class="mem-mail">';
    apiHTML +=
      '<p class="mem-name">' + resultsData.name.first + ' ' + resultsData.name.last + '</p>';
    apiHTML += '<div>';
    apiHTML += '<a href="mailto:' + resultsData.email + '">' + resultsData.email + '</a>';
    apiHTML += '</div>';
    apiHTML += '<p class="city-data">' + resultsData.location.city + '</p>';
    apiHTML += '</div>';
    apiHTML += '<div class="mem-info">';
    apiHTML += '<ul>';
    apiHTML += '<li>' + resultsData.cell + '</li>';
    apiHTML +=
      '<li> ' +
      resultsData.location.street +
      '' +
      resultsData.location.state +
      ' ' +
      resultsData.location.postcode +
      ' </li>';
    apiHTML += '<li>Birthday: ' + firstDate + '</li>';
    apiHTML += '</ul>';
    apiHTML += '</div>';

    apiHTML += '</div>';
  }); // end

  apiHTML += '</div>';
  $('.members').html(apiHTML);

  const modelItems = document.querySelectorAll('.mem-item');
  const arrowLeft = document.querySelector('.left-arrow');
  const arrowRight = document.querySelector('.right-arrow');

  // Filtering names
  const memName = document.querySelectorAll('.mem-name');
  const form = document.getElementById('search');

  form.addEventListener('keyup', e => {
    e.preventDefault();
    const formValue = form.value.toLowerCase();
    modelItems.forEach((user, i) => {
      if (memName[i].innerHTML.toLowerCase().indexOf(formValue) > -1) {
        user.style.display = '';
      } else {
        user.style.display = 'none';
      }
    });
  });

  //Pop up overlay window
  $('.mem-item').on('click', function(e) {
    $('.overlay-window').show();
    $('.modal-window').html(this.innerHTML);
    overlayHTML();
    let itemIndex = $('.mem-item').index(this);
    //To move back and forth between employee detail
    function next() {
      itemIndex++;
      if (itemIndex >= modelItems.length) {
        itemIndex = 0;
      }

      $('.modal-window').html(modelItems[itemIndex].innerHTML);
      overlayHTML();
    }

    function prev() {
      itemIndex--;
      if (itemIndex <= 0) {
        itemIndex = modelItemsLength - 1;
      }
      $('.modal-window').html(modelItems[itemIndex].innerHTML);
      overlayHTML();
    }

    arrowRight.addEventListener('click', function() {
      next();
    });

    arrowLeft.addEventListener('click', function() {
      prev();
    });
  }); //end of function
}
