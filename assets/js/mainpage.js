// categories & info
    var cat_id = ["engineering","science","design"];
    var cat_image_url = ["assets/images/engineering-logo.png", 
                        "assets/images/science-logo.png",
                        "assets/images/design-logo.png",
                        ]; 
// add new feed
var add_new_feed = document.getElementById("add-new-feed");
add_new_feed.onclick = function(){
    var new_feed_modal = document.getElementById("new-feed-modal");
    new_feed_modal.style.display = "block";

}



// // left side bar
//     var side_bar_category = [];
//     for (var i = 0; i < cat_id.length; i++){
//         side_bar_category[i] = document.getElementById("category"+i);
//         side_bar_category[i].innerText = cat_id[i];
//         console.log(side_bar_category[i]);
//     }

// //----------------------------------------------------------------
//     // get data from JSON files
//     var json_title = [];
//     var json_title2 = [];
//     var json_abstract = [];
//     var json_author = [];
//     var json_pubdate = [];
//     var json_url = [];
//     var json_content = [];
//     var relevant_title = [];

//     var data_total = 0;
//     function getJSONData(){
//         fetch("assets/JSON/articleJSONFile.json")
//         .then(response => {
//             return response.json();
//         })
//         .then(jsondata => {
//             data_total = jsondata.length;
//             // console.log(jsondata.length);
//             var article_container = document.getElementById("article-container");
//             var my_modal = document.getElementById("myModal")
//             for(var i=0; i<data_total; i++){
//                 if(jsondata[i].similarCategory === cat_id[0]){
//                     article_container.innerHTML += "<div class='post-item' id='post-item"+i+"'><div class='outer-image'><div class='inner-image'><img src='"+cat_image_url[0]+"'></div></div><div class='post-title' id='json-title"+i+"'></div><div class='post-abstract'>Abstract: <span id='json-abstract"+i+"'></span></div><div class='read-more'><i class='fa-solid fa-square-check' id='checked"+i+"'></i><button class='read-more-btn' id='read-more-btn"+i+"'>Read More</button><i class='fa-regular fa-star star-regular' id='bookmark"+i+"'></i><i class='fa-solid fa-star star-solid' id='bookmarked"+i+"''></i></div></div>";
//                 }else if(jsondata[i].similarCategory === cat_id[1]){
//                     article_container.innerHTML += "<div class='post-item' id='post-item"+i+"'><div class='outer-image'><div class='inner-image'><img src='"+cat_image_url[1]+"'></div></div><div class='post-title' id='json-title"+i+"'></div><div class='post-abstract'>Abstract: <span id='json-abstract"+i+"'></span></div><div class='read-more'><i class='fa-solid fa-square-check' id='checked"+i+"'></i><button class='read-more-btn' id='read-more-btn"+i+"'>Read More</button><i class='fa-regular fa-star star-regular' id='bookmark"+i+"'></i><i class='fa-solid fa-star star-solid' id='bookmarked"+i+"''></i></div></div>";
//                 }else if(jsondata[i].similarCategory === cat_id[2]){
//                     article_container.innerHTML += "<div class='post-item' id='post-item"+i+"'><div class='outer-image'><div class='inner-image'><img src='"+cat_image_url[2]+"'></div></div><div class='post-title' id='json-title"+i+"'></div><div class='post-abstract'>Abstract: <span id='json-abstract"+i+"'></span></div><div class='read-more'><i class='fa-solid fa-square-check' id='checked"+i+"'></i><button class='read-more-btn' id='read-more-btn"+i+"'>Read More</button><i class='fa-regular fa-star star-regular' id='bookmark"+i+"'></i><i class='fa-solid fa-star star-solid' id='bookmarked"+i+"''></i></div></div>";
//                 }else{
//                     article_container.innerHTML += "<div class='post-item' id='post-item"+i+"'><div class='outer-image'><div class='inner-image'><img src='assets/images/article-content.png'></div></div><div class='post-title' id='json-title"+i+"'></div><div class='post-abstract'>Abstract: <span id='json-abstract"+i+"'></span></div><div class='read-more'><i class='fa-solid fa-square-check' id='checked"+i+"'></i><button class='read-more-btn' id='read-more-btn"+i+"'>Read More</button><i class='fa-regular fa-star star-regular' id='bookmark"+i+"'></i><i class='fa-solid fa-star star-solid' id='bookmarked"+i+"''></i></div></div>";
//                 }
//                 my_modal.innerHTML = "<div class='modal-content'><div class='modal-top'><span class='close'>&times;</span></div><div id='modal-content'><div class='modal-item'><span id='modal-item-title'></span></div><div class='modal-item'>Author : <span id='modal-item-author'></span></div><div class='modal-item'>Publish Date : <span id='modal-item-pubdate'></span></div><div class='modal-item'>URL : <span id='modal-item-url'></span></div><div class='modal-item'>Abstract :</div><div class='modal-item'><span id='modal-item-content'></span></div></div></div>";
//             }
//             //my_modal.innerHTML = "<div class='modal-content'><div class='modal-top'><span class='close'>&times;</span></div><div id='modal-content'><div class='modal-item'><span id='modal-item-title'></span></div><div class='modal-item'>Author : <span id='modal-item-author'></span></div><div class='modal-item'>Publish Date : <span id='modal-item-pubdate'></span></div><div class='modal-item'>URL : <span id='modal-item-url'></span></div><div class='modal-item'>Abstract :</div><div class='modal-item'><span id='modal-item-content'></span></div></div></div>";
//             //article_container.innerHTML += "<div class='post-item' id='post-item"+i+"'><div class='outer-image'><div class='inner-image'><img src='assets/images/article-content.png'></div></div><div class='post-title' id='json-title"+i+"'></div><div class='post-abstract'>Abstract: <span id='json-abstract"+i+"'></span></div><div class='read-more'><i class='fa-solid fa-square-check' id='checked"+i+"'></i><button class='read-more-btn' id='read-more-btn"+i+"'>Read More</button><i class='fa-regular fa-star star-regular' id='bookmark"+i+"'></i><i class='fa-solid fa-star star-solid' id='bookmarked"+i+"''></i></div></div>";
//             for(var i = 0; i < jsondata.length; i++){
//             json_title[i] = JSON.parse(JSON.stringify(jsondata[i].title));
//             json_title2[i] = JSON.parse(JSON.stringify(jsondata[i].title));
//             json_author[i] = JSON.parse(JSON.stringify(jsondata[i].creator));
//             json_pubdate[i] = JSON.parse(JSON.stringify(jsondata[i].isoDate)).substring(0, 10);
//             json_url[i] = JSON.parse(JSON.stringify(jsondata[i].link));
//             if(jsondata[i].contentSnippet){
//                 json_abstract[i] = JSON.parse(JSON.stringify(jsondata[i].contentSnippet));
//                 json_content[i] = JSON.parse(JSON.stringify(jsondata[i].contentSnippet));
//             }else{
//                 json_abstract[i] = "An abstract is not available for this content.<br><br>";
//                 json_content[i] = "An abstract is not available for this content.";
//             }

//                 if(json_title[i].length > 85){
//                     json_title[i] = json_title[i].substring(0,85) + "...";
//                     var last_space = json_title[i].lastIndexOf(' ');
//                     json_title[i] = json_title[i].substring(0,last_space) + "...";
//                 }
//                 if(json_abstract[i].length > 125){
//                     json_abstract[i] = json_abstract[i].substring(0,125) + "...";
//                     var last_space = json_abstract[i].lastIndexOf(' ');
//                     json_abstract[i] = json_abstract[i].substring(0,last_space) + "...";
//                 }
//             document.getElementById("json-title"+i).innerHTML = json_title[i];
//             document.getElementById("json-abstract"+i).innerHTML = json_abstract[i];
//             }


// //insert data to the modal
//             var btn = [];
//             var span = [];
//             var post_checked = [];
//             var post_bookmark = [];
//             var post_bookmarked = [];
//             var target_article_no = 0;
//             var modal = document.getElementById("myModal");
//             var span = document.getElementsByClassName("close")[0];

//             for(var i=0; i<data_total; i++){
//                 btn[i] = document.getElementById("read-more-btn"+i);
//                 post_checked[i] = document.getElementById("checked"+i);
//                 post_bookmark[i] = document.getElementById("bookmark"+i);
//                 post_bookmarked[i] = document.getElementById("bookmarked"+i);
//                 post_bookmark[i].style.display = "block";
//                 post_bookmarked[i].style.display = "none";
//             }

//   // When the user clicks on the button, open the modal 
//             for(let i=0; i<data_total; i++){
//                 btn[i].onclick = function() {
//                     modal.style.display = "block";
//                     post_checked[i].style.display = "block";
//                     target_article_no = i;
//                     document.getElementById("modal-item-title").innerHTML = json_title2[target_article_no];
//                     document.getElementById("modal-item-author").innerHTML = json_author[target_article_no];
//                     document.getElementById("modal-item-pubdate").innerHTML = json_pubdate[target_article_no].substring(0, 16);
//                     document.getElementById("modal-item-url").innerHTML = '<a href="' + json_url[target_article_no] + '" target="_blank">' + json_url[target_article_no] + '</a>';
//                     document.getElementById("modal-item-content").innerHTML = json_content[target_article_no];
//                 }
//                 post_bookmark[i].onclick = function() {
//                     post_bookmark[i].style.display = "none";
//                     post_bookmarked[i].style.display = "block";
//                 }
//                 post_bookmarked[i].onclick = function() {
//                     post_bookmark[i].style.display = "block";
//                     post_bookmarked[i].style.display = "none";
//                 }
//             }
// // When the user clicks on <span> (x), close the modal
//             span.onclick = function() {
//                 modal.style.display = "none";
//             }
// // When the user clicks anywhere outside of the modal, close it
//             window.onclick = function(event) {
//                 if (event.target == modal) {
//                     modal.style.display = "none";
//                 }
//             }
//         });
//     }


    
// //---------------------------------------------------------------
// //compare with similar title
//     // async function findRelevance(jsonData){
//     //     try{
//     //         var data = jsonData;
//     //         console.log(data);
//     //         return data;
//     //     }catch(err){
//     //         console.log(err);
//     //     }
//     // }



// //---------------------------------------------------------------
//     window.onload=function(){
//         getJSONData();
//     }

// //----------------------------------------------------------------
