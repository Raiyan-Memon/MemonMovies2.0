// alert('sadf')

$(function () {


    // alert(`This page is under Production so please be patient. -- Raiyan Memon`);
  
  
    // var APIURL = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=";
    const IMGPATH = "https://image.tmdb.org/t/p/w1280";
    const SEARCHAPI = "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";
//   https://api.themoviedb.org/3/discover/movie?api_key=THE_KEY&with_origin_country=IN  
    //34319 total pages
    for (var i = 1; i <= 10; i++) {
  
      // var APIURL ="https://api.themoviedb.org/3/discover/movie/popular&api_key=04c35731a5ee918f014970082a0088b1&page="+i;
  
      var APIURL = "https://api.themoviedb.org/3/movie/popular?api_key=6d02a218c581074ce22ac8d31f03aaf7&page=" + i;
      var BollywoodAPIURl ="https://api.themoviedb.org/3/movie/popular?api_key=6d02a218c581074ce22ac8d31f03aaf7&with_origin_country=IN&page=" + i;

  
      const rootdata = document.querySelector('#root');
  
      getmovies(APIURL);
      console.time('function #1');
    //   alert('sdf')
      function getmovies(APIURL) {
        $.ajax({
          url: APIURL,
          type: 'GET',
          success: function (res) {
            showResOnUI(res.results);
          }
        });
      }
  
      function showResOnUI(getres) {
        if (getres == '') {
          alert('No Movie Found, Please Check the Spelling or try different name.');
          location.reload();
        }
  
        getres.forEach(
          (item) => {
            console.log(item.title);
            console.log(IMGPATH + item.poster_path)
            const box = document.createElement("div");
            box.classList.add("col-md-3");
            box.classList.add("col-6");
            box.classList.add("mt-2");
            box.classList.add("movie-detail");
            box.innerHTML = `
            <img src="${IMGPATH + item.poster_path}" loading="lazy" decoding="async" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">Downlaod ${item.title} </h5>
                        </div>
                  `;
            rootdata.appendChild(box);
          });
      }
      console.timeEnd('function #1');
    } //forloop
  
    $(document).on('click', '.search', searchFun);
  
     function searchFun() {
      $('#root').html('');
  
      var searchdata = $('.inputwidth').val();
  
      if ($('.inputwidth').val() == '') {
        location.reload();
      } else {
       
        $('.inputwidth').blur();
        var searchval = SEARCHAPI + searchdata;
        getmovies(searchval);
      }
    };
  
    //on click of submit
    $('#submit').on('click', function (e) {
      e.preventDefault();
    })

    
    $(document).on('click', '.movie-detail', function(){
        alert('sfd');
    })
  
})