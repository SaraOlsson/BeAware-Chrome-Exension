/* File: content.js
 * ---------------
 * Hello! You'll be making most of your changes
 * in this file. At a high level, this code replaces
 * the substring "cal" with the string "butt" on web pages.
 *
 * This file contains javascript code that is executed
 * everytime a webpage loads over HTTP or HTTPS.
 */

// first run
 check();

document.addEventListener('scroll', function () {
    
    // console.log("check");
    check();
    
});

function check() {

    var elements = document.getElementsByClassName('userContent');

    for (var i = 0; i < elements.length; i++) {

        var element = elements[i]; // userContent divs (posts)


        if( element.classList.contains("CHECKED") === false )
        {

            var pElements = element.getElementsByTagName('P');
            
            for (var k = 0; k < pElements.length; k++) {

                var pElement = pElements[k];

                for (var j = 0; j < pElement.childNodes.length; j++) {
                    var node = pElement.childNodes[j];

                    if (node.nodeType === 3) {

                        var text = node.nodeValue;
                        text = text.toLowerCase();

                        getKeyWords(text, pElement);

                    } 
                } 
            }

        } else {
            // console.log("already checked");
        }

        element.classList.add("CHECKED");       
    }

}

function beAware(ind, element) {

    var awareText = document.createElement('p');
    var spanText = document.createElement('p');
    spanText.innerText = "> Be Aware: ";
    spanText.setAttribute("style", "color: coral; font-weight: bold"); 
   //  awareText.innerText = "\n ( Be Aware: This post seems to be about a fake-news topic. Click here to read more)";
   awareText.innerText = "This post seems to be about a fake-news topic. Click here to read more)";
    awareText.setAttribute("style", "color:#f3af0a; font-size:14px; line-height: 19px"); 
    var link = document.createElement('a');
    link.href = "https://saraolsson4s.wixsite.com/beaware/fakenews/" + ind;
    
    var newDiv = document.createElement('div');
    newDiv.appendChild(spanText);
    newDiv.appendChild(awareText);
    newDiv.setAttribute("style", "background: #f3f3f3; margin-top: 30px; padding: 3px 5px"); 
    
    element.appendChild(newDiv);
    //element.appendChild(spanText);
    //element.appendChild(awareText);

    /*
    <p style="color: #f3af0a;font-size:14px;line-height: 19px;"><br> 
    (<span style="color: coral; font-weight: bold">Be Aware:</span> 
    This post seems to be about a fake-news topic. Click here to read more)</p> */

    awareText.addEventListener("click", function(){
                         
        if (confirm("Are you sure you want to continue to BeAware?") ) {
          
            // link.click(); // will open in same tab
            var win = window.open(link.href, '_blank');
            win.focus();

        } else {
           
            //code here for don't leave (Cancel)
        } 

    });

}

function getKeyWords(text, element) {
   
    //fetch('https://newsapi.org/v2/top-headlines?sources=independent&apiKey=7382a3cec0494f95b597277b5c0f0663')  

    fetch('https://saraolsson4s.wixsite.com/beaware/_functions/myFakeFunction')
    .then(function(response) {
      return response.json();
    })
    .then(function(myJson) {
  
      for(var i = 0; i < myJson.items.length; i++)
      {
          
          var counter = compareKeyWords(text,myJson.items[i]["keywords"] );

          if ( counter > 0 )
          {
              beAware(myJson.items[i]["_id"], element);
          }
      }     

      console.log(JSON.stringify(myJson));
    }).catch(error => alert('Error:', error)); 

    return true; 
}

function compareKeyWords(text, keywords) {

    // console.log("compare: " + text);
    // console.log("with keywords: " + keywords);

    var splitted = keywords.split(", ");
    var counter = 0;

    for(var i = 0; i < splitted.length; i++)
    {
        var keyword = splitted[i].toLowerCase();
 
        if(text.search(" " +keyword+ " ") >= 0 )
        {
            // console.log("Match on: " + keyword + " and " + text);
            counter++;
        }
    }
    return counter;

}

