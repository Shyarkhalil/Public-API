
const close = document.querySelector(".close-error");
const overlayWindow = document.querySelector(".overlay-window");


close.addEventListener("click", function(e) {
  overlayWindow.style.display = "none";
});



//Return first letter uppercase
var toTitleCase = function (str) {
	str = str.toLowerCase().split(' ');
	for (var i = 0; i < str.length; i++) {
		str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
	}
	return str.join(' ');
};



function overlaHTML() {
  $('.modal-window .mem-img').removeClass( "mem-img" );
  $('.modal-window .mem-mail').removeClass( "mem-mail" );
  $('.modal-window .mem-name').removeClass( "mem-name" );
  $( ".modal-window div p" ).first().addClass("bold");
  $('.mem-info').show();
  $('.close-error').show();
  $('.right-arrow').show();
  $('.left-arrow').show();
  $('.arrows').show();
  $('.mem-item .mem-info').hide();
}



  $.ajax({
    url: 'https://randomuser.me/api/?results=12&nat=gb,us,au&noinfo',
    dataType: 'json',
    success: function(data) {
      let apiHTML = '<div class="new-mem">';
      for (var i = 0; i < data.results.length; i++) {
        let resultsData = data.results[i];
        let firstDate = resultsData.dob.substr(0, resultsData.dob.length-9);
        apiHTML+= '<div class="mem-item">';


        apiHTML+= '<div class="mem-img">';
        apiHTML+= '<img src="'+resultsData.picture.large+'">';
        apiHTML+= '</div>';

        apiHTML+= '<div class="mem-mail">';
        apiHTML+= '<p class="mem-name">'+toTitleCase(resultsData.name.first)+' '+toTitleCase(resultsData.name.last)+'</p>';
        apiHTML+= '<div>';
        apiHTML+= '<a href="'+resultsData.email+'">'+resultsData.email+'</a>';
        apiHTML+= '</div>';
        apiHTML+= '<p class="city-data">'+toTitleCase(resultsData.location.city)+'</p>';
        apiHTML+= '</div>';
        apiHTML+= '<div class="mem-info">';
        apiHTML+='<ul>';
        apiHTML+= '<li>'+resultsData.cell+'</li>';
        apiHTML+= '<li> '+toTitleCase(resultsData.location.street)+''+toTitleCase(resultsData.location.state)+' '+resultsData.location.postcode+' </li>';
        apiHTML+= '<li>Birthday: '+firstDate+'</li>';
        apiHTML+='</ul>';
        apiHTML+= '</div>';



        apiHTML+= '</div>';
      }

      apiHTML+= '</div>';
      $('.members').html(apiHTML);




      let modalWindow = document.querySelector(".modal-window");
      let modelItems = document.querySelectorAll(".mem-item");
      let arrowLeft = document.querySelector(".left-arrow");
      let arrowRight = document.querySelector(".right-arrow");



// Filtering names
      let memName = document.querySelectorAll(".mem-name");
      let form = document.getElementById('search');

      form.addEventListener("keyup", function(e){
        e.preventDefault();
        let formValue = form.value.toUpperCase();
        for (var i = 0; i < memName.length; i++) {
          //If matched
          for (var i = 0; i < modelItems.length; i++) {
            if (memName[i].innerHTML.toUpperCase().indexOf(formValue) >= 0) {
                modelItems[i].style.display = "flex";
            } else {
                 modelItems[i].style.display = "none";
            }
          }

        }



      });






// Pop up overlay window
      $(".mem-item").on( "click", function (e) {
        $('.overlay-window').show();
        $('.modal-window').html(this.innerHTML);
         overlaHTML();
      });


let num = 0;
let modelItemsLength = modelItems.length;

//To move back and forth between employee detail
      function next() {
        num++;
        if (num >= modelItemsLength) {
              num = 0;
        }

       $('.modal-window').html(modelItems[num].innerHTML);
           overlaHTML();
      }

     function prev() {
       num--;
       if (num <= 0) {
          num = modelItemsLength -1;
       }
       $('.modal-window').html(modelItems[num].innerHTML);
           overlaHTML();
      }

      arrowRight.addEventListener("click", function() {
           next();
      });

      arrowLeft.addEventListener("click", function () {
          prev();
      });
     }
  });
