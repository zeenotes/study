
// for mermaid
mermaid.initialize({startOnLoad:true});


// for flowchart
$(".diagram").flowchart();
$(".diagram1").flowchart();

document.addEventListener('keydown', logKey);

function logKey(e) {
    
  // key board shortcut for home page
  if (e.key == "H"){
	location.href = "/" ;
  }
   
  // keyboard shortcut for work
  if (e.key == "L"){
  location.href = "/linux/" ;
  }

  // keyboard shortcut for work
  if (e.key == "O"){
  location.href = "/oscp/" ;
  }
  
  // keyboard shortcut for work
  if (e.key == "P"){
	location.href = "/programming" ;
  }
  
  // keyboard shortcut for search
  if (e.key == "/"){
	  query.focus()
	  e.preventDefault()
  }
}