 
function StartLoading(name1, name2){
     document.getElementById(name1).className = "fa fa-spin fa-spinner fa-lg";

    if (name2 != null) {
       document.getElementById(name2).style.color = "darkgrey";
    }
}

function StopLoading(name1, name2) {
    document.getElementById(name1).className = "fa fa-spin fa-spinner fa-lg hidden";

    if (name2 != null) {
        document.getElementById(name2).style.color = "";
    }
}
