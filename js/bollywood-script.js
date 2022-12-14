$(function () {
    // loader
      $(document).on({
        ajaxStart: function(){
          $(".show-loader").addClass('loader'); 
        },
        ajaxStop: function(){ 
          setTimeout(() => {
            $(".show-loader").removeClass('loader');
          }, 3000);
        }    
    });
      
    
    
    
    
    
      // alert(`This page is under Production so please be patient. -- Raiyan Memon`);
    
      // var APIURL = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=";
      const IMGPATH = "https://image.tmdb.org/t/p/w342";
      //set to 342
      // quality of images - 154, 185, 342, 500, 780,  1280
    
      const SEARCHAPI =
        "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&with_origin_country=IN&query=";
      //   https://api.themoviedb.org/3/discover/movie?api_key=THE_KEY&with_origin_country=IN
      //34319 total pages
      for (var i = 1; i <= 1; i++) {
        // var APIURL ="https://api.themoviedb.org/3/discover/movie/popular&api_key=04c35731a5ee918f014970082a0088b1&page="+i;
    
        var APIURL =
          "https://api.themoviedb.org/3/movie/popular?api_key=6d02a218c581074ce22ac8d31f03aaf7&with_origin_country=IN&page=" +
          i;
        // var BollywoodAPIURl =
        //   "https://api.themoviedb.org/3/movie/popular?api_key=6d02a218c581074ce22ac8d31f03aaf7&with_origin_country=IN&page=" +
        //   i;
    
        const rootdata = document.querySelector("#root");
    
        getmovies(APIURL);
        console.time("function #1");
        //   alert('sdf')
        function getmovies(APIURL) {
          $.ajax({
            url: APIURL,
            type: "GET",
            success: function (res) {
              showResOnUI(res.results);
            },
          });
        }
    
        function showResOnUI(getres) {
          if (getres == "") {
            alert(
              "No Movie Found, Please Check the Spelling or try different name."
            );
            location.reload();
          }
    
          getres.forEach((item) => {
            const box = document.createElement("div");
            box.classList.add("col-md-2");
            box.classList.add("col-4");
            // box.classList.add("mt-2");
            box.classList.add("movie-detail");
            box.classList.add("new-box");
    
            box.innerHTML = `
            <img data-toggle="modal" data-target="#exampleModal" src="${
              IMGPATH + item.poster_path
            }" decoding="async" class="card-img-top shadow p-1 bg-dark rounded" alt="Image Not Found">
                        <div data-toggle="modal" data-target="#exampleModal" class="card-body bg-gray ">
                        <p class="card-title border-bottom text-center date-text">${moment(item.release_date).format('DD-MMM-YYYY')} </p>
                            <p class="card-title">${item.title} </p>
                        </div>
                        <input type="hidden" id="movie_id" value="${item.id}">
                  `;
            rootdata.appendChild(box);
          });
        }
        console.timeEnd("function #1");
      } //forloop
    
      $(document).on("click", ".search", searchFun);
    
      function searchFun() {
        $("#root").html("");
    
        var searchdata = $(".inputwidth").val();
    
        if ($(".inputwidth").val() == "") {
          location.reload();
        } else {
          $(".inputwidth").blur();
          var searchval = SEARCHAPI + searchdata;
          getmovies(searchval);
        }
      }
    
      //on click of submit
      $("#submit").on("click", function (e) {
        e.preventDefault();
      });
    
      $(document).on("click", ".movie-detail", function () {
        // console.log($(this).find("#movie_id").val());
        let movieid = $(this).find("#movie_id").val();
    
        const APIBYID =
          "https://api.themoviedb.org/3/movie/" +
          movieid +
          "?&api_key=04c35731a5ee918f014970082a0088b1";
    
        var Trailerbyid =
          "http://api.themoviedb.org/3/movie/" +
          movieid +
          "/videos?api_key=04c35731a5ee918f014970082a0088b1";
    
        $.ajax({
          url: APIBYID,
          type: "GET",
          success: function (res) {
            $(".modal-title").text(res.title);
            $(".overview").text(res.overview);
            $(".moviebyclass").attr("src", IMGPATH + res.poster_path);
          },
        });
    
        $.ajax({
          url: Trailerbyid,
          type: "GET",
          success: function (res) {
            if (res.results.length === 0) {
              alert("No Trailer Found");
              setTimeout(() => {
                $(".closemodal").trigger("click");
              }, 500);
            }
    
            for (let i = 0; i < res.results.length; i++) {
              if (res.results.length == 1) {
                var key = res.results[i].key;
              } else if (
                res.results[i].name.includes("Official Trailer") ||
                res.results[i].name == "Official Trailer" ||
                res.results[i].name == "Trailer" ||
                res.results[i].name == "Official Trailer [Subtitled]" ||
                res.results[i].name == "Official Trailer 2" ||
                res.results[i].name == "Main Trailer" ||
                res.results[i].name.includes("Trailer")
              ) {
                var key = res.results[i].key;
              }
            }
    
            $(".gettrailervideo").attr(
              "src",
              "https://www.youtube.com/embed/" + key
            );
          },
        });
      });
    
      $(document).on("click", ".closemodal", function () {
        $(".gettrailervideo").attr("src", "");
        $(".movie-title").text("");
      });
    
      $(document).on("click", function () {
        $(".gettrailervideo").attr("src", "");
      });
    
      //pagination-custom
      //on click of prev
      $('#prev').on('click', prevfun);
       function prevfun() {
        var prevcount = $('#countinput').val();
        var toint = parseInt(prevcount);
        var store = $('#countinput').val(--toint);
        $('#count').text($('#countinput').val());
    
        //data on pagination
        var APIURL2 = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&with_origin_country=IN&api_key=04c35731a5ee918f014970082a0088b1&page=";
    
        $('.custom').remove();
        var getdata = $('#countinput').val();
        var searchval = APIURL2 + getdata;
        getmovies(searchval);
        disable();
      }
    
    
      //on click of next
      $('#next').on('click', nextfun)
    
       function nextfun() {
    
        // console.log('next');
        var nextcount = $('#countinput').val();
        // console.log(nextcount);
        var tointn = parseInt(nextcount);
        // console.log(typeof (tointn));
        var store = $('#countinput').val(++tointn);
        // console.log($('#countinput').val());
        $('#count').text($('#countinput').val());
    
    
        //data on pagination
        var APIURL1 = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&with_origin_country=IN&api_key=04c35731a5ee918f014970082a0088b1&page=";
    
        $('.custom').remove();
        var getdata = $('#countinput').val();
        var searchval = APIURL1 + getdata;
        getmovies(searchval);
        disable();
      }
    
      function disable() {
    
        if ($('#countinput').val() == '1') {
          $('#prev').addClass('disabled');
        } else {
          $('#prev').removeClass('disabled');
        }
      }
    
    
      $('.ott-logo ul li').on('click', function(){
        console.log($(this).attr('id'));
      })
    
    
    
    
    });
    